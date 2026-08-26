<template>
    <div class="infrared">
        <infraredHeader />
        <infraredCard style="margin-top: 12px" />
        <el-container>
            <el-aside>
                <baseTitle title="分布式光纤测温系统">
                    <el-button type="success">24H实时监测</el-button>
                </baseTitle>
                <!-- 插入图表 -->
            </el-aside>
            <el-main></el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import infraredHeader from './component/infraredHeader.vue';
import infraredCard from './component/infraredCard.vue';
import baseTitle from '@/components/admin/baseTitle.vue';
</script>

<style lang="scss" scoped>
.infrared {
    height: 100%;
    .el-container {
        margin-top: 10px;
        height: calc(100% - 170px);
        .el-aside {
            flex: 65% 0 0;
        }
    }
}
</style>
