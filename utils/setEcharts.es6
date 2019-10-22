/*
* echarts图表插件
*/
import isFunction from './isFunction';

const setEcharts = (echartsInstance, callback)=>{  
    let options = null;

    if(isFunction(callback)){
        options = callback();
    }

    echartsInstance.setOption(options);
};
export default setEcharts;