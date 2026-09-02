<template>
    <div class="baseList">
        <el-row v-for="it in 10" :key="it" class="baseList-item">
            <el-col :span="12">XXXXXXXX</el-col>
            <el-col :span="12" style="text-align: right">
                <el-button type="danger" size="small">2告警</el-button>
            </el-col>
            <el-col :span="24" class="desc">xxxxxxxxxxxxxxxxx</el-col>
            <el-col v-if="time" :span="24" class="desc">{{ time }}</el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        time?: string;
    }>(),
    { time: '' }
);
</script>

<style scoped lang="scss">
.baseList {
    height: 100%;
    width: 100%;
    color: var(--color-panel-title);
    .baseList-item {
        background: var(--bg-content);
        border-top: 1px solid var(--border-on-dark-strong);
        padding: var(--space-3) 0;
        margin-bottom: var(--space-3);
        border-left: 2px solid var(--color-success);
        .el-col {
            padding: 0 var(--space-3);
        }
        .desc {
            margin-top: var(--space-2);
            font-size: var(--font-desc);
        }
    }
}
</style>
