import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入ant组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 引入组件
import MyUi from '../src/index'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.use(MyUi);

app.mount('#app');
