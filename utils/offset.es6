/*
* 获取元素相对于页面左上角的top和left位置
*/
import isDOM from './isDOM';
import getStyle from './getStyle';
import _isNaN from './_isNaN';
import isFirefox from './isFirefox';

const offset = (elem)=>{
    if(!isDOM(elem)){
        return null;
    }

    var _offsetParent = elem.offsetParent;
    var _offsetTop = elem.offsetTop;
    var _offsetLeft = elem.offsetLeft;
    var offset = {};

    while(_offsetParent){
        var parentBorderTopWidth = getStyle(_offsetParent,'border-top-width');
        var parentBorderLeftWidth = getStyle(_offsetParent,'border-left-width');

        if(_isNaN(parseFloat(parentBorderTopWidth))){
            parentBorderTopWidth = 0;
        }
        if(_isNaN(parseFloat(parentBorderLeftWidth))){
            parentBorderLeftWidth = 0;
        }

        if(_offsetParent.nodeName.toLowerCase() !== 'body' && _offsetParent.nodeName.toLowerCase() !== 'html'){
            _offsetTop += _offsetParent.offsetTop + parseFloat(parentBorderTopWidth);
            _offsetLeft += _offsetParent.offsetLeft + parseFloat(parentBorderLeftWidth);
        }else{
            if(isFirefox()){
                _offsetTop += parseFloat(parentBorderTopWidth);
                _offsetLeft += parseFloat(parentBorderLeftWidth);
            }
        }

        _offsetParent = _offsetParent.offsetParent;
    }

    offset.top = _offsetTop;
    offset.left = _offsetLeft;

    return offset;
};

export default offset;