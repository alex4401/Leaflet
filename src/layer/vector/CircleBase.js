import {Path} from './Path.js';
import * as Util from '../../core/Util.js';
import {toLatLng} from '../../geo/LatLng.js';
import {Bounds} from '../../geometry/Bounds.js';


export const CircleBase = Path.extend({

	// @section
	// @aka CircleMarker options
	options: {
		fill: true,

		// @option radius: Number = 10
		// Radius of the circle marker, in pixels
		radius: 10,

		// begin indie.io: marker dismissal
		dismissed: false
		// end indie.io
	},

	initialize(latlng, options) {
		Util.setOptions(this, options);
		this._latlng = toLatLng(latlng);
		this._radius = this.options.radius;
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

	// @method setRadius(radius: Number): this
	// Sets the radius of a circle marker. Units are in pixels.
	setRadius(radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	// @method getRadius(): Number
	// Returns the current radius of the circle
	getRadius() {
		return this._radius;
	},

	// begin indie.io: marker dismissal

	setDismissed(state) {
		this.options.dismissed = state;
		this.opacityMult = state ? 0.4 : 1;
		return this.redraw();
	},

	// end indie.io

	setStyle(options) {
		const radius = options && options.radius || this._radius;
		Path.prototype.setStyle.call(this, options);
		this.setRadius(radius);
		return this;
	},

	_project() {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds() {
		const r = this._radius,
		    r2 = this._radiusY || r,
		    w = this._clickTolerance(),
		    p = [r + w, r2 + w];
		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update() {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath() {
		this._renderer._updateCircle(this);
	},

	_empty() {
		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	},

	// Needed by the `Canvas` renderer for interactivity
	_containsPoint(p) {
		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
	}
});
