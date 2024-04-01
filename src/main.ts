import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ArcoVue from '@arco-design/web-vue';
import store from './store';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@/assets/style/global.less';
import '@arco-design/web-vue/es/message/style/index.less';
import '@arco-design/web-vue/es/notification/style/index.less';
import '@arco-design/web-vue/es/modal/style/index.less';

const app = createApp(App)
app.use(ArcoVue);
app.use(router);
app.use(ArcoVueIcon);
app.use(store);
app.mount('#app')
