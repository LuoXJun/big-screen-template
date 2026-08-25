<template>
    <div class="login">
        <el-button @click="login">登录</el-button>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';

const store = useMenuStore();

const login = async () => {
    sessionStorage.setItem('token', '555');
    // 进入管理端：加载管理端菜单并动态注册路由
    await store.enterAdmin();
};
</script>

<style scoped></style>
