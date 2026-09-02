<template>
    <div class="fiberList">
        <baseTitle2Panel title="光钎通道列表">
            <template #right><el-button type="danger" size="small" plain>4通道</el-button></template>
            <div v-for="item in list" :key="item.title" class="aside-item">
                <el-row>
                    <el-col :span="16" class="aside-item-title">{{ item.title }}</el-col>
                    <el-col :span="8" style="text-align: right">
                        <el-button size="small">{{ item.button }}</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="8">当前最高：{{ item.current }}°C</el-col>
                    <el-col :span="8" style="text-align: center">温升：{{ item.up }}°C</el-col>
                    <el-col :span="8" style="text-align: right">长度：{{ item.len }}km</el-col>
                </el-row>
                <el-row class="progress">
                    <el-col :span="16" :style="{ background: item.color }"></el-col>
                </el-row>
            </div>
        </baseTitle2Panel>
    </div>
</template>

<script setup lang="ts">
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';
const list = new Array(10).fill(0).map((_, index) => {
    return {
        title: 'CH1 光伏整列电缆' + (index + 1),
        button: '温度告警',
        current: Math.ceil(Math.random() * 100),
        up: '+2.4',
        len: '2.4',
        desc: '这是一段描述',
        color: `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},255)`
    };
});
</script>

<style scoped lang="scss">
.fiberList {
    height: 100%;

    .aside-item {
        padding: 8px;
        border-bottom: 2px solid var(--border-on-dark-strong);
        width: 100%;
        color: var(--color-panel-title);
        font-size: var(--font-desc);
        .aside-item-title {
            font-size: var(--font-body);
            width: 100%;
        }
        .progress {
            /* 轨道槽底：内容底再压暗一档（对应原 #1b2845） */
            background: color-mix(in srgb, var(--bg-content) 80%, #000);
            border-radius: var(--radius-3);
            height: 3px;
            margin-top: 10px;
        }
    }
}
</style>
