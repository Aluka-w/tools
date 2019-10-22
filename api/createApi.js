import axiosInstance from './axios';

/**
 * 
 * @param {string} method 
 * @param {string} url 
 * @param {object} options axios基础配置
 */
const fetchData = (method='get', url='', options={}) => {
    /**
     * @param {object} data 请求参数
     * @param {object} config 自定义axios配置
     * @param {bool} needHandleCode 是否处理code
     */
    return ({data={}, config={}, needHandleCode=true} = {}) => {
        let params = {};
        if (method.toLowerCase() === 'get') {
            params = data;
        }
        if (method.toLowerCase() === "post") {
          config.headers = config.headers || {};
          config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        return axiosInstance({
            ...options, ...config, method, url, data, params,
        }).then(response => {
            // const code = response.code;
            // if(parseInt(code) !== 0 && code !== undefined){
            //     handleResponseCode(code, response, needHandleCode);
            // }
            return response;
        }).catch( err => {
            if(err){
                const res = {
                    code: null,
                    msg: window.navigator.onLine ? err.status + ' ' + err.statusText : '网络异常，请检查您的网络设置！',
                }
                // handleResponseCode(res.code, res, needHandleCode);
                return Promise.resolve(res);
            }
        })
    }
}

// function handleResponseCode(code, response, needHandleCode){
//     switch(code){
//         case 100010110:
//             Modal.alert({contentText: '您还未登录，请重新登录！', onOk: ()=>{
//                 history.push({ pathname: '/login' });
//             }});
//             break;
//         case 100021401:
//             Modal.alert({contentText: '账号信息已修改，请联系管理员！', onOk: ()=>{
//                 history.push({ pathname: '/login' });
//             }});
//             break;
//         case 100010201:
//             Modal.alert({contentText: '缺少参数', onOk: ()=>{
//                 // history.push({ pathname: '/login' });
//             }});
//             break;
//         case 107003007: // 未授权公众号
            
//             break;
//         default:
//             let msg = !!response.data ? response.data : response.msg;
//             console.log(msg);
//             needHandleCode && Modal.alert({contentText: msg});
//     }
// }

export default fetchData;