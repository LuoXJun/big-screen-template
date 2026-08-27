<template>
    <el-container class="deviceStatus">
        <el-header></el-header>
        <el-main></el-main>
        <el-footer>
            <baseTitle2Panel title="设备运行日志">
                <template #right>
                    <el-link type="info" size="small">最近24小时</el-link>
                </template>
            </baseTitle2Panel>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';
</script>
<style lang="scss" scoped>
@use './index.scss';
</style>
