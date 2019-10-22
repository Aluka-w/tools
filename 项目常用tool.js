/**
 * 常量及公共方法
 */

// export const APPID = '';
import CryptoJS from 'crypto-js'
export const APPSECRET = ''
export const APPID = ''

function getBackHost() {
  let src = window.location.protocol + '//' + window.location.host
  return src
}

export function isIos() {
  let u = navigator.userAgent
  let _isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  return _isIos
}

export function getSearchQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let search = window.location.search
  let r = search.substr(search.indexOf('?') + 1).match(reg)
  if (r != null) return decodeURI(r[2])
  return ''
}

export function getHashQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let hash = window.location.hash
  let r = hash.substr(hash.indexOf('?') + 1).match(reg)
  if (r != null) return decodeURI(r[2])
  return ''
}

/**
 * @description 获取url中的所有参数
 * @return {object} 如：{a:3,b:4}
 * 直接获取url上的参数
 * getUrlParamsObj().recordId
 */
export function getUrlParamsObj() {
  const href = window.location.href
  const urlPath = href.substring(href.lastIndexOf('?') + 1)
  let params = {}
  urlPath.replace(/([^?&=#]+)=([^?&=#]*)/g, (match, $1, $2) => {
    let key = decodeURIComponent($1)
    let value = decodeURIComponent($2)
    params[key] = value
  })
  return params
}

export function getUrlParamsObj2() {
  const href = window.location.href
  const urlPath = href.substring(href.indexOf('?')[0] + 1)
  let params = {}
  urlPath.replace(/([^?&=#]+)=([^?&=#]*)/g, (match, $1, $2) => {
    let key = decodeURIComponent($1)
    let value = decodeURIComponent($2)
    params[key] = value
  })
  return params
}

/**
 * @description 给url添加参数
 * @return {string} 如: '?k1=v1&k2=v2' 
 * 
 * const urlSearch = objParamsToUrlStr({ recordId });
 * this.props.history.push({ pathname: "/mineAwardDetail", search: urlSearch });
 */
export function objParamsToUrlStr(obj) {
  if (typeof obj !== 'object') return ''
  let str = ''
  for (let key in obj) {
    str += '&' + key + '=' + obj[key]
  }
  return '?' + str.substring(1)
}

export function toUtcTime(date) {
  let y = date.getUTCFullYear()
  let m = date.getUTCMonth()
  let d = date.getUTCDate()
  let h = date.getUTCHours()
  let M = date.getUTCMinutes()
  let s = date.getUTCSeconds()
  m = FormateNum(m + 1)
  d = FormateNum(d)
  h = FormateNum(h)
  M = FormateNum(M)
  s = FormateNum(s)
  let utc = y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s
  console.log(utc)
  return utc
}
/**
 * 格式化时间函数
 * @param    {string}   date   日期字符串或时间戳
 * @param    {string}   format 格式，缺省为：yyyy-MM-dd hh:mm:ss
 * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
 * @return   {string}          按format格式输出日期
 */
export function dateFormat(date, format, isUTC) {
  var timezoneOffset = 0
  var dateObj = new Date(date)
  var patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/
  var dateArr
  var now = new Date()
  // IOS 解析失败时尝试手动解析
  if (dateObj.toString() === 'Invalid Date' && typeof date === 'string') {
    dateArr = date.match(patt) || []
    dateObj = new Date(
      dateArr[1] || now.getFullYear(),
      dateArr[2] - 1 + '' || now.getMonth(),
      dateArr[3] || now.getDate(),
      dateArr[4] || now.getHours(),
      dateArr[5] || now.getMinutes(),
      dateArr[6] || now.getSeconds()
    )
  }
  format = format || 'yyyy-MM-dd hh:mm:ss'
  if (isUTC) {
    // 处理utc时间
    timezoneOffset = new Date().getTimezoneOffset()
    dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset)
  }
  var map = {
    M: dateObj.getMonth() + 1, //月份
    d: dateObj.getDate(), //日
    h: dateObj.getHours(), //小时
    m: dateObj.getMinutes(), //分
    s: dateObj.getSeconds(), //秒
    q: Math.floor((dateObj.getMonth() + 3) / 3), //季度
    S: dateObj.getMilliseconds() //毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

// 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
export function scrollTop(val, elem) {
  if (elem && !this.isDOM(elem)) {
    return
  }

  if (!this._isEmpty(val) && this.isNumber(val)) {
    if (elem) {
      elem.scrollTop = val
      elem.scrollTop = val
    } else {
      setTimeout(() => {
        document.documentElement.scrollTop = val
        // console.log(document.documentElement.scrollTop);
        document.body.scrollTop = val
      }, 10)
    }
  } else {
    var scrollTop
    if (elem) {
      scrollTop = elem.scrollTop
      return scrollTop
    } else {
      scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      return scrollTop
    }
  }
}

//生成签名(公司内部, 不同产品, appsecret是不一样)
// const url = `/getVeriCode`;
// let opts = {
//     appId,
//     timestamp,
//     mobilePhone: phone ? phone.replace(/\s/g, '') : '',
// }
// const sign = calcSign('POST', url, opts, appSecret);
// opts.sign = sign;
export function calcSign(type, url, data, appSecret) {
  appSecret = APPSECRET
  url = `https://${window.location.host}${url}`
  // console.log(888, url);
  //计算签名通用函数
  if (!data || typeof data !== 'object') return
  var arr = []
  for (var key in data) {
    //检出所有key
    if (data.hasOwnProperty(key)) arr.push(key)
  }
  arr.sort() //排序
  var str1 = type === 'GET' || type === 'get' ? 'GET' : 'POST'
  var signStr = str1 + url
  arr.forEach(function(item, index) {
    if (index === 0) {
      signStr = signStr + item + '=' + data[item]
    } else {
      signStr = signStr + '&' + item + '=' + data[item]
    }
  })
  signStr = signStr + '&' + appSecret //按指定规则生成签名
  // let CryptoJS = require('./md5.js');
  return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(signStr)) //返回签名
}

/*
* 验证手机号码的格式
*/
export const checkTelephone = (val) => {  
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone.replace(/\s/g, ''));
};