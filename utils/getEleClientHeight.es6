/*
* 获取浏览器内部窗口高度
*/
const getEleClientHeight = ()=>{  
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

export default getEleClientHeight;