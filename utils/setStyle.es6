/*
* 为HTMLElement对象设置css属性
*/
import isDOM from './isDOM';
import _isPlainObject from 'lodash.isplainobject';

const setStyle = (elem,props,w)=>{
    if(isDOM(elem,w) && _isPlainObject(props)){
        for(let p in props){
            // 如果是设置 opacity ，需要特殊处理
            if (p == 'opacity') {
                var value = props[p];
                //IE7 bug:filter 滤镜要求 hasLayout=true 方可执行（否则没有效果）
                if (!elem.currentStyle || !elem.currentStyle.hasLayout) {
                    // 设置 hasLayout=true 的一种方法
                    elem.style.zoom = 1;
                }
                // IE678 设置透明度叫 filter ，不是 opacity
                p = 'filter';

                // !!转换为 boolean 类型进行判断
                if (!!window.XDomainRequest) {
                    elem.style[p] = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=' + value * 100 + ')';
                } else {
                    elem.style[p] = 'alpha(opacity=' + value * 100 + ')';
                }
            }
            elem.style[p] = props[p];
        }
    }
};

export default setStyle;