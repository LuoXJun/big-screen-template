import * as Cesium from 'cesium';
import { getViewer } from './viewer';

/** 添加影像图层（provider 由调用方创建，便于自定义 URL/参数） */
export function addImageryLayer(
    provider: Cesium.ImageryProvider,
    options: Cesium.ImageryLayer.ConstructorOptions = {}
): Cesium.ImageryLayer {
    const layer = new Cesium.ImageryLayer(provider, options);
    getViewer().imageryLayers.add(layer);
    return layer;
}

/** 切换底图：清空当前影像层后挂载新底图 */
export function setBaseImagery(provider: Cesium.ImageryProvider): void {
    removeAllImageryLayers();
    addImageryLayer(provider);
}

export function removeImageryLayer(layer: Cesium.ImageryLayer): void {
    getViewer().imageryLayers.remove(layer, true);
}

export function removeAllImageryLayers(): void {
    getViewer().imageryLayers.removeAll(true);
}

export function loadGeoJson(
    url: string,
    options: Cesium.GeoJsonDataSource.LoadOptions = {}
): Promise<Cesium.GeoJsonDataSource> {
    return trackDataSource(Cesium.GeoJsonDataSource.load(url, options));
}

export function loadCzml(
    url: string | object,
    options: Cesium.CzmlDataSource.LoadOptions = {}
): Promise<Cesium.CzmlDataSource> {
    return trackDataSource(Cesium.CzmlDataSource.load(url, options));
}

export function loadKml(
    url: string,
    options: Cesium.KmlDataSource.LoadOptions = {}
): Promise<Cesium.KmlDataSource> {
    return trackDataSource(Cesium.KmlDataSource.load(url, options));
}

/** 加载完成后自动挂载到 viewer.dataSources，便于统一清理 */
async function trackDataSource<T extends Cesium.DataSource>(loading: Promise<T>): Promise<T> {
    const dataSource = await loading;
    getViewer().dataSources.add(dataSource);
    return dataSource;
}

export function removeDataSource(dataSource: Cesium.DataSource): void {
    getViewer().dataSources.remove(dataSource, true);
}

export function removeAllDataSources(): void {
    getViewer().dataSources.removeAll(true);
}
