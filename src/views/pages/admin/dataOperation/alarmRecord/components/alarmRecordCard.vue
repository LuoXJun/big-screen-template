<template>
    <div class="alarmRecordCard">
        <div v-for="item in list" :key="item.unit" class="alarmRecordCard-item">
            <div class="left">
                <span>{{ item.title }}</span>
                <p>
                    <span>{{ item.num }}</span>
                    <span>{{ item.unit }}</span>
                </p>
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
.alarmRecordCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .alarmRecordCard-item {
        flex: 19% 0 0;
        border-radius: var(--radius-2);
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #e2e0e0;
        font-size: var(--font-desc);
        border: 1px solid var(--border-light);
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
    }
}
</style>
