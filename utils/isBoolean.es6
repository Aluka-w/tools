/*
* 判断值是否为空
*/
import isObjectLike from './isObjectLike';

const isBoolean = (value)=>{
    var boolTag = '[object Boolean]';
    var objectToString = Object.prototype.toString;
    return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) === boolTag);
};

export default isBoolean;