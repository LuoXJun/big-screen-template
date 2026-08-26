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
        background: #235e48;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #e2e0e0;
        font-size: var(--font-desc);
        .left {
            > p {
                position: relative;
                margin-top: 12px;
                > span:first-child {
                    font-size: 32px;
                    color: #fff;
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
            color: #f5ad47;
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
