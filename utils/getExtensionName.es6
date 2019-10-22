/*
* 获取path路径中文件的扩展名
*/
const getExtensionName = (path)=>{
    if(typeof path == 'string'){
        var index = path.lastIndexOf('.');  
        return path.slice(index+1); 
    }    
};

export default getExtensionName;