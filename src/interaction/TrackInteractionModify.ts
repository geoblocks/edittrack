import PointerInteraction from 'ol/interaction/Pointer.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';
import Event from 'ol/events/Event.js';
import {Geometry} from 'ol/geom';
import TrackData from './TrackData';
import {Map, MapBrowserEvent} from 'ol';
import type {StyleLike} from 'ol/style/Style.js';
import type {FlatStyleLike} from 'ol/style/flat.js';
import type {Pixel} from 'ol/pixel.js';
import type {FeatureType} from './TrackData.js';

export class ModifyEvent extends Event {

  constructor(type: string, public feature: Feature<Geometry>, public coordinate: number[]) {
    super(type);

    /**
     * The feature being modified.
     */
    this.feature = feature;

    /**
     * The coordinate of the pointer when modification occurred.
     */
    this.coordinate = coordinate;
  }
}

export interface Options {
  source: VectorSource<Feature>;
  trackData: TrackData;
  style: StyleLike | FlatStyleLike;
  condition: (mbe: MapBrowserEvent<UIEvent>) => boolean;
  addControlPointCondition: (mbe: MapBrowserEvent<UIEvent>) => boolean;
  /**
   * Pixel tolerance for considering the pointer close enough to a segment for snapping.
   */
  hitTolerance: number;
}


/**
 * Interaction to modify a Vector Source.
 * - on down a 3 points linestring is created and dispatched as modifystart;
 * - on drag the middle point is updated;
 * - on up the modifyend event is dispatched.
 */
export default class Modify extends PointerInteraction {

  private dragStarted = false;
  private condition_: Options['condition'];
  private addControlPointCondition_: Options['addControlPointCondition'];
  private source_: Options['source'];
  private hitTolerance_: Options['hitTolerance'];
  private feature_: Feature<Point|LineString> = null;
  /**
   * Editing vertex.
   */
  public overlayFeature = new Feature({
    type: 'segment'
  });
  private overlay_: VectorLayer<Feature>;
  private lastPixel_: Pixel = [0, 0];
  private trackData_: Options['trackData'];
  private pointAtCursorFeature_ = new Feature<Point>({
    geometry: new Point([0, 0]),
    type: 'sketch',
    subtype: '',
  });

  private involvedFeatures_: Feature<Geometry>[] = [];
  private overlayLineString_: LineString = null;
  private scratchPoint_ = new Point([0, 0]);

  constructor(options: Options) {
    super();

    this.dragStarted = false;

    this.condition_ = options.condition;

    this.addControlPointCondition_ = options.addControlPointCondition;

    this.source_ = options.source;

    this.hitTolerance_ = options.hitTolerance;

    /**
     * Draw overlay where sketch features are drawn.
     */
    this.overlay_ = new VectorLayer<Feature>({
      source: new VectorSource<Feature>({
        useSpatialIndex: false,
        features: [
          this.pointAtCursorFeature_,
        ]
      }),
      style: options.style,
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });

    this.trackData_ = options.trackData;
  }


  setMap(map: Map) {
    this.overlay_.setMap(map);
    super.setMap(map);
  }


  setActive(active: boolean) {
    if (this.overlay_) {
      this.overlay_.setVisible(active);
    }
    super.setActive(active);
  }

  get pointAtCursorFeature(): Feature<Point> {
    return this.pointAtCursorFeature_;
  }

  /**
   * Get the first feature at pixel, favor points over lines
   */
  getFeatureAtPixel(pixel: Pixel): Feature<LineString|Point> {
    const features = this.getMap().getFeaturesAtPixel(pixel, {
      layerFilter: (l) => l.getSource() === this.source_,
      hitTolerance: this.hitTolerance_
    }) as Feature<LineString|Point>[];
    // get the first point feature
    const feature = features.find((f) => f.getGeometry().getType() === 'Point');
    if (feature) {
      return feature;
    }
    return features[0];
  }

  updateSketchFeature() {
    const feature = this.getFeatureAtPixel(this.lastPixel_);
    // Adds hit geometries to the hit feature and the sketch feature.
    // The geometry is either the closest point on a line or the point itself
    this.source_.forEachFeature((f) => (f as Feature).set('sketchHitGeometry', undefined));
    this.pointAtCursorFeature_.setProperties({
      'sketchHitGeometry': undefined,
      'subtype': undefined,
    });
    if (feature) {
      const type = feature.get('type') as FeatureType;
      const sketchGeometry = this.pointAtCursorFeature_.getGeometry();
      const featureGeometry = feature.getGeometry();
      let hitGeometry = null;
      if (type === 'segment') {
        this.scratchPoint_.setCoordinates(featureGeometry.getClosestPoint(sketchGeometry.getCoordinates()));
        hitGeometry = this.scratchPoint_;
      } else {
        hitGeometry = featureGeometry;
      }
      feature.set('sketchHitGeometry', hitGeometry);
      this.pointAtCursorFeature_.setProperties({
        'sketchHitGeometry': sketchGeometry,
        'subtype': type,
      });
    }
  }


