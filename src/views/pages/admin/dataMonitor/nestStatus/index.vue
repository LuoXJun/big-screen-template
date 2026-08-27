<template>
    <el-container class="nestStatus">
        <el-header>
            <nestStatusHeader />
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8" class="list">
                    <baseTitle2Panel title="机巢设备列表">
                        <template #right>
                            <el-link type="info">8台</el-link>
                        </template>
                        <baseList />
                    </baseTitle2Panel>
                </el-col>
                <el-col :span="8" class="status">
                    <baseTitle2Panel title="实时状态">
                        <template #right>
                            <el-link type="info">xxx</el-link>
                        </template>
                        <statusPanel />
                    </baseTitle2Panel>
                </el-col>
                <el-col :span="8" class="info">
                    <baseTitle2Panel title="故障告警信息">
                        <template #right>
                            <el-link type="info">查看全部</el-link>
                        </template>
                        <baseList time="24:21:52" />
                    </baseTitle2Panel>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <baseTitle2Panel title="设备运行日志">
                <template #right>
                    <el-link type="info" size="small">最近24小时</el-link>
                </template>
                <baseTableList />
            </baseTitle2Panel>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import nestStatusHeader from './components/nestStatusHeader.vue';
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';
import baseList from './components/baseList.vue';
import statusPanel from './components/statusPanel.vue';
import baseTableList from './components/baseTableList.vue';
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
