import * as Cesium from 'cesium';
import { getViewer } from '@/cesium/core/viewer';

export interface CircleEffectOptions {
    /** 扩散中心点（默认 (100, 30) 附近） */
    center?: Cesium.Cartesian3;
    /** 扩散半径（米） */
    radius?: number;
    /** 着色器 uniform 变量 */
    uniforms?: Record<string, unknown>;
    /** 扩散圆片元着色器源码 */
    shader: string;
}

/** 圆形扩散效果：以中心点绘制椭圆，配合自定义着色器实现扩散动画 */
export class CircleEffect {
    private readonly center: Cesium.Cartesian3;
    private readonly radius: number;
    private readonly uniforms: Record<string, unknown>;
    private readonly shader: string;
    private material?: Cesium.Material;
    private primitive?: Cesium.GroundPrimitive;

    constructor(options: CircleEffectOptions) {
        this.center = options.center ?? Cesium.Cartesian3.fromDegrees(100, 30, 0);
        this.radius = options.radius ?? 1_000_000;
        this.uniforms = options.uniforms ?? {};
        this.shader = options.shader;
    }

    /** 创建并挂载圆扩散效果到场景（重复调用返回已挂载实例） */
    add(): Cesium.GroundPrimitive {
        if (this.primitive) return this.primitive;
        const circle = new Cesium.EllipseGeometry({
            center: this.center,
            semiMajorAxis: this.radius,
            semiMinorAxis: this.radius
        });
        this.material = new Cesium.Material({
            translucent: true,
            fabric: { uniforms: this.uniforms, source: this.shader }
        });
        this.primitive = new Cesium.GroundPrimitive({
            geometryInstances: [new Cesium.GeometryInstance({ geometry: circle })],
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
