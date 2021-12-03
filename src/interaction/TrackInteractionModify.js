import PointerInteraction from 'ol/interaction/Pointer.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import Point from 'ol/geom/Point.js';
import Event from 'ol/events/Event.js';

/**
 * @template UIEvent
 * @typedef {import('ol/MapBrowserEvent.js').default<UIEvent>} MapBrowserEvent<UIEvent>
 */

/** @typedef {import('ol/geom/Geometry.js').default} Geometry */

/**
 * @typedef {import('ol/render/Feature.js').default} RenderFeature
 */

export class ModifyEvent extends Event {

  /**
   *
   * @param {string} type
   * @param {Feature<Geometry>} feature
   */
  constructor(type, feature) {
    super(type);

    /**
     * The feature being modified.
     * @type {Feature<any>}
     */
    this.feature = feature;
  }
}


/** @typedef {import('ol/style/Style').StyleFunction} StyleFunction */

/**
 * @typedef Options
 * @type {Object}
 * @property {VectorSource<any>} source
 * @property {import('./TrackData').default} trackData
 * @property {StyleFunction} style
 * @property {function(MapBrowserEvent<any>): boolean} condition
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

    this.condition_ = options.condition;

    this.source_ = options.source;

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
      style: (feature, resolution) => {
        return options.style(feature, resolution);
      },
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });

    this.trackData_ = options.trackData;

    this.pointAtCursor_ = new Point([0, 0]);
    this.overlay_.getSource().addFeature(new Feature({
      geometry: this.pointAtCursor_,
      type: 'controlPoint',
      subtype: 'sketch',
    }));
    /** @type {Feature<any>[]} */
    this.involvedFeatures_ = [];
    this.overlayLineString_ = null;
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
   * @param {MapBrowserEvent<any>} event
   */
  handleMoveEvent(event) {
    this.pointAtCursor_.setCoordinates(event.coordinate);
  }

  /**
   * @param {MapBrowserEvent<any>} event
   * @return {boolean}
   */
  handleDownEvent(event) {
    if (!this.condition_(event)) {
      return false;
    }
    console.assert(!this.feature_);
    this.feature_ = /** @type {Feature<LineString|Point>} */ (event.map.forEachFeatureAtPixel(
      event.pixel,
      (f) => f, {
        layerFilter: (l) => l.getSource() === this.source_,
        hitTolerance: 20
      })
    );

    if (this.feature_) {
      this.overlayLineString_ = null;
      switch (this.feature_.get('type')) {
        case 'segment': {
          // we create a 3 points linestring
          const geometry = this.feature_.getGeometry();
          console.log(geometry.getType(), this.feature_.getProperties())
          console.assert(geometry.getType() === 'LineString', this.feature_.getProperties());
          const g = /** @type {LineString} */ (geometry);
          this.overlayLineString_  = new LineString([g.getFirstCoordinate(), event.coordinate, g.getLastCoordinate()])
          this.involvedFeatures_ = [this.feature_];
          break;
        }
        case 'controlPoint': {
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
        default:
          return false; // not managed, should not happen
      }

      if (this.overlayLineString_ ) {
        this.overlayFeature_.setGeometry(this.overlayLineString_ );
        this.overlay_.getSource().addFeature(this.overlayFeature_);
      }
      this.involvedFeatures_.forEach(f => {
        f?.get('type') === 'segment' && f?.set('subtype', 'modifying')
      });
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param {MapBrowserEvent<any>} event
   */
  handleDragEvent(event) {
    this.pointAtCursor_.setCoordinates(event.coordinate);

    const type = this.feature_.get('type');
    if (this.overlayLineString_ ) {
      // update sketch linestring
      const coordinates = this.overlayLineString_.getCoordinates();
      console.assert(coordinates.length === 3);
      coordinates[1] = event.coordinate;
      this.overlayLineString_.setCoordinates(coordinates);
    }

    if (type === 'controlPoint') {
      const g = /** @type {Point} */ (this.feature_.getGeometry());
      g.setCoordinates(event.coordinate);
    }
  }

  handleUpEvent() {
    this.involvedFeatures_.forEach(f => {
      f?.get('type') === 'segment' && f?.set('subtype', undefined)
    });
    this.dispatchEvent(new ModifyEvent('modifyend', this.feature_));
    if (this.overlayLineString_) {
      this.overlay_.getSource().removeFeature(this.overlayFeature_);
    }
    this.feature_ = null;
    return false;
  }
}
