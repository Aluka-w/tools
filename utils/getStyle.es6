/*
* 判断值是否为空
*/
import getIEOpacity from './getIEOpacity';
import isString from './isString';
import isOldIE from './isOldIE';
import camelize from './camelize';

const getStyle = (elem, style)=>{
    if(!isString(style)){
        return;
    }

    // 主流浏览器
    if (window.getComputedStyle) {
        // 获取 float 属性使用 cssFloat
        // 测试最新版的浏览器，使用 cssFloat 已经获取不到 float 了，直接使用下面的通用语法
        // if(style === 'float'){
        //  return win.getComputedStyle(elem, null).getPropertyValue('cssFloat');
        // }
        return window.getComputedStyle(elem, null).getPropertyValue(style);
    } else {
        // 不支持 getComputedStyle 
        // IE下获取透明度
        if (style == 'opacity') {
            return getIEOpacity(elem);

        // IE6/7/8 下获取浮动使用 styleFloat
        } else if (style == 'float') {
            return elem.currentStyle.getAttribute('styleFloat');

        // 未设置元素的高宽，获取的值是 auto
        // 这里要获取精确的 px 值，使用 elem.getBoundingClientRect 进行 hack
        // 跨浏览器的方法 getBoundingClientRect 可以获得元素四个点相对于文档视图左上角的值 top、left、bottom、right ，通过计算就可以容易地获得准确的元素大小
        } else if ((style == 'width' || style == 'height') && (elem.currentStyle[style] == 'auto')) {
            var clientRect = elem.getBoundingClientRect();

            // 加上 px ，转化为标准输出
            return (style == 'width' ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + 'px';
        } else if (style == 'backgroundPosition' && isOldIE()) {
            return elem.currentStyle.backgroundPositionX +' '+elem.currentStyle.backgroundPositionY;
        }

        // 其他样式，无需特殊处理
        return elem.currentStyle.getAttribute(camelize(style));
    }
};

export default getStyle;