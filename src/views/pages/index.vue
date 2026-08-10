<template>
    <ScreenLayout>
        <!-- 地图层：Cesium 真实尺寸弹性填充（不参与缩放） -->
        <template #map>
            <div class="map-layer">
                <BaseCesium ref="cesiumRef" @pick="onCesiumPick" />
                <div class="map-tools">
                    <button v-for="city in CITY_LIST" :key="city.name" class="map-btn" @click="flyTo(city)">
                        飞往{{ city.name }}
                    </button>
                </div>
            </div>
        </template>

        <!-- UI 层（1920×1080 设计稿舞台缩放）：顶部/左右/底部 -->
        <template #header>
            <ScreenHeader title="智慧城市综合态势大屏" subtitle="DEMO · 双图层混合方案" />
        </template>

        <template #left>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="各区域访问量（点击柱子）">
                    <BaseChart :option="barOption" @click="onChartClick" />
                </ScreenPanel>
                <ScreenPanel class="side-panel-item" title="资源占比（点击扇区）">
                    <BaseChart :option="pieOption" @click="onChartClick" />
                </ScreenPanel>
            </div>
        </template>

        <template #right>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="实时监控流量（鼠标悬浮）">
                    <BaseChart :option="lineOption" @hover="onChartHover" />
                </ScreenPanel>
                <ScreenPanel class="side-panel-item" title="事件日志">
                    <ul class="log-list">
                        <li v-for="log in logs" :key="log.id" class="log-item">
                            <span class="log-time">{{ log.time }}</span>
                            <span>{{ log.text }}</span>
                        </li>
                    </ul>
                </ScreenPanel>
            </div>
        </template>

        <template #footer>
            <ScreenFooter text="智慧城市综合态势感知平台" status="系统运行正常 · 数据每 5 分钟刷新" />
        </template>
    </ScreenLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseChart, { type ChartEventPayload, type ChartOption } from '@/components/charts/BaseChart.vue';
import BaseCesium, { type PickInfo } from '@/components/map/BaseCesium.vue';
import ScreenFooter from '@/components/screen/ScreenFooter.vue';
import ScreenHeader from '@/components/screen/ScreenHeader.vue';
import ScreenLayout from '@/components/screen/ScreenLayout.vue';
import ScreenPanel from '@/components/screen/ScreenPanel.vue';

/** 飞行演示用的城市列表 */
const CITY_LIST = [
    { name: '北京', lon: 116.4074, lat: 39.9042 },
    { name: '上海', lon: 121.4737, lat: 31.2304 },
    { name: '成都', lon: 104.0665, lat: 30.5723 }
] as const;

/** ---------- ECharts 示例配置 ---------- */
const barOption: ChartOption = {
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10,15,42,0.9)',
        borderColor: '#1e3a6f',
        textStyle: { color: '#e8f4ff' }
    },
    grid: { left: 44, right: 16, top: 24, bottom: 28 },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: { color: '#8fb4dd' },
        axisLine: { lineStyle: { color: '#1e3a6f' } }
    },
    yAxis: {
        type: 'value',
        axisLabel: { color: '#8fb4dd' },
        splitLine: { lineStyle: { color: 'rgba(30,58,111,0.5)' } }
    },
    series: [
        {
            name: '访问量',
            type: 'bar',
            data: [820, 932, 901, 934, 1290, 1330, 1520],
            itemStyle: { color: '#00d4ff', borderRadius: [3, 3, 0, 0] }
        }
    ]
};

const pieOption: ChartOption = {
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10,15,42,0.9)',
        borderColor: '#1e3a6f',
        textStyle: { color: '#e8f4ff' }
    },
    legend: { bottom: 0, textStyle: { color: '#8fb4dd' } },
    series: [
        {
            name: '资源占比',
            type: 'pie',
            radius: ['42%', '64%'],
            center: ['50%', '45%'],
            label: { color: '#e8f4ff', fontSize: 12 },
            data: [
                { name: '服务器', value: 42, itemStyle: { color: '#00d4ff' } },
                { name: '网络', value: 28, itemStyle: { color: '#3a7bff' } },
                { name: '存储', value: 18, itemStyle: { color: '#ffc64a' } },
                { name: '安全', value: 12, itemStyle: { color: '#ff6b9d' } }
            ]
        }
    ]
};

const lineOption: ChartOption = {
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10,15,42,0.9)',
        borderColor: '#1e3a6f',
        textStyle: { color: '#e8f4ff' }
    },
    grid: { left: 44, right: 16, top: 24, bottom: 28 },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        axisLabel: { color: '#8fb4dd' },
        axisLine: { lineStyle: { color: '#1e3a6f' } }
    },
    yAxis: {
        type: 'value',
        axisLabel: { color: '#8fb4dd' },
        splitLine: { lineStyle: { color: 'rgba(30,58,111,0.5)' } }
    },
    series: [
        {
            name: '实时流量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            data: [220, 380, 510, 420, 640, 560],
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' },
            areaStyle: { color: 'rgba(0, 212, 255, 0.18)' }
        }
    ]
};

/** ---------- 事件日志 ---------- */
interface LogEntry {
    id: number;
    text: string;
    time: string;
}

let logSeq = 0;
const logs = ref<LogEntry[]>([
    { id: ++logSeq, text: '大屏就绪：点击地图 / 柱子 / 扇区，或悬浮折线图体验事件', time: '--:--:--' }
]);

function addLog(text: string) {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    logs.value.unshift({
        id: ++logSeq,
        text,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    });
    if (logs.value.length > 50) logs.value.pop();
}

/** ---------- 交互回调 ---------- */
function onChartClick(payload: ChartEventPayload) {
    addLog(`[图表·点击] ${payload.seriesName}「${payload.name}」值 ${payload.value}`);
}

/** 悬浮事件频繁，节流记录 */
let lastHoverAt = 0;
function onChartHover(payload: ChartEventPayload) {
    const now = Date.now();
    if (now - lastHoverAt < 600) return;
    lastHoverAt = now;
    addLog(`[图表·悬浮] ${payload.seriesName}「${payload.name}」值 ${payload.value}`);
}

function onCesiumPick(info: PickInfo) {
    const coord = `(${info.lon.toFixed(2)}, ${info.lat.toFixed(2)})`;
    addLog(
        info.type === 'entity'
            ? `[Cesium·实体] 点击了 ${info.name}，坐标 ${coord}`
            : `[Cesium·地形] 点击地图 ${coord}，高度 ${info.height.toFixed(0)}m`
    );
}

/** ---------- Cesium 相机飞行（缩放演示） ---------- */
const cesiumRef = ref<InstanceType<typeof BaseCesium> | null>(null);

function flyTo(city: (typeof CITY_LIST)[number]) {
    cesiumRef.value?.flyToCity(city.lon, city.lat);
}
</script>

<style scoped lang="scss">
.map-layer {
    position: relative;
    width: 100%;
    height: 100%;
}

.map-tools {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    z-index: 10;
}

.map-btn {
    padding: 6px 14px;
    font-size: var(--font-body);
    color: $text-primary;
    background: rgba(0, 84, 168, 0.55);
    border: 1px solid $panel-border;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 212, 255, 0.3);
    }
}

/* 左右面板：base 等比宽度（340/1920 = 17.71%，与高度同基准 → 宽高等比）；恢复事件 */
.side-column {
    width: calc(var(--screen-base) * 0.1771);
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

.log-list {
    margin: 0;
    padding: 2px;
    height: 100%;
    overflow-y: auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: var(--font-small);
    color: $text-secondary;
    word-break: break-all;
}

.log-time {
    color: $accent;
    margin-right: 6px;
}
</style>
