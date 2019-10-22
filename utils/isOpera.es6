/*
* 判断是否为Opera浏览器
*/
const isOpera = ()=>{
    var userAgent = window.navigator.userAgent.toLowerCase();
     if (userAgent.indexOf('opera') != -1 || userAgent.indexOf('opr') != -1) {
        return true;
    }else{
        return false;
    }
};

export default isOpera;