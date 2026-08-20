<template>
    <ScreenLayout>
        <template #left>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="区域设备量对比">
                    <BaseChart :option="barOption" />
                </ScreenPanel>

                <ScreenPanel class="side-panel-item" title="请求量实时趋势">
                    <BaseChart ref="lineChartRef" :option="createLineOption(lineData)" />
                </ScreenPanel>
            </div>
        </template>

        <template #right>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="设备类型分布">
                    <BaseChart :option="pieOption" />
                </ScreenPanel>

                <ScreenPanel class="side-panel-item" title="设备运行状态">
                    <BaseChart :option="ringOption" />
                </ScreenPanel>
            </div>
        </template>
    </ScreenLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ScreenLayout from '@/components/screen/ScreenLayout.vue';
import ScreenPanel from '@/components/screen/ScreenPanel.vue';
import BaseChart from '@/components/charts/BaseChart.vue';
import {
    barOption,
    createLineOption,
    initialLineData,
    nextLineData,
    pieOption,
    ringOption
} from './config/chart';

const lineChartRef = ref<InstanceType<typeof BaseChart> | null>(null);
const lineData = ref(initialLineData);
let lineTimer: number | undefined;

// 演示 setOption 手动更新：3s 轮询模拟实时数据
onMounted(() => {
    lineTimer = window.setInterval(() => {
        lineData.value = nextLineData(lineData.value);
        lineChartRef.value?.setOption(createLineOption(lineData.value));
    }, 3000);
});

onBeforeUnmount(() => {
    window.clearInterval(lineTimer);
});
</script>

<style scoped lang="scss">
.side-column {
    width: base(340px);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-screen);
    min-height: 0;
    pointer-events: auto;
}

.side-panel-item {
    flex: 1;
    min-height: 0;
}
</style>
