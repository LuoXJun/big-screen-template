<template>
    <div class="deviceStatusHeader">
        <div v-for="it in 5" :key="it" class="deviceStatusHeader-item">
            <el-row>
                <el-col :span="12">XXXX</el-col>
                <el-col :span="12" class="status">
                    <el-button type="success" size="small" link>Online</el-button>
                </el-col>
            </el-row>
            <span>54</span>
            <span>48在线.4离线</span>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.deviceStatusHeader {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .deviceStatusHeader-item {
        flex: 19% 0 0;
        height: 100px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 8px 12px;
        color: var(--color-panel-title);
        border: 1px solid var(--border-control);
        .el-col {
            color: var(--color-on-dark-sub);
            font-size: var(--font-desc);
        }
        .status {
            text-align: right;
        }

        border-left: 2px solid var(--color-success);
        background: var(--bg-content);

        > span {
            color: var(--color-on-dark-sub);
            font-size: var(--font-desc);
        }

        > span:nth-child(2) {
            font-size: 32px;
        }
    }
}
</style>
