/*
*  数组去重
*/
import isArray from './isArray';
import isNumber from './isNumber';
import isString from './isString';
import isBoolean from './isBoolean';
import _isEqual from 'lodash.isequal';

const sortedUniq = (arr)=>{
    if(!this.isArray(arr)){
        return null;
    } 
    var newArr = [];
    arr.forEach(function(ele,i,self){
        if(i == 0){
            newArr.push(ele);
        }else{
            if(isString(ele) || isNumber(ele) || isBoolean(ele)){
                if(ele !== self[i-1]){
                    newArr.push(ele);
                }
            }else{
                if(!_isEqual(ele,self[i-1])){
                    newArr.push(ele);
                }
            }
        }
        
    }.bind(this));
    return newArr;
};

export default sortedUniq;