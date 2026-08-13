import * as Cesium from 'cesium';
import { toCartesian3, toCartesian3List } from '@/cesium/core/utils/coordinate';
import type { RenderOptions } from './types';

/** 生成线实体配置（不直接挂载，由调用方决定时机） */
export function createLine(
    coordinates: number[][],
    properties: Record<string, unknown>,
    options: RenderOptions
): Cesium.Entity.ConstructorOptions {
    return {
        polyline: {
            positions: toCartesian3List(coordinates),
            width: options.polylineWidth,
            material: options.polylineColor,
            clampToGround: true
        },
        properties
    };
}

/** 生成点实体配置 */
export function createPoint(
    lng: number,
    lat: number,
    height = 0,
    options: Cesium.PointGraphics.ConstructorOptions = {}
): Cesium.Entity.ConstructorOptions {
    return {
        position: toCartesian3(lng, lat, height),
        point: {
            pixelSize: 8,
            color: Cesium.Color.fromCssColorString('#00b7ff'),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            ...options
        }
    };
}

/** 生成文本标签实体配置 */
export function createLabel(
    lng: number,
    lat: number,
    height: number,
    text: string,
    options: Cesium.LabelGraphics.ConstructorOptions = {}
): Cesium.Entity.ConstructorOptions {
    return {
        position: toCartesian3(lng, lat, height),
        label: {
            text,
            font: '14px sans-serif',
            fillColor: Cesium.Color.WHITE,
            style: Cesium.LabelStyle.FILL,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -12),
            ...options
        }
    };
}

/** 生成图片图标实体配置 */
export function createBillboard(
    lng: number,
    lat: number,
    height: number,
    image: string,
    options: Cesium.BillboardGraphics.ConstructorOptions = {}
): Cesium.Entity.ConstructorOptions {
    return {
        position: toCartesian3(lng, lat, height),
        billboard: { image, ...options }
    };
}

/** 生成多边形实体配置（坐标环为闭合顺序即可） */
export function createPolygon(
    coordinates: number[][],
    options: Cesium.PolygonGraphics.ConstructorOptions = {}
): Cesium.Entity.ConstructorOptions {
    return {
        polygon: {
            hierarchy: toCartesian3List(coordinates),
            material: Cesium.Color.CYAN.withAlpha(0.3),
            outline: true,
            outlineColor: Cesium.Color.CYAN,
            ...options
        }
    };
}

/** 生成圆形实体配置（半径单位：米） */
export function createCircle(
    lng: number,
    lat: number,
    radius: number,
    height = 0,
    options: Cesium.EllipseGraphics.ConstructorOptions = {}
): Cesium.Entity.ConstructorOptions {
    return {
        position: toCartesian3(lng, lat, height),
        ellipse: {
            semiMajorAxis: radius,
            semiMinorAxis: radius,
            material: Cesium.Color.CYAN.withAlpha(0.3),
            ...options
        }
    };
}
