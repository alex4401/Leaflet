export {Renderer} from './Renderer';
export {Canvas} from './Canvas';
// import {SVG, create, pointsToPath, svg} from './SVG';
// SVG.create = create;
// SVG.pointsToPath = pointsToPath;
// export {SVG, svg};
import './Renderer.getRenderer';	// This is a bit of a hack, but needed because circular dependencies

export {Path} from './Path';
export {CircleMarker} from './CircleMarker';
export {Circle} from './Circle';
export {Polyline} from './Polyline';
export {Polygon} from './Polygon';
export {Rectangle} from './Rectangle';
export {CanvasIconMarker} from './CanvasIconMarker';
