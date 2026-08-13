import * as Cesium from 'cesium';
import type { Feature, FeatureCollection } from 'geojson';
import { getViewer } from '@/cesium/core/viewer';
import { createLine } from './createEntity';
import { DEFAULT_RENDER_OPTIONS, type RenderOptions } from './types';

/** 基于 Entity API 渲染 GeoJSON 线要素，支持样式配置与统一清理 */
export class RenderGeoJsonByGround {
    private readonly entities: Cesium.Entity[] = [];
    private options: RenderOptions;

    constructor(options?: Partial<RenderOptions>) {
        this.options = { ...DEFAULT_RENDER_OPTIONS, ...options };
    }

    /** 渲染全部要素（LineString / MultiLineString / GeometryCollection） */
    renderGeoJSON(geoJson: FeatureCollection | Feature): void {
        const features = geoJson.type === 'FeatureCollection' ? geoJson.features : [geoJson];
        for (const feature of features) {
            this.renderFeature(feature);
        }
    }

    /** 移除所有已渲染的实体 */
    clear(): void {
        const entities = getViewer().entities;
        this.entities.forEach((entity) => entities.remove(entity));
        this.entities.length = 0;
    }

    /** 更新样式（仅对新渲染的要素生效） */
    updateOptions(options: Partial<RenderOptions>): void {
        this.options = { ...this.options, ...options };
    }

    private renderFeature(feature: Feature): void {
        const geometry = feature.geometry;
        if (!geometry) return;
        const properties = feature.properties ?? {};
        switch (geometry.type) {
            case 'LineString':
                this.renderLineString(geometry.coordinates, properties);
                break;
            case 'MultiLineString':
                geometry.coordinates.forEach((line) => this.renderLineString(line, properties));
                break;
            case 'GeometryCollection':
                geometry.geometries.forEach((geom) =>
                    this.renderFeature({ type: 'Feature', geometry: geom, properties })
                );
                break;
            default:
                console.warn(`[cesiumTools] 不支持的要素类型: ${geometry.type}`);
        }
    }

    private renderLineString(coordinates: number[][], properties: Record<string, unknown>): void {
        const entity = getViewer().entities.add(createLine(coordinates, properties, this.options));
        this.entities.push(entity);
    }
}
