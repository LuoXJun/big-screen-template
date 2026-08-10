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
