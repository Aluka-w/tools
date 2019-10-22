/*
* 解密（仅base64）
*/
import CryptoJS from 'crypto-js';

const decryption = (val)=>{ 
    var base64 = CryptoJS.enc.Base64.parse(val);
    var utf8 = CryptoJS.enc.Utf8.stringify(base64);
    return utf8;
};

export default decryption;