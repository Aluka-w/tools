/*
* 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
*/
import isDOM from './isDOM';
import _isEmpty from './_isEmpty';
import isNumber from './isNumber';

const scrollLeft = (elem, val)=>{  
    if(elem && !isDOM(elem)){
        return;
    } 

    if(!_isEmpty(val) && isNumber(val)){
        if(elem){
            elem.scrollLeft = val;
        }else{
            document.documentElement.scrollLeft = val;
            document.body.scrollLeft = val;
        }
    }else{
        var scrollLeft;
        if(elem){
            scrollLeft = elem.scrollLeft;
            return scrollLeft;
        }else{
            scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
            return scrollLeft;
        }
    }   
};

export default scrollLeft;