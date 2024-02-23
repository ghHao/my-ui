import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入ant组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 引入组件
import MyUi from '../src/index'

// v-md-editor markdown
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.use(MyUi);
app.use(VueMarkdownEditor);
app.mount('#app');
