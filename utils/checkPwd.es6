// 随机值生成
export default function checkPwd(str){
    let level = 0;
    if(str.length < 6){
        return level;
    }
    if(/[0-9]/.test(str)){
        level++;
    }
    if(/[a-z]/.test(str)){
        level++;
    }
    if(/[A-Z]/.test(str)){
        level++;
    }
    if(/[\W_]/.test(str)){
        level++;
    }
    return level;
}