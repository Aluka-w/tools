/*
* 加密(用于后台)
*/
import CryptoJS from 'crypto-js';

const encryption = (val)=>{  
    var md5 = CryptoJS.MD5(val);
    var utf8 = CryptoJS.enc.Utf8.parse(md5);
    var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
    return base64;
};

export default encryption;