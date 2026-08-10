/**
 * Cesium UMD 全局类型声明
 *
 * 将 Cesium 模块以 UMD 全局形式暴露：全局裸 `Cesium`（类型 + 值）可用，
 * 组件内无需 import。
 *
 * - 类型：来自包内自带声明（node_modules/cesium/Source/Cesium.d.ts，1.131）
 * - 运行时：main.ts 中 `window.Cesium = Cesium`（浏览器全局变量）
 * - 依赖：tsconfig 已开启 allowUmdGlobalAccess（允许模块文件访问 UMD 全局）
 */
import * as Cesium from 'cesium';

export = Cesium;
export as namespace Cesium;
