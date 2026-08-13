import { createApp } from 'vue';

import AppElEment from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'normalize.css';
import 'element-plus/dist/index.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';
// 项目样式最后加载，保证 :root 变量覆盖 EP 默认主题
import '@/styles/index.scss';

const app = createApp(AppElEment);

app.use(router);
app.use(ElementPlus, { locale: zhCn });

app.mount('#app');
