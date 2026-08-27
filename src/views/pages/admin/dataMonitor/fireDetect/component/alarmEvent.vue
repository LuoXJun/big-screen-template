<template>
    <div class="alarmEvent">
        <baseTitle title="活跃告警事件">
            <el-button type="danger" size="small">3条</el-button>
        </baseTitle>
        <div class="alarmEvent-body">
            <el-row v-for="it in 5" :key="it" class="alarmEvent-item">
                <el-col :span="12" class="title">一级火情告警</el-col>
                <el-col :span="12" class="time">14:24:26</el-col>
                <el-col :span="24" class="desc">xxxxxxxxxxxxxx</el-col>
                <el-col :span="24">
                    <el-button type="danger" size="small">立即处置</el-button>
                    <el-button type="info" size="small">查看详情</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import baseTitle from '@/components/admin/baseTitle.vue';
</script>

<style scoped lang="scss">
.alarmEvent {
    height: 100%;
    .alarmEvent-body {
        height: calc(100% - var(--height-title1));
        overflow: auto;
        .alarmEvent-item {
            border-bottom: 1px solid #929292a1;
            margin-top: 12px;
            .title {
                font-size: var(--font-title);
                color: var(--color-danger);
            }
            .time {
                text-align: right;
            }
            .desc,
            .time {
                font-size: var(--font-desc);
                color: #929292;
            }
            .el-col {
                margin-bottom: 8px;
            }
        }
    }
}
</style>
