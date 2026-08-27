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
                    <baseTitle title="多信号交叉验证" style="margin-bottom: 10px" />
                    <el-row v-for="it in 4" :key="it" class="validate-item">
                        <el-col :span="12">光伏区Axxxxxxxxxxxx</el-col>
                        <el-col :span="12" style="text-align: right">
                            <el-button size="small" link type="success">识别中</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-aside>
            <el-main>
                <mapList />
            </el-main>
            <el-aside>
                <div class="eq-status">
                    <baseTitle title="联动设备状态" style="margin-bottom: 10px">
                        <el-button type="success" size="small">就绪</el-button>
                    </baseTitle>
                    <el-row justify="space-between">
                        <el-col v-for="it in 4" :key="it" :span="12" class="eq-status-item">
                            <el-row class="eq-status-self">
                                <el-col :span="24">
                                    <img src="@/assets/vue.svg" alt="" />
                                </el-col>
                                <el-col :span="24">XXXXXXXX</el-col>
                                <el-col :span="24">xxxxxxx</el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div class="alarmEvent">
                    <alarmEvent />
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import fireDetectHeader from './component/fireDetectHeader.vue';
import baseTitle from '@/components/admin/baseTitle.vue';
import mapList from './component/mapList.vue';
import alarmEvent from './component/alarmEvent.vue';
</script>
<style lang="scss" scoped>
@use './index.scss';
</style>
