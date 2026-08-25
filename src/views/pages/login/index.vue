<template>
    <div class="login">
        <el-button @click="login">登录</el-button>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { routeConfig } from '@/router/route-admin';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useMenuStore();

const login = () => {
    sessionStorage.setItem('token', '555');
    store.$patch((state) => {
        state.menu = routeConfig;
        state.isNeedUpdate = true;
        state.isNeedUpdate = true;
    });

    console.log(router.getRoutes());

    router.push({
        path: '/'
    });
};
</script>

<style scoped></style>
