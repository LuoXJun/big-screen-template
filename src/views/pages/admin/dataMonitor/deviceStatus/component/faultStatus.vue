<template>
    <el-container class="faultStatus">
        <el-header>
            <deviceStatusHeader style="margin: 20px 0" />
            <div class="search-list lxj-form-deep">
                <div>
                    <span>故障类型：</span>
                    <el-badge :value="12">
                        <el-button type="info" plain>通信故障</el-button>
                    </el-badge>
                    <el-badge :value="12">
                        <el-button type="info" plain>硬件损坏</el-button>
                    </el-badge>
                    <el-badge :value="12">
                        <el-button type="info" plain>参数异常</el-button>
                    </el-badge>
                    <el-badge :value="12">
                        <el-button type="info" plain>阈值超限</el-button>
                    </el-badge>
                </div>
                <p class="right-btn">
                    <span>共47条故障记录</span>
                    <el-button type="primary" plain>导出报告</el-button>
                </p>
            </div>
        </el-header>
        <el-main>
            <baseTitle2Panel title="故障监控面板-全生命周期记录">
                <template #right>
                    <div class="setting">
                        <span>自动采集 · 实时更新</span>
                        <el-button type="primary" size="small">通知设置</el-button>
                    </div>
                </template>
                <baseTable
                    v-model="tableData"
                    :table-column="tableColumnConfig"
                    :options="{ border: true }"
                    variant="lxj-table--grid"
                />
                <basePagination v-model="pageInfo" />
            </baseTitle2Panel>
        </el-main>
        <el-footer>
            <div>
                <span>故障通知渠道：</span>
                <el-button type="primary" plain size="small">实时弹窗</el-button>
                <el-button type="primary" plain size="small">短信通知</el-button>
                <el-button type="primary" plain size="small">平台消息</el-button>
            </div>
            <span>故障提醒自动被推送至对应维保责任人</span>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { tableColumnConfig } from './config.ts';
import deviceStatusHeader from './deviceStatusHeader.vue';
import baseTable from '@/components/baseTable/baseTable.vue';
import basePagination from '@/components/base-pagination/base-pagination.vue';
import { usePageTable } from '@/composables/usePageTable.ts';
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';

const { pageInfo, tableData } = usePageTable(async () => {
    return {
        records: [
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' }
        ],
        total: 100
    };
});
</script>

<style scoped lang="scss">
.faultStatus {
    height: 100%;

    .el-header {
        height: unset;
        :deep(.deviceStatusHeader) {
            height: unset;
        }
        .search-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            color: var(--color-desc-on-dark);
            /* 深蓝控件变体（背景/描边/直角）由全局 .lxj-form-deep 承担 */
            > div:first-of-type {
                gap: 10px;
                flex: 60% 0 0;
                display: flex;
                align-items: center;
            }
            .right-btn {
                > span {
                    margin-right: 12px;
                }
                display: flex;
                align-items: center;
            }
        }
    }
    .el-main {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        :deep(.baseTitle2Panel) {
            .body {
                display: flex;
                flex-direction: column;
            }
        }
        .setting {
            justify-content: flex-end;
            display: flex;
            align-items: center;
            font-size: var(--font-desc);
            > span {
                margin-right: 12px;
            }
        }
        /* 表格容器撑满剩余空间，表格高度 100% 自适应 */
        :deep(.base-table) {
            flex: 1;
            min-height: 0;
        }
        /* 表格皮肤（边框/表头/补左线）由 variant="lxj-table--grid" 承担 */
        :deep(.el-table) {
            height: 100%;
        }
        :deep(.basePagination) {
            margin-top: 0;
            padding: 12px 0;
            background: var(--bg-content);
        }
    }
    .el-footer {
        background: var(--bg-content);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--color-desc-on-dark);
        font-size: var(--font-desc);
    }
}
</style>
