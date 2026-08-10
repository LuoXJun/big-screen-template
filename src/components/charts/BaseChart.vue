<template>
    <div ref="chartEl" class="base-chart" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts';
import type { GridComponentOption, LegendComponentOption, TooltipComponentOption } from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

/** 按需注册：图表类型 / 组件 / 渲染器 */
echarts.use([
    BarChart,
    LineChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer
]);

/** 支持的 option 组合类型 */
export type ChartOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | GridComponentOption
    | TooltipComponentOption
    | LegendComponentOption
>;

/** 图表交互事件的强类型载荷 */
export interface ChartEventPayload {
    seriesName: string;
    name: string;
    value: number;
    dataIndex: number;
    color: string;
}

const props = defineProps<{ option: ChartOption }>();

const emit = defineEmits<{
    (e: 'click', payload: ChartEventPayload): void;
    (e: 'hover', payload: ChartEventPayload): void;
}>();

const chartEl = ref<HTMLDivElement | null>(null);

let chart: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimer: number | undefined;

/** 把 echarts 原始事件参数收敛为强类型载荷 */
function toPayload(raw: unknown): ChartEventPayload {
    const p = raw as {
        seriesName?: string;
        name?: string | number;
        value?: number;
        dataIndex?: number;
        color?: string;
    };
    return {
        seriesName: p.seriesName ?? '',
        name: String(p.name ?? ''),
        value: p.value ?? 0,
        dataIndex: p.dataIndex ?? -1,
        color: p.color ?? ''
    };
}

function bindEvents() {
    chart?.on('click', (params) => emit('click', toPayload(params)));
    chart?.on('mouseover', (params) => emit('hover', toPayload(params)));
}

function init() {
    if (!chartEl.value) return;
    chart = echarts.init(chartEl.value);
    chart.setOption(props.option);
    bindEvents();
}

watch(
    () => props.option,
    (option) => chart?.setOption(option),
    { deep: true }
);

onMounted(() => {
    init();
    // 容器尺寸变化（窗口伸缩 / 面板折叠）时自适应重绘，150ms 防抖
    resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => chart?.resize(), 150);
    });
    if (chartEl.value) resizeObserver.observe(chartEl.value);
});

onBeforeUnmount(() => {
    window.clearTimeout(resizeTimer);
    resizeObserver?.disconnect();
    resizeObserver = null;
    chart?.dispose();
    chart = null;
});
</script>

<style scoped lang="scss">
.base-chart {
    width: 100%;
    height: 100%;
}
</style>
