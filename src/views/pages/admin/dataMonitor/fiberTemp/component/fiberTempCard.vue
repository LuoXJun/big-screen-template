<template>
    <div class="fiberTempCard">
        <div v-for="item in list" :key="item.desc" class="fiberTempCard-item">
            <div>
                <img src="@/assets/vue.svg" alt="" />
            </div>
            <div>
                <p>{{ item.num }}</p>
                <p>{{ item.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const list = [
    {
        icon: 'vue.svg',
        num: 12002,
        desc: '检测总点位1'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        desc: '检测总点位2'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        desc: '检测总点位3'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        desc: '检测总点位4'
    },
    {
        icon: 'vue.svg',
        num: 12002,
        desc: '检测总点位5'
    }
];
</script>

<style scoped lang="scss">
.fiberTempCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .fiberTempCard-item {
        flex: 19% 0 0;
        border-radius: var(--radius-2);
        padding: base(12px) 0;
        background: #235e48;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #fff;
        > div:first-child {
            background: #1a5540;
            border-radius: var(--radius-2);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;

            > img {
                width: 30px;
            }
        }
        > div:last-child {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > p:first-child {
                margin-bottom: 8px;
                color: #3eca99;
                font-size: var(--font-title);
            }
        }
    }
}
</style>
