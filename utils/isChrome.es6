/*
* 判断是否为chrome浏览器
*/
import isOpera from './isOpera';

const isChrome = ()=>{  
    var userAgent = window.navigator.userAgent.toLowerCase();
     if (userAgent.indexOf('chrome') != -1 && !isOpera()) {
        return true;
    }else{
        return false;
    }
};

export default isChrome;