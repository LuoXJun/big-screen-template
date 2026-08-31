<template>
    <div class="deviceStatus">
        <baseTabs v-model="activeName" :labels="labels">
            <template #设备在线状态>
                <onlineStatus />
            </template>
            <template #故障状态>
                <faultStatus />
            </template>
        </baseTabs>
    </div>
</template>

<script setup lang="ts">
import baseTabs from './component/baseTabs.vue';
import onlineStatus from './component/onlineStatus.vue';
import faultStatus from './component/faultStatus.vue';

const labels = [
    {
        icon: '',
        label: '设备在线状态'
    },
    {
        icon: '',
        label: '故障状态'
    }
];
const activeName = ref(labels[1].label);
</script>
<style lang="scss" scoped>
@use './index.scss';
</style>
