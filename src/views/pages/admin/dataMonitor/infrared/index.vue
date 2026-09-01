<template>
    <el-container class="infrared">
        <el-header>
            <infraredHeader />
            <infraredCard style="margin-top: 12px" />
        </el-header>
        <el-container class="body">
            <el-aside>
                <baseTitle2Panel title="分布式光纤测温系统">
                    <template #right>
                        <el-button type="success" plain>24H实时监测</el-button>
                    </template>
                    <el-row style="margin-top: 12px">
                        <el-col :span="24">
                            <el-button>光伏阵列电缆</el-button>
                            <el-button>光伏阵列电缆1</el-button>
                            <el-button>光伏阵列电缆2</el-button>
                            <el-button>光伏阵列电缆3</el-button>
                        </el-col>
                    </el-row>
                    <div class="chart-box">
                        <BaseChart :option="chartOption" />
                    </div>
                </baseTitle2Panel>
                <el-row class="rule">
                    <el-col :span="12" class="title">预警规则配置</el-col>
                    <el-col :span="12" class="desc">双重预警规则</el-col>
                    <el-col :span="12" class="panel">
                        <p>静态温度阈值</p>
                        <p>75.0°C</p>
                        <p>xxxxxxxxx</p>
                    </el-col>
                    <el-col :span="12" class="panel">
                        <p>静态温度阈值</p>
                        <p>75.0°C</p>
                        <p>xxxxxxxxx</p>
                    </el-col>
                </el-row>
                <div class="table-part">
                    <baseTable v-model="tableData" :table-column="tableColumnConfig" />
                </div>
            </el-aside>
            <el-main>
                <baseTitle2Panel title="分布式光纤测温系统">
                    <template #right>
                        <el-button type="warning" plain>热力图分析</el-button>
                    </template>
                    <div class="body">
                        <baseTab
                            v-model="activeLabel"
                            style="margin-top: 12px"
                            @on-click="onclick"
                        />
                        <el-empty
                            style="height: 150px; overflow: hidden; margin: 12px 0"
                        ></el-empty>
                        <el-row>
                            <el-col :span="12">
                                <el-button plain size="small" type="primary">当点测温</el-button>
                                <el-button plain size="small" type="primary">框选区域</el-button>
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                                <el-button type="warning" size="small" plain>自动标准</el-button>
                            </el-col>
                        </el-row>
                        <el-row class="list-card">
                            <el-col :span="12">设备专属预警阈值</el-col>
                            <el-col :span="12" class="desc">可自定义</el-col>
                            <el-col v-for="it in 3" :key="it" :span="8" class="card">
                                <p>光伏组件</p>
                                <p>80°C</p>
                            </el-col>
                        </el-row>
                        <div class="points">
                            <el-row class="title">
                                <el-col :span="12">异常点位检测结果</el-col>
                                <el-col :span="12" style="text-align: right">
                                    <el-button type="danger" size="small">5处异常</el-button>
                                </el-col>
                            </el-row>
                            <div class="point-list">
                                <div v-for="it in 10" :key="it" class="point-item">
                                    <span>组件热斑</span>
                                    <span>92°C</span>
                                    <div>
                                        <el-button type="danger" size="small" plain>热斑</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </baseTitle2Panel>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import BaseChart from '@/components/charts/BaseChart.vue';
import infraredHeader from './component/infraredHeader.vue';
import infraredCard from './component/infraredCard.vue';
import { chartOption, tableColumnConfig } from './config.ts';
import baseTable from '@/components/baseTable/baseTable.vue';
import baseTab from '@/components/baseTab/baseTab.vue';
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';

const tableData = ref([
    { status: '告警' },
    { status: '预警' },
    { status: '正常' },
    { status: '正常' },
    { status: '正常' },
    { status: '正常' }
]);

const activeLabel = ref('热成像摄像头');

const onclick = (label: string) => {
    console.log(label);
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
