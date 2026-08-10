import { createApp } from 'vue';

import AppElEment from './App.vue';
import router from './router';
import '@/styles/index.scss';
import 'normalize.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium';

window.Cesium = Cesium;
Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZiOGI5Yi0wN2E0LTRlMTgtOTMwYi04NDdhNDg4MTIyNjUiLCJpZCI6MTM1MTU0LCJpYXQiOjE2ODIyNDM3Mjh9.32mOaQTRHc_l41eaI-sTVx4tVODDsrAoAG6Vo_DTL-U';

const app = createApp(AppElEment);

app.use(router);

app.mount('#app');
