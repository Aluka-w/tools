/*
* 获取元素的可见高度
*/
import getStyle from './getStyle';

const height = (elem)=>{
    var height = getStyle(elem,'height');
    return parseFloat(height);
};

export default height;