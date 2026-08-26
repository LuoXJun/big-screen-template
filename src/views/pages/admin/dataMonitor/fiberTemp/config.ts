import type { EChartsCoreOption } from '@/components/charts/echarts';
import { computed } from 'vue';

/** 深蓝监控页图表色板（与页面背景 #071431 适配） */
const CHART_ACCENT = '#00d4ff';
const CHART_TEXT = '#8fb4dd';

/** 各通道当前温度折线图（数据来源 list） */
export const chartOption = computed<EChartsCoreOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { top: 30, left: 44, right: 20, bottom: 28 },
    xAxis: {
        type: 'category',
        data: ['12:00', '12:00', '12:00', '12:00', '12:00', '12:00'],
        axisLine: { lineStyle: { color: 'rgba(143, 180, 221, 0.25)' } },
        axisLabel: { color: CHART_TEXT }
    },
    yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: { color: CHART_TEXT },
        axisLine: { show: false },
        axisLabel: { color: CHART_TEXT },
        splitLine: { lineStyle: { color: 'rgba(143, 180, 221, 0.12)', type: 'dashed' as const } }
    },
    series: [
        {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            data: [30, 40, 50, 60, 80, 20],
            lineStyle: { color: CHART_ACCENT, width: 2 },
            itemStyle: { color: CHART_ACCENT, borderColor: '#071431', borderWidth: 2 },
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
        },
        {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            data: [10, 20, 40, 80, 10, 30],
            lineStyle: { color: CHART_ACCENT, width: 2 },
            itemStyle: { color: CHART_ACCENT, borderColor: '#071431', borderWidth: 2 },
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
}));
