<template>
    <div class="screen-layout">
        <!-- 地图层：真实尺寸 100% 弹性填充，独立自适应 -->
        <div class="map-layer">
            <slot name="map" />
        </div>

        <!-- UI 层：流式布局 + clamp 限幅自适应（无整体缩放） -->
        <div class="ui-layer">
            <slot name="header" />
            <div class="layout-body">
                <slot name="left" />
                <!-- 中央空隙：露出地图，事件穿透 -->
                <div class="main-gap" />
                <slot name="right" />
            </div>
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * 大屏基础布局组件（双图层流式框架）：
 * - 地图层（#map 插槽）：真实尺寸 100% 弹性填充
 * - UI 层：流式排布（顶底 100% 宽、左右面板、中央空隙），
 *   组件尺寸与字号由 clamp() 限幅自适应（1920×1080 为设计基准），
 *   不整体缩放——小屏保可读性下限，大屏/超宽屏不臃肿
 *
 * 事件穿透：ui-layer / layout-body / main-gap 均 pointer-events: none，
 * 只有具体 UI 组件（ScreenPanel 等）自身 auto——地图交互不受遮挡。
 */
</script>

<style scoped lang="scss">
.screen-layout {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background:
        radial-gradient(ellipse at 50% 0%, rgba(0, 120, 255, 0.16), transparent 55%), $screen-bg;
}

.map-layer {
    position: absolute;
    inset: 0;
}

.ui-layer {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--font-body); /* 基础字号随视口自适应 */
    pointer-events: none; /* 整层穿透：地图交互不受 UI 层遮挡 */
}

.layout-body {
    flex: 1;
    min-height: 0;
    display: flex;
    justify-content: space-between;
    gap: var(--space-screen);
    padding: var(--space-screen);
    pointer-events: none; /* 空白容器穿透，中央地图可交互 */
}

.main-gap {
    flex: 1;
    min-width: 0;
}
</style>
