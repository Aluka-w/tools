import axios from 'axios'
import queryString from 'query-string';
// import ES6Promise from "es6-promise"
// ES6Promise.polyfill();

const axiosInstance = axios.create({
    baseURL: '',
});

// 拦截request,设置全局请求为ajax请求
axiosInstance.interceptors.request.use(function (config) {  //配置发送请求的信息
    //设置默认请求头
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.timeout = config.timeout || 20000 // 超时设置
    if (config.method === 'post') {
        if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'){
            config.data = queryString.stringify(config.data)
        }
    }
    return config
}, function (error) {
    return Promise.reject(error);
});
// 拦截响应response，并做一些错误处理
axiosInstance.interceptors.response.use((response) => {
    if(response.status  === 200 || response.status  === 206 || response.status  === 304){
        return response.data;
    }
    const data = response.data;
    const err = new Error(data.description);
    err.data = data;
    err.response = response;
    throw err;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
    // console.log('路由跳轉');
    // console.log(err);
    // return err;
    return Promise.reject(err.response);
});

export default axiosInstance