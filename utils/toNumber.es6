/*
*  // 转换值到数值类型，包含数字字符串
*/
import _isNaN from './_isNaN';
import isString from './isString';
import isNumber from './isNumber';

const toNumber = (value)=>{ 
    if (isString(value)) {
        var valueParsed = parseFloat(value);
        if (_isNaN(valueParsed) || valueParsed.toString() !== value) {
            value = NaN;
        } else {
            value = valueParsed;
        }
    }
    return isNumber(value) ? value : NaN;
};

export default toNumber;