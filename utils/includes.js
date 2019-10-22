/*
* 判断值是否在数组中
*/
const includes = (arr, value)=>{
	let _includes = Array.prototype.includes;

	if(_includes){
		return _includes.call(arr, value);
	}

    return arr.indexOf(value) >= 0;
};

export default includes;