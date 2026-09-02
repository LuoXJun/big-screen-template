<template>
    <div class="fiberHeader">
        <el-row>
            <el-col :span="12">
                <p class="fiberHeader-title">光钎测温监测</p>
                <p class="fiberHeader-desc">分布式光钎测温系统 | 24小时不间断监测 | 米级精准定位</p>
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-button type="primary" plain>导出报告</el-button>
                <el-button type="primary" plain>阈值设置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fiberHeader {
    color: var(--color-panel-title);
    .fiberHeader-title {
        font-size: var(--font-title);
    }
    .fiberHeader-desc {
        font-size: var(--font-desc);
        color: var(--color-accent);
        padding: var(--space-2) 0;
    }
}
</style>
