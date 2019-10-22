/*
* // 判断一个对象是不是函数类型Function
*/
import isObject from './isObject';

const isFunction = (value)=>{  
    var objectToString = Object.prototype.toString;
    let funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]';

    let tag = isObject(value) ? objectToString.call(value) : '';
    return tag === funcTag || tag === genTag;
};

export default isFunction;