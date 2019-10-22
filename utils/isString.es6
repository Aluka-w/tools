/*
* 判断值是否为字符串string
*/
import _isEmpty from './_isEmpty';
import isObjectLike from './isObjectLike';
import isArray from './isArray';

const isString = (value)=>{
    var stringTag = '[object String]';
    var objectToString = Object.prototype.toString;

    return typeof value === 'string' || (!isArray(value) && isObjectLike(value) && objectToString.call(value) === stringTag);
};

export default isString;