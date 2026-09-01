<template>
    <div class="droneStatusHeader">
        <div v-for="it in 4" :key="it" class="droneStatusHeader-item">
            <el-row align="middle">
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
.droneStatusHeader {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .droneStatusHeader-item {
        flex: 24% 0 0;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 16px;
        color: #fff;
        border-radius: var(--radius-3);
        .el-col {
            color: #b8b7b7;
            font-size: var(--font-desc);
        }
        .status {
            text-align: right;
        }

        background: var(--bg-content);

        > span {
            color: #b8b7b7;
            font-size: var(--font-desc);
        }

        > span:nth-child(2) {
            font-size: 48px;
            margin: 12px 0;
        }
    }
}
</style>
