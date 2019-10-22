/*
* 判断值是否为数组Array
*/
const isArray = (value)=>{
    var arrTag = '[object Array]';
    var objectToString = Object.prototype.toString;
    return (Array.isArray && Array.isArray(value)) || (objectToString.call(value) === arrTag);
};

export default isArray;