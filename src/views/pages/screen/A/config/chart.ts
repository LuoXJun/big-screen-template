import type { EChartsCoreOption } from '@/components/charts/echarts';

/**
 * 大屏科技蓝色板（JS 侧常量：ECharts 配置需实际色值，CSS 变量不可用；
 * 与 tokens/_screen.scss 色板保持一致，修改时两端同步）
 */
const ACCENT = '#00d4ff';
const TEXT_SECONDARY = '#8fb4dd';
const PALETTE = [ACCENT, '#ffc64a', '#7fd4ff', '#4f7cff', '#4ae3c1', '#ff8a5c'];

/** 通用 tooltip 样式：半透明面板底 + 青蓝描边 */
const tooltipStyle = {
    backgroundColor: 'rgba(9, 25, 54, 0.92)',
    borderColor: 'rgba(0, 168, 255, 0.35)',
    textStyle: { color: '#e8f4ff' }
} as const;

/** 坐标轴样式：次文字色 + 半透明分割虚线 */
const axisLineStyle = { lineStyle: { color: 'rgba(143, 180, 221, 0.25)' } };
const splitLineStyle = { lineStyle: { color: 'rgba(143, 180, 221, 0.12)', type: 'dashed' as const } };

/** 柱状图：渐变柱体 + 圆角顶，按区域对比 */
export const barOption: EChartsCoreOption = {
    tooltip: { trigger: 'axis', ...tooltipStyle },
    grid: { top: 24, left: 44, right: 20, bottom: 28 },
    xAxis: {
        type: 'category',
        data: ['华东', '华南', '华北', '西南', '东北'],
        axisLine: axisLineStyle,
        axisLabel: { color: TEXT_SECONDARY }
    },
    yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: TEXT_SECONDARY },
        splitLine: splitLineStyle
    },
    series: [
        {
            type: 'bar',
            barWidth: '48%',
            data: [820, 932, 901, 934, 1290],
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: ACCENT },
                        { offset: 1, color: 'rgba(0, 212, 255, 0.12)' }
                    ]
                }
            }
        }
    ]
};

/** 折线图：渐变面积 + 数据点；数据由业务侧传入（配合 setOption 手动更新） */
export function createLineOption(data: number[]): EChartsCoreOption {
    return {
        tooltip: { trigger: 'axis', ...tooltipStyle },
        grid: { top: 24, left: 44, right: 20, bottom: 28 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.map((_, i) => `${String(i).padStart(2, '0')}:00`),
            axisLine: axisLineStyle,
            axisLabel: { color: TEXT_SECONDARY }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { color: TEXT_SECONDARY },
            splitLine: splitLineStyle
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                data,
                lineStyle: { color: ACCENT, width: 2 },
                itemStyle: { color: ACCENT, borderColor: '#0a0f2a', borderWidth: 2 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 212, 255, 0.35)' },
                            { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
                        ]
                    }
                }
            }
        ]
    };
}

/** 折线图初始数据（最近 12 个时刻） */
export const initialLineData = [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330];

/** 模拟实时采集：窗口滚动 + 随机增量，保持长度不变 */
export function nextLineData(prev: number[]): number[] {
    const next = prev.slice(1);
    const last = next[next.length - 1] ?? 0;
    next.push(Math.max(0, last + Math.round((Math.random() - 0.45) * 40)));
    return next;
}

/** 饼图：实心饼，占比标签 */
export const pieOption: EChartsCoreOption = {
    tooltip: { trigger: 'item', ...tooltipStyle },
    legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: { color: TEXT_SECONDARY }
    },
    series: [
        {
            type: 'pie',
            radius: '58%',
            center: ['50%', '46%'],
            data: [
                { name: '摄像机', value: 1286 },
                { name: '传感器', value: 834 },
                { name: '基站', value: 512 },
                { name: '无人机', value: 176 },
                { name: '其他', value: 92 }
            ],
            label: { color: TEXT_SECONDARY, formatter: '{b}\n{d}%' },
            labelLine: { lineStyle: { color: 'rgba(143, 180, 221, 0.4)' } },
            itemStyle: { borderColor: '#0a0f2a', borderWidth: 2 },
            color: PALETTE,
            emphasis: {
                label: { color: '#e8f4ff', fontWeight: 'bold' },
                itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0, 212, 255, 0.6)' }
            }
        }
    ]
};

/** 圆环图：环形占比，中心显示总数 */
export const ringOption: EChartsCoreOption = {
    tooltip: { trigger: 'item', ...tooltipStyle },
    title: {
        text: '2900',
        subtext: '设备总数',
        left: 'center',
        top: '38%',
        textStyle: { color: '#e8f4ff', fontSize: 24, fontWeight: 'bold' },
        subtextStyle: { color: TEXT_SECONDARY, fontSize: 12 }
    },
    legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: { color: TEXT_SECONDARY }
    },
    series: [
        {
            type: 'pie',
            radius: ['45%', '68%'],
            center: ['50%', '46%'],
            data: [
                { name: '在线', value: 2143 },
                { name: '离线', value: 486 },
                { name: '维护中', value: 271 }
            ],
            label: { show: false },
            itemStyle: { borderColor: '#0a0f2a', borderWidth: 2 },
            color: PALETTE,
            emphasis: {
                itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0, 212, 255, 0.6)' }
            }
        }
    ]
};
