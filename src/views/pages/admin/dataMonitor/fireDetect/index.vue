<template>
    <div class="fireDetect">
        <fireDetectHeader />
        <el-container>
            <el-aside>
                <div class="status">
                    <baseTitle title="传感器终端状态">
                        <el-button type="danger" size="small">实时</el-button>
                    </baseTitle>
                    <div v-for="it in 4" :key="it" class="status-item">
                        <el-row>
                            <el-col :span="12">烟雾传感器</el-col>
                            <el-col :span="12" style="text-align: right">
                                <el-button type="danger" size="small">2告警</el-button>
                            </el-col>
                        </el-row>
                        <div class="desc">
                            <span>总数：16</span>
                            <span>在线：14</span>
                            <span>告警：2</span>
                        </div>
                    </div>
                </div>
                <div class="records">
                    <baseTitle title="近期告警日志">
                        <el-button type="info" link size="small">查看全部</el-button>
                    </baseTitle>
                    <el-row v-for="it in 5" :key="it" class="records-item">
                        <el-col :span="12">光伏区Axxxxxxxxxxxx</el-col>
                        <el-col :span="12" style="text-align: right">12:28:25</el-col>
                    </el-row>
                </div>
                <div class="validate">
                    <baseTitle title="多信号交叉验证" style="margin-bottom: 10px;" />
                    <el-row v-for="it in 4" :key="it" class="validate-item">
                        <el-col :span="12">光伏区Axxxxxxxxxxxx</el-col>
                        <el-col :span="12" style="text-align: right">
                            <el-button size="small" link type="success">识别中</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-aside>
            <el-main>
                <baseTitle title="防火区域监测地图">
                    <el-button type="danger" size="small">火情告警</el-button>
                    <el-button type="danger" size="small">全部区域</el-button>
                </baseTitle>
            </el-main>
            <el-aside>
                <baseTitle title="活跃告警事件">
                    <el-button type="danger" size="small">3条</el-button>
                </baseTitle>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import fireDetectHeader from './component/fireDetectHeader.vue';
import baseTitle from '@/components/admin/baseTitle.vue';
</script>
<style lang="scss" scoped>
@use './index.scss';
</style>
