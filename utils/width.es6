/*
* 获取元素的可见宽度
*/
import getStyle from './getStyle';

const width = (elem)=>{
    var width = getStyle(elem,'width');
    return parseFloat(width);
};

export default width;