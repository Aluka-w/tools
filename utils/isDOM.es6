/*
*  判断一个对象是否是HTMLElement对象
*/

const isDOM = (obj,w)=>{ 
    if(window.HTMLElement){
        return obj instanceof HTMLElement || (w ? obj instanceof w.HTMLElement : false);
    }else{
        return obj && typeof obj == 'object' && obj.nodeType == 1 && typeof obj.nodeName == 'string';
    }
};

export default isDOM;