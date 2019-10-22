/*
* //判断值是否为number类型，不包含Infinity和NaN，包含转换后的数字字符串
*/
import _isFinite from 'lodash.isfinite';
import _isNaN from './_isNaN';
import toNumber from './toNumber';

const _isNumber = (value)=>{  
    var number = toNumber(value);
    return !_isNaN(number) && _isFinite(number);
};
export default _isNumber;