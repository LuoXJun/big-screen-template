<template>
    <div class="infraredCard">
        <div v-for="item in list" :key="item.unit" class="infraredCard-item">
            <div class="left">
                <span>{{ item.title }}</span>
                <p>
                    <span>{{ item.num }}</span>
                    <span>{{ item.unit }}</span>
                </p>
            </div>
            <div class="right">
                <img src="@/assets/vue.svg" alt="" />
                <p>{{ item.status }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const list = [
    {
        icon: 'vue.svg',
        num: 12002,
        title: '检测总点位1',
        status: '全部在线',
        unit: '个'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        title: '检测总点位1',
        status: '全部在线',
        unit: '条'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        title: '检测总点位1',
        status: '全部在线',
        unit: '°C'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        title: '检测总点位1',
        status: '全部在线',
        unit: 'km'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        title: '检测总点位1',
        status: '全部在线',
        unit: '台'
    }
];
</script>

<style scoped lang="scss">
.infraredCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .infraredCard-item {
        flex: 19% 0 0;
        border-radius: var(--radius-2);
        padding: 12px 0;
        /* 成功状态卡底：内容底上染一档成功绿（对应原 #235e48） */
        background: color-mix(in srgb, var(--color-success) 22%, var(--bg-content));
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: var(--color-on-dark);
        font-size: var(--font-desc);
        .left {
            > p {
                position: relative;
                margin-top: 12px;
                > span:first-child {
                    font-size: 32px;
                    color: var(--color-panel-title);
                }
                > span:last-child {
                    position: absolute;
                    transform: translateX(100%);
                    right: -5px;
                    top: 0;
                }
            }
        }
        .right {
            /* "全部在线" 状态 → 成功色（原 #f5ad47 与在线语义不符） */
            color: var(--color-success);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            > img {
                margin-bottom: 12px;
                width: 12px;
            }
        }
    }
}
</style>
