/*
* 为添加事件监听做兼容处理
*/
const removeEvent =  (element,eventType,handler)=>{  
    if(element.removeEventListener){ 
        element.removeEventListener(eventType,handler,false); 
    }else if(element.detachEvent){ 
        element.detachEvent('on'+eventType,handler); 
    } 
};
export default removeEvent;