/*
* 判断值是否为对象object
*/
const isObjectLike = (value)=>{
    return !!value && typeof value === 'object';
};

export default isObjectLike;