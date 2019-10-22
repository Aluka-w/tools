/*
* 获取url问号之后的query参数的value
*/
import isString from './isString';

const getQuery = (paramName)=>{   //
    if(paramName && isString(paramName)){
        var sValue='';
        var re= new RegExp(paramName+'=([^&=]+)');
        var st=null;
        st=window.location.search.match(re);
        if(st&&st.length==2){   
            st[1]=st[1].replace(/^\s*|\s*$/g,'');
            sValue=st[1];
            if(sValue == ''){
                return null;
            }else{
                return sValue;
            }
        }else{
            return st;
        }
    }
};
export default getQuery;