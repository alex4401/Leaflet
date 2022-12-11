import {Map} from '../Map.js';
import {Handler} from '../../core/Handler.js';
import * as DomEvent from '../../dom/DomEvent.js';

/*
 * Smooth zoom behaviour is based on Leaflet.SmoothWheelZoom by mutsuyuki.
 */

/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

// @namespace Map
// @section Interaction Options
Map.mergeOptions({
	// @section Mouse wheel options
	// @option scrollWheelZoom: Boolean|String = true
	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
	// it will zoom to the center of the view regardless of where the mouse was.
	scrollWheelZoom: true,

	// @option wheelDebounceTime: Number = 40
	// Limits the rate at which a wheel can fire (in milliseconds). By default
	// user can't zoom via wheel more often than once per 40 ms.
	wheelDebounceTime: 40,

	// @option wheelPxPerZoomLevel: Number = 60
	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
	// mean a change of one full zoom level. Smaller values will make wheel-zooming
	// faster (and vice versa).
	wheelPxPerZoomLevel: 60
});

export const ScrollWheelZoom = Handler.extend({
	addHooks() {
		DomEvent.on(this._map._container, 'wheel', this._onWheelScroll, this);
		this._delta = 0;
	},

	removeHooks() {
		DomEvent.off(this._map._container, 'wheel', this._onWheelScroll, this);
	},

	_onWheelScroll(e) {
		this._delta += DomEvent.getWheelDelta(e);
		this._wheelMousePosition = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		const left = Math.max(this._map.options.wheelDebounceTime - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(this._performZoom.bind(this), left);

		DomEvent.stop(e);
	},

	_performZoom() {
		const map = this._map;

		if (!this._isWheeling) {
			this._isWheeling = true;
			this._centrePoint = map.getSize()._divideBy(2);
			this._moved = false;

			map._stop();
			if (map._panAnim) {
				map._panAnim.stop();
			}

			this._goalZoom = map.getZoom();
			this._prevCenter = map.getCenter();
			this._prevZoom = map.getZoom();

			this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
		}

		this._goalZoom += this._delta / (map.options.wheelPxPerZoomLevel * 4);
		this._delta = 0;
		if (this._goalZoom < map.getMinZoom() || this._goalZoom > map.getMaxZoom()) {
			this._goalZoom = map._limitZoom(this._goalZoom);
		}

		clearTimeout(this._timeoutId);
		this._timeoutId = setTimeout(this._onWheelEnd.bind(this), 200);
	},

	_onWheelEnd() {
		this._isWheeling = false;
		cancelAnimationFrame(this._zoomAnimationId);
		this._map._moveEnd(true);
	},

	_updateWheelZoom() {
		const map = this._map;

		if ((!map.getCenter().equals(this._prevCenter)) || map.getZoom() !== this._prevZoom) {
			return;
		}

		const zoom = Math.floor((map.getZoom() + (this._goalZoom - map.getZoom()) * 0.3) * 1000) / 1000,
		    centreOffset = this._wheelMousePosition.subtract(this._centrePoint).multiplyBy(1 - 1 / this._map.getZoomScale(zoom)),
		    centre = this._map.containerPointToLatLng(this._centrePoint.add(centreOffset));

		if (!this._moved) {
			map._moveStart(true, false);
			this._moved = true;
		}

		map._move(centre, zoom);
		this._prevCenter = map.getCenter();
		this._prevZoom = map.getZoom();

		this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
	}
});

// @section Handlers
// @property scrollWheelZoom: Handler
// Scroll wheel zoom handler.
Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);
