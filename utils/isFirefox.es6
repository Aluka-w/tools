/*
* 判断是否为Firefox浏览器
*/
const isFirefox = ()=>{ 
    var userAgent = window.navigator.userAgent.toLowerCase();
     if (userAgent.indexOf('firefox') != -1) {
        return true;
    }else{
        return false;
    }
};
export default isFirefox;