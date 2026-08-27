<template>
    <div class="baseTableList">
        <el-row v-for="it in tableData" :key="it.time">
            <el-col :span="8">{{ it.time }}</el-col>
            <el-col :span="8">{{ it.status }}</el-col>
            <el-col :span="8">{{ it.test }}</el-col>
        </el-row>
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
    .el-col {
        flex: 1;
        border-bottom: 1px solid var(--border-on-dark);
        padding: var(--space-3);
        text-align: left;
    }
}
</style>
