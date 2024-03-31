import { createApp } from "vue";
import router from "./router";
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import './main.scss'
import './axios/index'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(Avue)
    .mount('#app')