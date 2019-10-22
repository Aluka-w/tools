/*
*  判断一个对象是不是正则表达式类型regExp
*/
import isObject from './isObject';

const isRegExp = (value)=>{
    var objectToString = Object.prototype.toString;
    let regexpTag = '[object RegExp]';

    return isObject(value) && objectToString.call(value) === regexpTag;
};

export default isObject;