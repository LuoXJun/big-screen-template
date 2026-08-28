<template>
    <div class="baseTableList">
        <div v-for="it in tableData" :key="it.time" class="baseTableList-item">
            <span>{{ it.time }}</span>
            <span>{{ it.status }}</span>
            <span>{{ it.test }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const tableData = ref([
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: 'xxxxxxxxxxxxxxx' },
    { time: '24:25:21', status: '警告', test: '3232' }
]);
</script>

<style scoped lang="scss">
.baseTableList {
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: var(--font-desc);
    .baseTableList-item {
        display: flex;
        > span {
            flex: 1 0 1;
            border-bottom: 1px solid var(--border-on-dark);
            padding: var(--space-3);
            text-align: left;
        }
    }
}
</style>
