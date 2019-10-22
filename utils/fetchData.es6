/*
* 向服务器拉取数据（借助原生Promise），兼容IE9或以上（需添加Promise和fetch的兼容代码）
*/
require('es6-promise').polyfill();
require('isomorphic-fetch');
import _isPlainObject from 'lodash.isplainobject';

const fetchData = (url, options)=>{  
    options = _isPlainObject(options) ? options : {};
    // let request;
    // let init = { 
        // method: 'GET',
        // body: '',
        // mode: 'cors', // string，值： cors、same-origin、cors-with-forced-preflight、no-cors
        // headers: {}, // Object，key：Content-Type、Content-Length、X-Custom-Header、Accept-Encoding、Accept、Connection、User-Agent
        // credentials: 'include',  // string，值：omit、same-origin、include
        // cache: 'default',  // string，值：default、no-store、reload、no-cache、force-cache、only-if-cached
        // redirect: 'manual',  // string，值：manual、error、follow
        // referrer: 'no-referrer',  // string，值：no-referrer, client, or a URL
        // referrerPolicy: 'no-referrer',  // string，值：no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url
        // integrity: '',  // string，值：如sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=
        // signal: new FetchController().signal,
        // observe: (observer)=>{
        //     observer.onresponseprogress = (e)=> {
        //         console.log(e);
        //         progress.max = e.total;
        //         progress.value = e.loaded;
        //     };
        //     observer.onstatechange = ()=>{
        //         if (observer.state = 'complete') {
        //           reports.textContent = 'Download complete';
        //         }
        //     };
        // },
        // The following properties are node-fetch extensions------------
        // follow: 20,         // maximum redirect count. 0 to not follow redirect
        // timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
        // compress: true,     // support gzip/deflate content encoding. false to disable
        // size: 0,            // maximum response body size in bytes. 0 to disable
        // agent: null,         // http(s).Agent instance, allows custom proxy, certificate etc.
        // counter: 2
    // };

    // request = new Request(url, options);

    return fetch(url, options).then((response)=>{
        if(response.status>=200 && response.status<300){
            return Promise.resolve(response);
        }
        else{
            return Promise.reject(response);
        }
    }).then((response)=>{
        switch(options.bodyType){
            case 'json':
                return response.json();
            break;
            case 'text':
                return response.text();
            break;
            case 'buffer':
                return response.arrayBuffer();
            break;
            case 'blob':
                return response.blob();
            break;
            case 'form':
                return response.formData();
            break;
            default:
                return response.json();
        }
    });
};

export default fetchData;