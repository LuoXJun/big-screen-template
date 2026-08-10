<template>
    <div ref="containerEl" class="base-cesium" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const containerEl = ref<HTMLDivElement | null>(null);

let viewer: Cesium.Viewer | null = null;
let handler: Cesium.ScreenSpaceEventHandler | null = null;

onMounted(() => {
    if (!containerEl.value) return;

    viewer = new Cesium.Viewer(containerEl.value, {
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false
    });
    // 初始视野：中国全景（容器为真实尺寸，Cesium 自带容器 resize 自适应）
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(104, 35, 9000000)
    });
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0a0f2a');
});

onBeforeUnmount(() => {
    handler?.destroy();
    handler = null;
    viewer?.destroy();
    viewer = null;
});
</script>

<style scoped lang="scss">
.base-cesium {
    width: 100%;
    height: 100%;

    :deep(.cesium-widget-credits) {
        display: none;
    }
}
</style>
