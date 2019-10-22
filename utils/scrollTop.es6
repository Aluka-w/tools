/*
* 设置或获取位于元素最顶端和窗口中可见内容的最顶端之间的距离
*/
import isDOM from './isDOM';
import _isEmpty from './_isEmpty';
import isNumber from './isNumber';

const scrollTop = (val,elem)=>{  
    if(elem && !isDOM(elem)){
        return;
    } 

    if(!_isEmpty(val) && isNumber(val)){
        if(elem){
            elem.scrollTop = val;
        }else{
            document.documentElement.scrollTop = val;
            document.body.scrollTop = val;
        }
    }else{
        var scrollTop;
        if(elem){
            scrollTop = elem.scrollTop;
            return scrollTop;
        }else{
            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            return scrollTop;
        }
    }   
};

export default scrollTop;