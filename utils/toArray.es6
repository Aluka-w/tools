/*
* 将类数组转换成真实数组
*/
const toArray = (arrayLike, cb)=>{
    return Array.from ? (cb ? Array.from(arrayLike, cb) : Array.from(arrayLike)) : Array.prototype.slice.call(arrayLike);
};

export default toArray;