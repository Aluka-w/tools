/*
* 判断值是否为空
*/
const transformDate = (milliseconds)=>{  // 把时间戳转换成某种格式的时间字符串
    var d = new Date(milliseconds);
    var year = d.getFullYear();
    var month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1;
    var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? '0'+d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    var t = year+'-'+month+'-'+date+' '+hour+':'+minute+':'+seconds;
    return t;
};

export default transformDate;