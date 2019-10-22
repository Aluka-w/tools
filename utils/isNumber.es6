/*
* 判断值是否为数值number
*/
import isObjectLike from './isObjectLike';

const isNumber = (value)=>{
    var numberTag = '[object Number]';
    var objectToString = Object.prototype.toString;

    return typeof value === 'number' || (isObjectLike(value) && objectToString.call(value) === numberTag);
};

export default isNumber;