  handleMoveEvent(event: MapBrowserEvent<UIEvent>) {
    if (event.dragging) {
      return;
    }
    this.pointAtCursorFeature_.getGeometry().setCoordinates(event.coordinate);
    this.lastPixel_ = event.pixel;
    this.updateSketchFeature();
  }

  handleEvent(event: MapBrowserEvent<UIEvent>): boolean {
    const stop = super.handleEvent(event);
    if (this.addControlPointCondition_(event)) {
      const feature = this.getFeatureAtPixel(event.pixel);
      if (feature && feature.get('type') === 'segment') {
        this.dispatchEvent(new ModifyEvent('modifyend', feature, event.coordinate));
        return false
      }
    }
    return stop;
  }

  handleDownEvent(event: MapBrowserEvent<UIEvent>): boolean {
    if (!this.condition_(event)) {
      return false;
    }
    console.assert(!this.feature_);
    this.feature_ = this.getFeatureAtPixel(event.pixel);

    if (!this.feature_) {
      return false;
    }
    this.dragStarted = false;
    return true;
  }

  handleDragEvent(event: MapBrowserEvent<UIEvent>) {
    this.pointAtCursorFeature_.getGeometry().setCoordinates(event.coordinate);

    const type = this.feature_.get('type') as FeatureType;
    if (!this.dragStarted) {
      this.dispatchEvent(new ModifyEvent('modifystart', this.feature_, event.coordinate));
      this.dragStarted = true;
      this.overlayLineString_ = null;
      switch (type) {
        case 'segment': {
          this.overlayFeature.set('dragging', true);
          // we create a 3 points linestring
          const geometry = this.feature_.getGeometry();
          console.assert(geometry.getType() === 'LineString', this.feature_.getProperties());
          const g = geometry;
          this.overlayLineString_  = new LineString([g.getFirstCoordinate(), event.coordinate, g.getLastCoordinate()]);
          this.overlayFeature.set('sketchHitGeometry', new Point(event.coordinate));
          this.involvedFeatures_ = [this.feature_];
          break;
        }
        case 'controlPoint': {
          this.feature_.set('dragging', true);
          // we create a 3 points linestring, doubled if end points clicked
          console.assert(this.feature_.getGeometry().getType() === 'Point', this.feature_.getProperties());
          const f = this.feature_ as Feature<Point>;
          const {before, after} = this.trackData_.getAdjacentSegments(f);
          if (!before && !after) {
            // single point case
            this.involvedFeatures_ = [this.feature_];
          } else {
            const bg = before?.getGeometry();
            const ag = after?.getGeometry();
            const p0 = bg ? bg.getFirstCoordinate() : ag.getLastCoordinate();
            const p2 = ag ? ag.getLastCoordinate() : bg.getFirstCoordinate();
            this.overlayLineString_  = new LineString([p0, event.coordinate, p2]);
            this.involvedFeatures_ = [before, this.feature_, after];
          }
          break;
        }
        case 'POI': {
          this.feature_.set('dragging', true);
          this.involvedFeatures_ = [this.feature_];
          break;
        }
        default:
          throw new Error('unknown feature');
      }

      if (this.overlayLineString_) {
        this.overlayFeature.setGeometry(this.overlayLineString_);
      }
      this.involvedFeatures_.forEach(f => {
        f?.get('type') === 'segment' && f.set('subtype', 'modifying')
      });
    }

    if (this.overlayLineString_) {
      // update sketch linestring
      const coordinates = this.overlayLineString_.getCoordinates();
      console.assert(coordinates.length === 3);
      coordinates[1] = event.coordinate;
      this.overlayLineString_.setCoordinates(coordinates);

      const sketchHitGeometry = this.overlayFeature.get('sketchHitGeometry');
      if (sketchHitGeometry) {
        sketchHitGeometry.setCoordinates(event.coordinate);
      }
    }

    if (type === 'controlPoint' || type === 'POI') {
      console.assert(this.feature_.getGeometry().getType() === 'Point');
      const g = this.feature_.getGeometry() as Point;
      g.setCoordinates(event.coordinate);
    }
  }

  handleUpEvent(event: MapBrowserEvent<UIEvent>): boolean {
    if (!this.dragStarted) {
      this.feature_ = null;
      return false;
    }
    this.dispatchEvent(new ModifyEvent('modifyend', this.feature_, event.coordinate));
    this.dragStarted = false;

    this.overlayFeature.setGeometry(null);
    this.overlayFeature.set('dragging', false);
    this.overlayFeature.set('sketchHitGeometry', undefined);

    this.involvedFeatures_.forEach(f => {
      f?.get('type') === 'segment' && f.set('subtype', undefined)
    });
    this.feature_ = null;
    return false;
  }
}
