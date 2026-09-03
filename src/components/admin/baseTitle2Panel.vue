<template>
    <div class="baseTitle2Panel">
        <el-row class="title">
            <el-col :span="12">{{ title }}</el-col>
            <el-col :span="12" style="text-align: right"><slot name="right"></slot></el-col>
        </el-row>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string;
    }>(),
    {
        title: '标题'
    }
);
</script>

<style scoped lang="scss">
.baseTitle2Panel {
    height: 100%;
    .title {
        height: var(--title-height);
        background: var(--bg-title);
        padding: var(--space-2);
        align-items: center;
        .el-col {
            color: var(--color-panel-title);
            font-size: var(--font-body);
            border-radius: var(--radius-2);
        }
    }
    .body {
        height: calc(100% - var(--title-height));
        overflow: auto;
    }
}
</style>
