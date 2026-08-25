<template>
    <el-card class="admin-placeholder" shadow="never">
        <h2 class="ap-title">{{ title }}</h2>
        <p class="ap-desc">功能开发中，敬请期待</p>
    </el-card>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped lang="scss">
.admin-placeholder {
    .ap-title {
        margin: 0;
        font-size: 18px;
        color: var(--el-text-color-primary);
    }

    .ap-desc {
        margin: 12px 0 0;
        font-size: 13px;
        color: var(--el-text-color-secondary);
    }
}
</style>
