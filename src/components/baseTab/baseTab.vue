<template>
    <div class="baseTab">
        <div
            v-for="item in list"
            :key="item.label"
            class="baseTab-item"
            :class="{ active: currentLabel === item.label }"
            @click="onClick(item.label)"
        >
            <img v-if="item.icon" :src="getImageWidthName(item.icon)" alt="" />
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImageWidthName } from '@/utils/getAssets';
const currentLabel = defineModel<string>({ default: '' });

const emits = defineEmits<{
    onClick: [label: string];
}>();

withDefaults(
    defineProps<{
        list?: { icon?: string; label: string }[];
    }>(),
    {
        list: () => [
            {
                icon: 'vue.svg',
                label: '热成像摄像头'
            },
            {
                icon: 'vue.svg',
                label: '无人机挂载'
            },
            {
                icon: 'vue.svg',
                label: '便携终端'
            }
        ]
    }
);

const onClick = (label: string) => {
    currentLabel.value = label;
    emits('onClick', label);
};
</script>

<style scoped lang="scss">
.baseTab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .baseTab-item {
        flex: 30% 0 0;
        color: var(--color-info);
        border: 1px solid var(--color-info);
        padding: 6px 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.active {
            color: var(--color-warning);
            border: 1px solid var(--color-warning);
        }
        > img {
            width: 12px;
            margin-right: 12px;
        }
    }
}
</style>
