/*
* 判断值是否为对象（包含函数类型）
*/
const isObject = (value)=>{
  var type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

export default isObject;