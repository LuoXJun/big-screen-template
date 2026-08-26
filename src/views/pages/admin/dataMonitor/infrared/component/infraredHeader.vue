<template>
    <div class="infraredHeader">
        <el-row>
            <el-col :span="12" class="infraredHeader-title">光钎测温监测</el-col>
            <el-col :span="12" style="text-align: right">
                <el-button>{{ timeText }}</el-button>
                <el-button>到处报告</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus';

const timeText = dayjs().format('YYYY-MM-DD HH:mm:ss');
</script>

<style scoped lang="scss">
.infraredHeader {
    color: #fff;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    padding: 12px 0;
    box-sizing: border-box;
    .infraredHeader-title {
        font-size: var(--font-title);
        align-items: center;
        display: flex;
    }
}
</style>
