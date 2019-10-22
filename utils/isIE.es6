/*
* 判断浏览器是否为IE浏览器
*/
const isIE = ()=>{
    if ('ActiveXObject' in window || !!window.ActiveXObject || window.navigator.appName === 'Microsoft Internet Explorer' || window.navigator.userAgent.indexOf('MSIE') != -1){
        return true;
    }else{
        return false;
    }
};
export default isIE;