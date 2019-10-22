/*
* 为添加事件监听做兼容处理
*/
const addEvent =  (element,eventType,handler)=>{  
    if(element.addEventListener){ 
        element.addEventListener(eventType,handler,false); 
    }else if(element.attachEvent){ 
        element.attachEvent('on'+eventType,handler); 
    } 
};
export default addEvent;