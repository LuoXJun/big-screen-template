import type { HeatmapPoint } from '@/cesium';

/** 温度色条：低温蓝 → 高温红 */
export const heatmapColors = ['#003cff', '#00d4ff', '#00ff8c', '#f7ff00', '#ff4d00', '#ff0019'];

/** 裁剪多边形：长三角核心区（杭州湾-上海-南通-南京），演示不规则区域热力 */
export const heatmapPolygon = {
    rings: [
        [
            [119.5, 30.0],
            [120.8, 30.2],
            [122.0, 30.8],
            [122.2, 31.5],
            [121.5, 32.2],
            [120.3, 32.5],
            [119.0, 32.0],
            [118.8, 31.0],
            [119.5, 30.0]
        ]
    ]
};

/**
 * 华东温度场演示数据：网格采样 + 平滑温度分布
 * （纬度南高北低，中部叠加一个热核，附少量随机扰动）
 */
export function createHeatmapPoints(): HeatmapPoint[] {
    const points: HeatmapPoint[] = [];
    for (let lon = 118.5; lon <= 122.5; lon += 0.12) {
        for (let lat = 29.8; lat <= 32.7; lat += 0.12) {
            const latTerm = 18 + (lat - 28) * 0.8;
            const heatCore = 8 * Math.exp(-((lon - 120.5) ** 2 + (lat - 32.5) ** 2) / 6);
            points.push({ lon, lat, value: latTerm + heatCore + Math.random() * 1.5 });
        }
    }
    return points;
}
