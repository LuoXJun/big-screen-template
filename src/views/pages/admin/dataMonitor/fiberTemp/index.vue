<template>
    <div class="fiberTemp">
        <fiberHeader />
        <fiberTempCard />
        <el-container>
            <el-aside>
                <fiberList />
            </el-aside>
            <el-main>
                <div class="main-chart">
                    <baseTitle2Panel title="温度曲线实时监测">
                        <template #right>
                            <div class="btns">
                                <el-radio-group v-model="form.radio">
                                    <el-radio-button label="1H" value="New York" />
                                    <el-radio-button label="6H" value="Washington" />
                                    <el-radio-button label="24H" value="Chicago" />
                                </el-radio-group>
                                <el-select
                                    v-model="form.select"
                                    placeholder="Select"
                                    style="width: 180px"
                                >
                                    <el-option label="测试" value="测试" />
                                </el-select>
                            </div>
                        </template>
                        <BaseChart :option="chartOption" />
                    </baseTitle2Panel>
                </div>
                <el-row class="table-list">
                    <el-col :span="16" class="left">
                        <baseTitle2Panel title="告警时间记录">
                            <template #right>
                                <el-button type="warning" plain>3条警告</el-button>
                            </template>
                            <el-row v-for="it in list" :key="it.title" class="warn-list-item">
                                <el-col :span="20" :style="{ color: it.color }">
                                    {{ it.title }}
                                </el-col>
                                <el-col :span="4" class="time">13:59</el-col>
                                <el-col :span="24" class="desc">{{ it.desc }}</el-col>
                            </el-row>
                        </baseTitle2Panel>
                    </el-col>
                    <el-col class="info">
                        <baseTitle2Panel title="双重预警阈值配置">
                            <template #right>
                                <el-button>
                                    <el-icon><Edit /></el-icon>
                                </el-button>
                            </template>
                            <div class="info-item">
                                <template v-for="it in 3" :key="it">
                                    <el-row class="info-header">
                                        <el-col :span="18">静态温度阈值</el-col>
                                        <el-col :span="6" style="text-align: right">
                                            <el-button size="small">过热保护</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for="item in 3" :key="item" class="info-desc">
                                        <el-col :span="18">告警上限</el-col>
                                        <el-col :span="6" style="text-align: right">85°C</el-col>
                                    </el-row>
                                </template>
                            </div>
                        </baseTitle2Panel>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import BaseChart from '@/components/charts/BaseChart.vue';
import fiberTempCard from './component/fiberTempCard.vue';
import { chartOption } from './config.ts';
import { Edit } from '@element-plus/icons-vue';
import fiberHeader from './component/fiberHeader.vue';
import fiberList from './component/fiberList.vue';
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

const form = ref({
    radio: '',
    select: ''
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
