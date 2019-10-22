/*
* 对对象直接量进行过滤（不含空值）
*/
import _isPlainObject from 'lodash.isplainobject';
import _isEmpty from './_isEmpty';
import _isNaN from './_isNaN';

const filterParam = (obj)=>{  
    var parameter = {};
    if(_isPlainObject(obj)){
        for(let key in obj){
            if(!_isEmpty(obj[key]) && !_isNaN(obj[key])){
                parameter[key] = obj[key];
            }
        }
    }
    return parameter;
};

export default filterParam;