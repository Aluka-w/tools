/*
* 检测浏览器是否支持transitionend事件
*/
const transitionEnd = ()=>{  
    // 创建一个元素用于测试
    var el = document.createElement('div');

    // 将所有主流浏览器实现方式整合成一个对象，用于遍历
    // key   是属性名称
    // value 是事件名称
    var transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend',
        transition       : 'transitionend'
    };

    // 循环遍历上面那个对象，判断 CSS 属性是否存在
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
          return { transEndEventName: transEndEventNames[name] };
        }
    }

    return false;
};

export default transitionEnd;