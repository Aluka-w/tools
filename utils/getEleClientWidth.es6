/*
* 获取浏览器内部窗口宽度
*/
const getEleClientWidth = ()=>{  
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

export default getEleClientWidth;