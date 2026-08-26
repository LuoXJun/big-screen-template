import type { EChartsCoreOption } from '@/components/charts/echarts';
import { computed } from 'vue';

/** 红外测温折线图色板（深蓝底 + 绿色系，参考 design 截图） */
const CHART_GREEN = '#3eca99';
const CHART_GREEN_LIGHT = '#7ee0b8';
const CHART_TEXT = '#8fb4dd';

/** 各测温通道温度曲线（参考 image.png 双线折线设计） */
export const chartOption = computed<EChartsCoreOption>(() => ({
    tooltip: { trigger: 'axis' },
    legend: {
        top: 4,
        right: 10,
        textStyle: { color: CHART_TEXT },
        itemWidth: 14,
        itemHeight: 8
    },
    grid: { top: 34, left: 44, right: 20, bottom: 26 },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        axisLine: { lineStyle: { color: 'rgba(143, 180, 221, 0.25)' } },
        axisLabel: { color: CHART_TEXT }
    },
    yAxis: {
        type: 'value',
        name: '°C',
        nameTextStyle: { color: CHART_TEXT },
        axisLine: { show: false },
        axisLabel: { color: CHART_TEXT },
        splitLine: { lineStyle: { color: 'rgba(143, 180, 221, 0.12)', type: 'dashed' as const } }
    },
    series: [
        {
            name: '通道 A',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data: [42, 45, 51, 58, 63, 55, 46],
            lineStyle: { color: CHART_GREEN, width: 2 },
            itemStyle: { color: CHART_GREEN, borderColor: '#071431', borderWidth: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(62, 202, 153, 0.4)' },
                        { offset: 1, color: 'rgba(62, 202, 153, 0.02)' }
                    ]
                }
            }
        },
        {
            name: '通道 B',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            data: [38, 40, 47, 52, 49, 44, 39],
            lineStyle: { color: CHART_GREEN_LIGHT, width: 2 },
            itemStyle: { color: CHART_GREEN_LIGHT, borderColor: '#071431', borderWidth: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(126, 224, 184, 0.25)' },
                        { offset: 1, color: 'rgba(126, 224, 184, 0.02)' }
                    ]
                }
            }
        }
    ]
}));

const labels = [
    { label: '检测位置', props: 'userName' },
    { label: '姓名', props: 'realName' },
    { label: '创建时间', props: 'createTime' },
    { label: '状态', props: 'status' },
    { label: '电话号码', props: 'phone' }
];

export const tableColumnConfig = reactive(
    labels.map((item) => {
        const obj: ITableColumn = {
            filed: item.props,
            label: item.label,
            options: {
                align: 'center',
                showOverflowTooltip: true
            }
        };

        return obj;
    })
);
