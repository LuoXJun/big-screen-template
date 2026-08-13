<template>
    <div ref="chartEl" class="base-chart" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { echarts, type EChartsCoreOption } from './echarts';

type ChartInstance = ReturnType<typeof echarts.init>;
type LoadingOptions = Parameters<ChartInstance['showLoading']>[0];

/** 图表交互事件的载荷（echarts 原始事件收敛后的强类型） */
export interface ChartEventPayload {
    seriesName: string;
    name: string;
    value: unknown;
    dataIndex: number;
    color: string;
}

const props = withDefaults(
    defineProps<{
        /** 图表配置；组件不做任何加工，数据组装由业务侧完成 */
        option: EChartsCoreOption;
        /** 是否显示加载态（数据异步拉取时使用） */
        loading?: boolean;
        /** showLoading 配置（text 等） */
        loadingOptions?: LoadingOptions;
        /** 容器尺寸变化时自适应重绘 */
        autoResize?: boolean;
        /** merge：增量更新（默认）；replace：全量替换（大数据量/动态增删系列时更优） */
        updateMode?: 'merge' | 'replace';
    }>(),
    {
        loading: false,
        loadingOptions: undefined,
        autoResize: true,
        updateMode: 'merge'
    }
);

const emit = defineEmits<{
    (e: 'click', payload: ChartEventPayload): void;
    (e: 'hover', payload: ChartEventPayload): void;
}>();

const chartEl = ref<HTMLDivElement | null>(null);

let chart: ChartInstance | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimer: number | undefined;

/** 把 echarts 原始事件参数收敛为强类型载荷 */
function toPayload(raw: unknown): ChartEventPayload {
    const p = raw as {
        seriesName?: string;
        name?: string | number;
        value?: unknown;
        dataIndex?: number;
        color?: string;
    };
    return {
        seriesName: p.seriesName ?? '',
        name: String(p.name ?? ''),
        value: p.value,
        dataIndex: p.dataIndex ?? -1,
        color: p.color ?? ''
    };
}

function bindEvents() {
    chart?.on('click', (params) => emit('click', toPayload(params)));
    chart?.on('mouseover', (params) => emit('hover', toPayload(params)));
}

function destroy() {
    chart?.dispose();
    chart = null;
}

function init() {
    if (!chartEl.value) return;
    chart = echarts.init(chartEl.value);
    if (props.loading) chart.showLoading(props.loadingOptions);
    chart.setOption(props.option, { notMerge: props.updateMode === 'replace' });
    bindEvents();
}

function resize() {
    chart?.resize();
}

watch(
    () => props.option,
    (option) => chart?.setOption(option, { notMerge: props.updateMode === 'replace' }),
    { deep: true }
);

watch(
    () => props.loading,
    (loading) => {
        if (!chart) return;
        loading ? chart.showLoading(props.loadingOptions) : chart.hideLoading();
    }
);

onMounted(() => {
    init();
    if (props.autoResize) {
        // 容器尺寸变化（窗口伸缩/面板折叠/初始隐藏后显示）时自适应重绘，150ms 防抖
        resizeObserver = new ResizeObserver(() => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(resize, 150);
        });
        if (chartEl.value) resizeObserver.observe(chartEl.value);
    }
});

onBeforeUnmount(() => {
    window.clearTimeout(resizeTimer);
    resizeObserver?.disconnect();
    resizeObserver = null;
    destroy();
});

defineExpose({
    /** 获取图表实例（可执行 dispatchAction 高亮、dataZoom 定位等高级操作） */
    getChart: (): ChartInstance | null => chart,
    resize,
    setOption: (option: EChartsCoreOption, replace = false) =>
        chart?.setOption(option, { notMerge: replace })
});
</script>

<style scoped lang="scss">
.base-chart {
    width: 100%;
    height: 100%;
}
</style>
