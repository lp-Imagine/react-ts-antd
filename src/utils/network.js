// import * as React from 'react';
import { message } from 'antd';
import axios from 'axios';
import { apiUrl } from './url';

axios.defaults.headers['Content-Type'] = 'application/json';

// 创建axios实例
const service = axios.create({
    baseURL: apiUrl,
    timeout: 60 * 1000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = localStorage.getItem('token');
        }
        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log(response.data);
        // 抛出401错误，因为token失效，重新刷新页面，清空缓存，跳转到登录界面
        if (response.data.code === 401) {
            console.log('退出登录')
        }

        return response.data;
    },
    error => {
        message.error('网络异常，请稍后再试')
        return Promise.reject(error);
    }
)

export default service;

// React.Component.prototype.$axios = service;
