/*
*  对象深复制
*/
import _isPlainObject from 'lodash.isplainobject';

const deepCopyObj = (obj)=>{
    var result={};

    for (var key in obj) {
        result[key] = _isPlainObject(obj[key]) ? deepCopyObj(obj[key]): obj[key];
    } 
    return result; 
};
export default deepCopyObj;