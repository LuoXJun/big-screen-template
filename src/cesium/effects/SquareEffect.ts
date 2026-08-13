import * as Cesium from 'cesium';
import { getViewer } from '@/cesium/core/viewer';

export interface SquareEffectOptions {
    /** 扩散中心点（默认 (100, 30) 附近） */
    center?: Cesium.Cartesian3;
    /** 扩散半径（米） */
    radius?: number;
    /** 着色器 uniform 变量 */
    uniforms?: Record<string, unknown>;
    /** 扩散矩形片元着色器源码 */
    shader: string;
}

/** 方形扩散效果：以中心点绘制地面矩形，配合自定义着色器实现扩散动画 */
export class SquareEffect {
    private readonly center: Cesium.Cartesian3;
    private readonly radius: number;
    private readonly uniforms: Record<string, unknown>;
    private readonly shader: string;
    private material?: Cesium.Material;
    private primitive?: Cesium.GroundPrimitive;

    constructor(options: SquareEffectOptions) {
        this.center = options.center ?? Cesium.Cartesian3.fromDegrees(100, 30, 0);
        this.radius = options.radius ?? 1_000_000;
        this.uniforms = options.uniforms ?? {};
        this.shader = options.shader;
    }

    /** 以中心点与半径（米）计算地面矩形边界 */
    createRectangleFromCenter(center: Cesium.Cartesian3, radius: number): Cesium.Rectangle {
        const cartographic = Cesium.Cartographic.fromCartesian(center);
        const earthRadius = Cesium.Ellipsoid.WGS84.maximumRadius;
        const latOffset = radius / earthRadius;
        const lonOffset = radius / (earthRadius * Math.cos(cartographic.latitude));
        return new Cesium.Rectangle(
            cartographic.longitude - lonOffset,
            cartographic.latitude - latOffset,
            cartographic.longitude + lonOffset,
            cartographic.latitude + latOffset
        );
    }

    /** 创建并挂载矩形效果到场景（重复调用返回已挂载实例） */
    add(): Cesium.GroundPrimitive {
        if (this.primitive) return this.primitive;
        const rectangle = new Cesium.RectangleGeometry({
            rectangle: this.createRectangleFromCenter(this.center, this.radius)
        });
        this.material = new Cesium.Material({
            translucent: true,
            fabric: { uniforms: this.uniforms, source: this.shader }
        });
        this.primitive = new Cesium.GroundPrimitive({
            geometryInstances: [new Cesium.GeometryInstance({ geometry: rectangle })],
            appearance: new Cesium.MaterialAppearance({
                translucent: true,
                material: this.material
            })
        });
        getViewer().scene.primitives.add(this.primitive);
        return this.primitive;
    }

    /** 从场景移除并销毁 */
    remove(): void {
        if (!this.primitive) return;
        getViewer().scene.primitives.remove(this.primitive);
        this.primitive.destroy();
        this.primitive = undefined;
        this.material = undefined;
    }
}
