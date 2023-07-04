import PointerInteraction from 'ol/interaction/Pointer.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';
import Event from 'ol/events/Event.js';

/**
 * @typedef {import('ol/MapBrowserEvent.js').default<UIEvent>} MapBrowserEvent
 */

/** @typedef {import('ol/geom/Geometry.js').default} Geometry */

/** @typedef {import('ol/render/Feature.js').default} RenderFeature */

export class ModifyEvent extends Event {

  /**
   *
   * @param {string} type
   * @param {Feature<Geometry>} feature
   * @param {import("ol/coordinate.js").Coordinate} coordinate
   */
  constructor(type, feature, coordinate) {
    super(type);

    /**
     * The feature being modified.
     * @type {Feature<any>}
     */
    this.feature = feature;

    /**
     * The coordinate of the pointer when modification occurred.
     * @type {import("ol/coordinate.js").Coordinate}
     */
    this.coordinate = coordinate;
  }
}


/** @typedef {import('ol/style/Style').StyleFunction} StyleFunction */

/**
 * @typedef Options
 * @type {Object}
 * @property {VectorSource<any>} source
 * @property {import('./TrackData').default} trackData
 * @property {StyleFunction} style
 * @property {function(MapBrowserEvent): boolean} condition
 * @property {number} hitTolerance Pixel tolerance for considering the pointer close enough to a segment for snapping.
 */


/**
 * Interaction to modify a Vector Source.
 * - on down a 3 points linestring is created and dispatched as modifystart;
 * - on drag the middle point is updated;
 * - on up the modifyend event is dispatched.
 */
export default class Modify extends PointerInteraction {

  /**
   *
   * @param {Options} options
   */
  constructor(options) {
    super();

    this.dragStarted = false;

    this.condition_ = options.condition;

    this.source_ = options.source;

    this.hitTolerance_ = options.hitTolerance;

    /**
     * The feature being modified.
     *  @type {Feature<Point|LineString>}
     */
    this.feature_ = null;

    /**
     * Editing vertex.
     */
    this.overlayFeature_ = new Feature({
      type: 'segment'
    });

    /**
     * Draw overlay where sketch features are drawn.
     */
    this.overlay_ = new VectorLayer({
      source: new VectorSource({
        useSpatialIndex: false
      }),
      style: (feature, resolution) => options.style(feature, resolution),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });

    this.trackData_ = options.trackData;

    this.lastPixel_ = [0, 0];

    /**
     * @type {Feature<Point>}
     */
    this.pointAtCursorFeature_ = new Feature({
      geometry: new Point([0, 0]),
      type: 'sketch',
      subtype: '',
    });
    this.overlay_.getSource().addFeature(this.pointAtCursorFeature_);

    /** @type {Feature<any>[]} */
    this.involvedFeatures_ = [];
    this.overlayLineString_ = null;

    this.scratchPoint_ = new Point([0, 0]);
  }

  /**
   *
   * @param {import("ol/Map").default} map
   */
  setMap(map) {
    this.overlay_.setMap(map);
    super.setMap(map);
  }

  /**
   * Get the first feature at pixel, favor points over lines
   * @param {import("ol/pixel").Pixel} pixel
   * @return {Feature<LineString|Point>|undefined}
   */
  getFeatureAtPixel(pixel) {
    const features = /** @type {Feature<LineString|Point>[]} */ (this.getMap().getFeaturesAtPixel(pixel, {
      layerFilter: (l) => l.getSource() === this.source_,
      hitTolerance: this.hitTolerance_
    }));
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
    this.source_.forEachFeature((f) => f.set('sketchHitGeometry', undefined, true));
    this.pointAtCursorFeature_.set('sketchHitGeometry', undefined, true);
    this.pointAtCursorFeature_.set('subtype', undefined, true);
    if (feature) {
      const type = feature.get('type');
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
      this.pointAtCursorFeature_.set('sketchHitGeometry', sketchGeometry);
      this.pointAtCursorFeature_.set('subtype', type);
    }
  }

  /**
   * @param {MapBrowserEvent} event
   */
  handleMoveEvent(event) {
    this.pointAtCursorFeature_.getGeometry().setCoordinates(event.coordinate);
    this.lastPixel_ = event.pixel;
    this.updateSketchFeature();
  }

  /**
   * @param {MapBrowserEvent} event
   * @return {boolean}
   */
  handleDownEvent(event) {
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

  /**
   * @param {MapBrowserEvent} event
   */
  handleDragEvent(event) {
    this.pointAtCursorFeature_.getGeometry().setCoordinates(event.coordinate);

    const type = this.feature_.get('type');
    if (!this.dragStarted) {
      this.dragStarted = true;
      this.overlayLineString_ = null;
      switch (type) {
        case 'segment': {
          this.overlayFeature_.set('dragging', true);
          // we create a 3 points linestring
          const geometry = this.feature_.getGeometry();
          console.assert(geometry.getType() === 'LineString', this.feature_.getProperties());
          const g = /** @type {LineString} */ (geometry);
          this.overlayLineString_  = new LineString([g.getFirstCoordinate(), event.coordinate, g.getLastCoordinate()]);
          this.overlayFeature_.set('sketchHitGeometry', new Point(event.coordinate));
          this.involvedFeatures_ = [this.feature_];
          break;
        }
        case 'controlPoint': {
          this.feature_.set('dragging', true);
          // we create a 3 points linestring, doubled if end points clicked
          const f = /** @type {Feature<Point>} */ (this.feature_);
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
        this.overlayFeature_.setGeometry(this.overlayLineString_);
        this.overlay_.getSource().addFeature(this.overlayFeature_);
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

      const sketchHitGeometry = this.overlayFeature_.get('sketchHitGeometry');
      if (sketchHitGeometry) {
        sketchHitGeometry.setCoordinates(event.coordinate);
      }
    }

    if (type === 'controlPoint' || type === 'POI') {
      const g = /** @type {Point} */ (this.feature_.getGeometry());
      g.setCoordinates(event.coordinate);
    }
  }

  /**
   *
   * @param {MapBrowserEvent} event
   * @return {boolean}
   */
  handleUpEvent(event) {
    if (!this.dragStarted) {
      this.feature_ = null;
      return false;
    }
    this.dispatchEvent(new ModifyEvent('modifyend', this.feature_, event.coordinate));
    this.dragStarted = false;
    this.feature_.set('dragging', false, true);
    this.overlayFeature_.set('dragging', false, true);
    this.overlayFeature_.set('sketchHitGeometry', undefined, true);

    this.involvedFeatures_.forEach(f => {
      f?.get('type') === 'segment' && f.set('subtype', undefined, true)
    });
    if (this.overlayLineString_) {
      this.overlay_.getSource().removeFeature(this.overlayFeature_);
    }
    this.feature_ = null;
    return false;
  }
}
