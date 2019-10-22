/*
* 验证手机号码的格式
*/
const checkTelephone = (val)=>{  
    var reg = /^((13\d)|(15[012356789])|(17[0678])|(18\d))\d{8}$/;
    return reg.test(val);
};

export default checkTelephone;