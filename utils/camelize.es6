/*
*  IE下将 CSS 命名转换为驼峰表示法
*  background-color --> backgroundColor
*  利用正则处理一下就可以了
*/
const camelize = (attr)=>{
    // /\-(\w)/g 正则内的 (\w) 是一个捕获，对应后面 function 的 letter
    // 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
    return attr.replace(/\-(\w)/g, function(all, letter) {
        return letter.toUpperCase();
    });
};

export default camelize;