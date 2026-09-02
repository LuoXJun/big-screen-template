<template>
    <div class="fireDetectHeader">
        <div v-for="it in 5" :key="it" class="fireDetectHeader-item">
            <span>监测终端总数</span>
            <span>54</span>
            <span>48在线.4离线</span>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fireDetectHeader {
    display: flex;
    justify-content: space-between;
    .fireDetectHeader-item {
        flex: 19% 0 0;
        height: 100px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 8px 0;

        border-left: 2px solid var(--color-success);
        background: var(--bg-content);

        > span {
            color: var(--color-on-dark-sub);
            font-size: var(--font-desc);
            padding-left: 12px;
        }

        > span:nth-child(2) {
            font-size: 32px;
        }
    }
}
</style>
