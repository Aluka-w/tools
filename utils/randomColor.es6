/*
* 返回随机颜色字符串
*/
const randomColor = ()=>{  
  return('#'+Math.floor(Math.random()*16777215).toString(16));
};

export default randomColor;