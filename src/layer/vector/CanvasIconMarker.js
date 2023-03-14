import {Path} from './Path';
import * as Util from '../../core/Util';
import {toLatLng} from '../../geo/LatLng';
import {Bounds} from '../../geometry/Bounds';
import {toPoint as point} from '../../geometry/Point';


const MAX_RADIUS_TO_GROW_MORE = 4;

/*
 * @class CanvasIconMarker
 * @aka L.CanvasIconMarker
 * @inherits Path
 *
 * A circle of a fixed size with radius specified in pixels. Extends `Path`.
 */

export const CanvasIconMarker = Path.extend({

	// @section
	options: {
		icon: null,
		dismissed: false
	},

	initialize(latlng, options) {
		Util.setOptions(this, options);
		this._latlng = toLatLng(latlng);
	},

	setDismissed(state) {
		this.options.dismissed = state;
		this.opacityMult = state ? 0.4 : 1;
		return this.redraw();
	},

	// @method setLatLng(latLng: LatLng): this
	// Sets the position of a circle marker to a new location.
	setLatLng(latlng) {
		const oldLatLng = this._latlng;
		this._latlng = toLatLng(latlng);
		this.redraw();

		// @event move: Event
		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
		return this.fire('move', {oldLatLng, latlng: this._latlng});
	},

	// @method getLatLng(): LatLng
	// Returns the current geographical position of the circle marker
	getLatLng() {
		return this._latlng;
	},

	_project() {
		this._size = this.getScaledSize();
		this._halfSize = this._size.divideBy(2)._round();
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	getDisplayScale() {
		const mapOptions = this._map.options;
		if (mapOptions.shouldScaleMarkers && this.options.radius <= MAX_RADIUS_TO_GROW_MORE) {
			return mapOptions.iconMarkerScale + (1 - this._map._zoom / mapOptions.maxZoom) *
				(this.options.zoomScaleFactor || mapOptions.markerZoomScaleFactor);
		}
		return mapOptions.iconMarkerScale;
	},

	getScaledSize() {
		return point(this.options.icon.options.iconSize)._multiplyBy(this.getDisplayScale())._round();
	},

	_updateBounds() {
		this._pxBounds = new Bounds(this._point.subtract(this._size), this._point.add(this._size));
	},

	_update() {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath() {
		if (this.options.icon._canvasSource.complete) {
			this._renderer._updateImage(this);
		} else if (this._renderer._drawing) {
			this._iconLoaded = this._iconLoaded.bind(this);
			this.options.icon._canvasSource.addEventListener('load', this._iconLoaded);
		}
	},

	_iconLoaded() {
		this.options.icon._canvasSource.removeEventListener('load', this._iconLoaded);
		this._renderer._drawImage(this);
	},

	_empty() {
		return !this._renderer._bounds.intersects(this._pxBounds);
	},

	// Needed by the `Canvas` renderer for interactivity
	_containsPoint(p) {
		return this._pxBounds.contains(p);
	},

	_getPopupAnchor() {
		const size = this.getScaledSize();
		if (this.options.icon.options.anchorToBottom) {
			return [size.x / 2, -size.y];
		}
		return [size.x / 2, -size.y / 2];
	}
});
