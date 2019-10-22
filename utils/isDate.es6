/*
*  // 判断一个对象是不是日期类型Date
*/
import isObjectLike from './isObjectLike';

const isDate = (value)=>{
    var dateTag = '[object Date]';
    var objectToString = Object.prototype.toString;
    return isObjectLike(value) && (objectToString.call(value) === dateTag);
};

export default isDate;