<template>
    <ScreenLayout>
        <!-- 地图层：Cesium 等全屏底图（真实尺寸弹性填充，不参与自适应）  -->
        <template #map>
            <div class="map-layer"></div>
        </template>

        <template #header>
            <ScreenHeader title="大屏标题" subtitle="副标题" />
        </template>

        <template #left>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="面板标题" />
                <ScreenPanel class="side-panel-item" title="面板标题" />
            </div>
        </template>

        <!-- 右侧面板 -->
        <template #right>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="面板标题" />
                <ScreenPanel class="side-panel-item" title="面板标题" />
            </div>
        </template>

        <!-- 底部：恒定 100% 宽 -->
        <template #footer>
            <ScreenFooter text="底部文字" status="状态" />
        </template>
    </ScreenLayout>
</template>

<script setup lang="ts">
import ScreenFooter from '@/components/screen/ScreenFooter.vue';
import ScreenHeader from '@/components/screen/ScreenHeader.vue';
import ScreenLayout from '@/components/screen/ScreenLayout.vue';
import ScreenPanel from '@/components/screen/ScreenPanel.vue';
</script>

<style scoped lang="scss">
.map-layer {
    position: relative;
    width: 100%;
    height: 100%;
}

/* 左右面板：base 等比宽度（340/1920 = 17.71%，与高度同基准 → 宽高等比） */
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
</style>
