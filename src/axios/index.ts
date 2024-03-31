import config from "@/config";
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

const BASE_URL = import.meta.env.VITE_NM_BASE_URL
const errStatus = config.HTTP_NO_LOGIN
axios.interceptors.request.use(function (config) {
    try {
        const authorization = localStorage.getItem('token')
        config.headers.authorization = authorization; // 添加请求头部信息
        console.log('axios.config:', config);
        config.baseURL = BASE_URL
    } catch (error) {
        console.log(error, 'authorization--error')
    }
    return config
}, error => {
    Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    const status = Number(response.status)
    if (errStatus.includes(status)) {
        localStorage.removeItem('token')
        router.push({ path: '/login' })
    }
    return response
}, error => {
    const status = Number(error?.response?.status)
    if (errStatus.includes(status)) {
        localStorage.removeItem('token')
        router.push({ path: '/login' })
        ElMessage.error('请登录')
    } else {
        Promise.reject(error)
    }
})

export default axios