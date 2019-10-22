// 随机值生成
export default function randomNumber(count){
    return Math.random().toString(count).substring(2);
}