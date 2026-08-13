import * as Cesium from 'cesium';

export type { Feature, FeatureCollection, Geometry } from 'geojson';

/** GeoJSON 渲染样式配置 */
export interface RenderOptions {
    fillColor: Cesium.Color;
    strokeColor: Cesium.Color;
    strokeWidth: number;
    strokeHoles: boolean;
    pointColor: Cesium.Color;
    pointSize: number;
    polylineColor: Cesium.Color;
    polylineWidth: number;
}

export const DEFAULT_RENDER_OPTIONS: RenderOptions = {
    fillColor: Cesium.Color.CYAN.withAlpha(0.2),
    strokeColor: Cesium.Color.fromCssColorString('#f5ad47'),
    strokeWidth: 2,
    strokeHoles: true,
    pointColor: Cesium.Color.RED,
    pointSize: 10,
    polylineColor: Cesium.Color.fromCssColorString('#f5ad47'),
    polylineWidth: 2
};
