<template>
    <el-container class="faultStatus">
        <el-header>
            <deviceStatusHeader style="margin: 20px 0" />
            <div class="search-list">
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
                <baseTable v-model="tableData" :table-column="tableColumnConfig" />
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
            color: var(--color-desc2);
            /* 本页表单控件背景统一用 --bg-form-item-blue */
            :deep(.el-input__wrapper),
            :deep(.el-select__wrapper) {
                background-color: var(--bg-form-item-blue);
                box-shadow: 0 0 0 1px var(--border-light) inset;
                border-radius: 0;
            }
            .el-button {
                border-radius: unset;
            }
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
        /* 本页表格边框：覆盖全局 --el-table-border-color: transparent */
        :deep(.el-table) {
            height: 100%;
            --el-table-border-color: var(--border-light);
            --el-table-bg-color: var(--bg-content);
            --el-table-header-bg-color: var(--bg-content);
        }
        /* 去掉表格自身外框线（上下左右 + left-patch），仅保留 cell 边框 */
        :deep(.el-table--border)::before,
        :deep(.el-table--border)::after,
        :deep(.el-table--border .el-table__inner-wrapper)::before,
        :deep(.el-table--border .el-table__inner-wrapper)::after,
        :deep(.el-table__border-left-patch) {
            display: none;
        }
        /* 第一列 cell 补左边框，网格完整闭合 */
        :deep(.el-table--border .el-table__cell:first-child) {
            border-left: var(--el-table-border);
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
        color: var(--color-desc2);
        font-size: var(--font-desc);
    }
}
</style>
