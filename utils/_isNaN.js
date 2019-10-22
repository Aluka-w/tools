/*
* 判断值是否为NaN
*/
import isNumber from './isNumber';

const _isNaN = (value)=>{
  return isNumber(value) && value != +value;
};

export default _isNaN;