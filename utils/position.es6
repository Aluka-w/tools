/*
* 获取元素相对于父元素左上角的top和left位置
*/
import isDOM from './isDOM';
import getStyle from './getStyle';
import _isNaN from './_isNaN';
import offset from './offset';

const position = (elem)=>{
    if(!isDOM(elem)){
        return null;
    }

    var a;
    var _offsetParent = elem.offsetParent;
    var b = offset(_offsetParent);
    var obj = {};
    var parentBorderTopWidth = parseFloat(getStyle(_offsetParent,'border-top-width'));
    var parentBorderLeftWidth = parseFloat(getStyle(_offsetParent,'border-left-width'));

    if(_isNaN(parseFloat(parentBorderTopWidth))){
        parentBorderTopWidth = 0;
    }
    if(_isNaN(parseFloat(parentBorderLeftWidth))){
        parentBorderLeftWidth = 0;
    }

    b.top += parentBorderTopWidth;
    b.left += parentBorderLeftWidth;

    if(getStyle(elem,'position') === 'fixed'){
        a = elem.getBoundingClientRect();
    }else{
        a = offset(elem);
    }  

    obj.top = a.top - b.top - parseFloat(getStyle(elem,'margin-top'));
    obj.left = a.left - b.left - parseFloat(getStyle(elem,'margin-left'));

    return obj;
};

export default position;