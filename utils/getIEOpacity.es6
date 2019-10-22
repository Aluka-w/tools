/*
* IE下获取透明度 
*/
import _isNaN from './_isNaN';

const getIEOpacity = (elem)=>{
    var filter = null;

    // 早期的 IE 中要设置透明度有两个方法：
    // 1、alpha(opacity=0)
    // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
    // 利用正则匹配，注意 ?: 的用法
    filter = elem.style.filter.match(/(?:progid:[\w.]+.)?alpha\((?:[^,]+,)?\s*opacity=(\d+)\s*\)/i) || elem.style.filter.match(/alpha\(opacity=(.*)\)/i);

    if (filter) {
        var value = parseFloat(filter);
        if (!_isNaN(value)) {
            // 转化为标准结果
            return value ? value / 100 : 0;
        }
    }
    // 默认返回 1
    return 1;
};
export default getIEOpacity;