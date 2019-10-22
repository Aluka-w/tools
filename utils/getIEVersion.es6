/*
* 获取IE浏览器的版本
*/
const getIEVersion = ()=>{
    var reg = /msie ([\d.]*);/;
    var result = navigator.userAgent.toLowerCase().match(reg);
    if(!!result){
        return parseInt(result[1]);
    }else{
        return null;
    }
};

export default getIEVersion;