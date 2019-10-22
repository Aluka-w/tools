/*
* 判断值是否为空
*/
import isEmpty from 'lodash.isempty';
import isString from './isString';
import isNull from './isNull';
import isUndefined from './isUndefined';

const _isEmpty = (value)=>{
    return (isString(value) && isEmpty(value)) || isNull(value) || isUndefined(value);
};

export default _isEmpty;