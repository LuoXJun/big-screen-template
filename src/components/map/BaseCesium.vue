<template>
    <div ref="containerEl" class="base-cesium" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

/** 拾取结果：点击地图时返回的强类型信息 */
export interface PickInfo {
    type: 'entity' | 'terrain';
    name: string;
    lon: number;
    lat: number;
    height: number;
}

/** 示例城市点位（演示 entity 拾取） */
const CITY_POINTS = [
    { name: '北京', lon: 116.4074, lat: 39.9042 },
    { name: '上海', lon: 121.4737, lat: 31.2304 },
    { name: '广州', lon: 113.2644, lat: 23.1291 },
    { name: '成都', lon: 104.0665, lat: 30.5723 }
];

/** 高德路网瓦片（免 token，国内可达；可按需换成其他影像源） */
const GAODE_URL =
    'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';

const emit = defineEmits<{ (e: 'pick', info: PickInfo): void }>();

const containerEl = ref<HTMLDivElement | null>(null);

let viewer: Cesium.Viewer | null = null;
let handler: Cesium.ScreenSpaceEventHandler | null = null;

/** 把拾取到的 Cartesian3 转为经纬度信息 */
function toLonLat(cartesian: Cesium.Cartesian3, name: string, type: PickInfo['type']): PickInfo {
    const carto = Cesium.Cartographic.fromCartesian(cartesian);
    return {
        type,
        name,
        lon: Cesium.Math.toDegrees(carto.longitude),
        lat: Cesium.Math.toDegrees(carto.latitude),
        height: carto.height
    };
}

function bindPickHandler() {
    handler = new Cesium.ScreenSpaceEventHandler(viewer!.scene.canvas);
    handler.setInputAction((event: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        // ScreenSpaceEventHandler 的 position 已是 canvas 内坐标，无需反算
        const pickPos = event.position;

        // 1. 优先拾取实体（城市点位）
        const picked = viewer!.scene.pick(pickPos);
        const entity = Cesium.defined(picked) && picked.id instanceof Cesium.Entity ? picked.id : null;
        if (entity?.position) {
            const position = entity.position.getValue(Cesium.JulianDate.now());
            if (position) {
                emit('pick', toLonLat(position, entity.name, 'entity'));
            }
            return;
        }

        // 2. 否则拾取椭球面/地形坐标
        const world = viewer!.scene.pickPosition(pickPos);
        if (Cesium.defined(world)) {
            emit('pick', toLonLat(world, '地图', 'terrain'));
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

function addCityPoints() {
    CITY_POINTS.forEach((city) => {
        viewer!.entities.add({
            name: city.name,
            position: Cesium.Cartesian3.fromDegrees(city.lon, city.lat),
            point: {
                pixelSize: 10,
                color: Cesium.Color.fromCssColorString('#00d4ff'),
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            },
            label: {
                text: city.name,
                font: '14px "PingFang SC", sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                pixelOffset: new Cesium.Cartesian2(0, -18),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
    });
}

/** 相机飞行（定位演示），业务可随时调用 */
function flyToCity(lon: number, lat: number, height = 500000) {
    viewer?.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        duration: 2.5
    });
}

onMounted(() => {
    if (!containerEl.value) return;

    const provider = new Cesium.UrlTemplateImageryProvider({
        url: GAODE_URL,
        subdomains: ['1', '2', '3', '4'],
        maximumLevel: 18
    });

    viewer = new Cesium.Viewer(containerEl.value, {
        baseLayer: new Cesium.ImageryLayer(provider),
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

    addCityPoints();
    bindPickHandler();
});

onBeforeUnmount(() => {
    handler?.destroy();
    handler = null;
    viewer?.destroy();
    viewer = null;
});

defineExpose({ flyToCity });
</script>

<style scoped lang="scss">
.base-cesium {
    width: 100%;
    height: 100%;

    :deep(.cesium-widget-credits) {
        display: none; /* 隐藏底图版权提示，生产环境请按授权保留 */
    }
}
</style>
