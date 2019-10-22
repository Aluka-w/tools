/*
* 加密（仅base64）
*/
import CryptoJS from 'crypto-js';

const encryption_base64 = (val)=>{  
    var utf8 = CryptoJS.enc.Utf8.parse(val);
    var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
    return base64;
};

export default encryption_base64;