import {CircleBase} from './CircleBase.js';
import {Bounds} from '../../geometry/Bounds.js';


// begin indie.io: radius constant to limit scaling
const MAX_RADIUS_TO_GROW_MORE = 4;
// end indie.io

/*
 * @class CircleMarker
 * @aka L.CircleMarker
 * @inherits Path
 *
 * A circle of a fixed size with radius specified in pixels. Extends `Path`.
 */
export const CircleMarker = CircleBase.extend({
	// begin indie.io: marker dismissal

	setDismissed(state) {
		this.options.dismissed = state;
		this.opacityMult = state ? 0.4 : 1;
		return this.redraw();
	},

	// end indie.io

	// begin indie.io: visual scaling to improve legibility

	getDisplayScale() {
		const mapOptions = this._map.options;
		if (mapOptions.shouldScaleMarkers && this.options.radius <= MAX_RADIUS_TO_GROW_MORE) {
			return mapOptions.vecMarkerScale + (1 - this._map._zoom / mapOptions.maxZoom) *
				(this.options.zoomScaleFactor || mapOptions.markerZoomScaleFactor);
		}
		return mapOptions.vecMarkerScale;
	},

	// end indie.io

	_updateBounds() {
		this._radius = this.options.radius * this.getDisplayScale();
		const r = this._radius,
		    r2 = this._radiusY || r,
		    w = this._clickTolerance(),
		    p = [r + w, r2 + w];
		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
	},

	_updatePath() {
		this._radius = this.options.radius * this.getDisplayScale();
		this._renderer._updateCircle(this);
	},

	// begin indie.io: popup anchoring
	_getPopupAnchor() {
		return [this._radius / 2, -this._radius / 2];
	}
	// end indie.io
});
