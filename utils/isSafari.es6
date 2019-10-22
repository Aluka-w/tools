/*
* 判断是否为Opera浏览器
*/
import isChrome from './isChrome';
import isOpera from './isOpera';

const isSafari = ()=>{
    var userAgent = window.navigator.userAgent.toLowerCase();
     if (userAgent.indexOf('safari') != -1 && !isChrome() && !isOpera()) {
        return true;
    }else{
        return false;
    }
};
export default isSafari;