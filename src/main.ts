import { createApp } from 'vue';

import AppElEment from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import '@/styles/index.scss';
import 'normalize.css';
import 'element-plus/dist/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const app = createApp(AppElEment);

app.use(router);
app.use(ElementPlus, { locale: zhCn });

app.mount('#app');
