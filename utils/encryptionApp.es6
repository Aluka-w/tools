/*
* 加密(app模式)
*/
import CryptoJS from 'crypto-js';

const encryptionApp = (val)=>{  
    var md5 = CryptoJS.MD5(val);
    var base64 = CryptoJS.enc.Base64.stringify(md5) || md5.toString(CryptoJS.enc.Base64);
    return base64;
};

export default encryptionApp;