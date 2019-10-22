/* eslint-disable */
/*
 *  工具模块
 */
import _isEmpty from "lodash.isempty";
import _isFinite from "lodash.isfinite";
import _isPlainObject from "lodash.isplainobject";
import _isEqual from "lodash.isequal";
import CryptoJS from "crypto-js";

let Tools = {
  addEvent(element, eventType, handler) {
    // 添加事件监听
    if (element.addEventListener) {
      element.addEventListener(eventType, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventType, handler);
    }
  },
  removeEvent(element, eventType, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(eventType, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + eventType, handler);
    }
  },
  getQuery(paramName) {
    //获取url问号之后的param参数的value
    if (paramName && typeof paramName === "string") {
      var sValue = "";
      var re = new RegExp(paramName + "=([^&=]+)");
      var st = null;
      st = window.location.search.match(re);
      if (st && st.length == 2) {
        st[1] = st[1].replace(/^\s*|\s*$/g, "");
        sValue = st[1];
        if (sValue == "") {
          return null;
        } else {
          return sValue;
        }
      } else {
        return st;
      }
    }
  },
  filterParam(obj) {
    // 对对象直接量进行过滤（不含空值）
    var parameter = {};
    if (_isPlainObject(obj)) {
      // _.forIn(obj, function(value, key) {
      //     if(!this._isEmpty(value) && value !== 'NaN'){
      //         parameter[key] = value;
      //     }
      // }.bind(this));
      for (let key in obj) {
        if (!this._isEmpty(obj[key]) && !this._isNaN(obj[key])) {
          parameter[key] = obj[key];
        }
      }
    }
    return parameter;
  },
  deepCopyObj(obj) {
    // 对象深复制
    var result = {};

    for (var key in obj) {
      result[key] = _isPlainObject(obj[key]) ? this.deepCopyObj(obj[key]) : obj[key];
    }
    return result;
  },
  objDeepCopy(source) {
    //数组、对象深拷贝
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
      sourceCopy[item] = typeof source[item] === "object" ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
  },
  sortedUniq(arr) {
    // 数组去重
    if (!this.isArray(arr)) {
      return null;
    }
    var newArr = [];
    arr.forEach((ele, i, self) => {
      if (i == 0) {
        newArr.push(ele);
      } else {
        if (this.isString(ele) || this.isNumber(ele) || this.isBoolean(ele)) {
          if (ele !== self[i - 1]) {
            newArr.push(ele);
          }
        } else {
          if (!_isEqual(ele, self[i - 1])) {
            newArr.push(ele);
          }
        }
      }
    });
    return newArr;
  },
  randomColor() {
    // 返回随机颜色字符串
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  },
  checkTelephone(val) {
    // 验证手机号码的格式
    var reg = /^((13\d)|(15[012356789])|(166)|(17[0345678])|(14[1567])|(19[89])|(18\d))\d{8}$/;
    return reg.test(val);
  },
  isObject(value) {
    // 包含函数类型
    var type = typeof value;
    return !!value && (type === "object" || type === "function");
  },
  isObjectLike(value) {
    // 不包含函数类型
    return !!value && typeof value === "object";
  },
  isBoolean(value) {
    var boolTag = "[object Boolean]";
    var objectToString = Object.prototype.toString;
    return value === true || value === false || (this.isObjectLike(value) && objectToString.call(value) === boolTag);
  },
  isString(value) {
    var stringTag = "[object String]";
    var objectToString = Object.prototype.toString;

    return typeof value === "string" || (!this.isArray(value) && this.isObjectLike(value) && objectToString.call(value) === stringTag);
  },
  isNumber(value) {
    var numberTag = "[object Number]";
    var objectToString = Object.prototype.toString;

    return typeof value === "number" || (this.isObjectLike(value) && objectToString.call(value) === numberTag);
  },
  isArray(value) {
    // 判断一个对象是不是数组类型
    var arrTag = "[object Array]";
    var objectToString = Object.prototype.toString;
    return (Array.isArray && Array.isArray(value)) || objectToString.call(value) === arrTag;
  },
  isFunction(value) {
    // 判断一个对象是不是数组类型
    var objectToString = Object.prototype.toString;
    let funcTag = "[object Function]",
      genTag = "[object GeneratorFunction]";

    let tag = this.isObject(value) ? objectToString.call(value) : "";
    return tag === funcTag || tag === genTag;
  },
  isRegExp(value) {
    // 判断一个对象是不是数组类型
    var objectToString = Object.prototype.toString;
    let regexpTag = "[object RegExp]";

    return this.isObject(value) && objectToString.call(value) === regexpTag;
  },
  isDate(value) {
    // 判断一个对象是不是数组类型
    var dateTag = "[object Date]";
    var objectToString = Object.prototype.toString;
    return this.isObjectLike(value) && objectToString.call(value) === dateTag;
  },
  isNull(value) {
    return value === null;
  },
  isUndefined(value) {
    return value === undefined;
  },
  _isNaN(value) {
    return this.isNumber(value) && value != +value;
  },
  _isEmpty(value) {
    //判断值是否为空
    return (this.isString(value) && _isEmpty(value)) || this.isNull(value) || this.isUndefined(value);
  },
  getExtensionName(path) {
    //获取path路径中文件的扩展名
    if (typeof path == "string") {
      var index = path.lastIndexOf(".");
      return path.slice(index + 1);
    }
  },
  setCookie(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
  },
  getCookie(name) {
    var c_start, c_end;

    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(name + "=");
    }
    if (c_start != -1) {
      c_start = c_start + name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
    return "";
  },
  delCookie(name) {
    this.setCookie(name, "", -1);
  },
  getEleClientWidth() {
    // 获取浏览器内部窗口宽度
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  },
  getEleClientHeight() {
    // 获取浏览器内部窗口高度
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  },
  _toNumber(value) {
    // 转换值到数值类型
    if (this.isString(value)) {
      var valueParsed = parseFloat(value);
      if (isNaN(valueParsed) || valueParsed.toString() !== value) {
        value = NaN;
      } else {
        value = valueParsed;
      }
    }
    return this.isNumber(value) ? value : NaN;
  },
  _isNumber(value) {
    //判断值是否为number类型
    var number = this._toNumber(value);
    return !isNaN(number) && _isFinite(number);
  },
  transformDate(milliseconds) {
    // 把时间戳转换成某种格式的时间字符串
    var d = new Date(milliseconds);
    var year = d.getFullYear();
    var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    var date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    var t = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds;
    return t;
  },
  transitionEnd() {
    // 检测浏览器是否支持transitionend事件
    // 创建一个元素用于测试
    var el = document.createElement("div");

    // 将所有主流浏览器实现方式整合成一个对象，用于遍历
    // key   是属性名称
    // value 是事件名称
    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    // 循环遍历上面那个对象，判断 CSS 属性是否存在
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { transEndEventName: transEndEventNames[name] };
      }
    }

    return false;
  },
  // IE 下将 CSS 命名转换为驼峰表示法
  // background-color --> backgroundColor
  // 利用正则处理一下就可以了
  camelize(attr) {
    // /\-(\w)/g 正则内的 (\w) 是一个捕获，对应后面 function 的 letter
    // 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
    return attr.replace(/\-(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  },
  // IE 下获取透明度
  getIEOpacity(elem) {
    var filter = null;

    // 早期的 IE 中要设置透明度有两个方法：
    // 1、alpha(opacity=0)
    // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
    // 利用正则匹配，注意 ?: 的用法
    filter =
      elem.style.filter.match(/(?:progid:[\w.]+.)?alpha\((?:[^,]+,)?\s*opacity=(\d+)\s*\)/i) || elem.style.filter.match(/alpha\(opacity=(.*)\)/i);

    if (filter) {
      var value = parseFloat(filter);
      if (!isNaN(value)) {
        // 转化为标准结果
        return value ? value / 100 : 0;
      }
    }
    // 默认返回 1
    return 1;
  },
  isDOM(obj, w) {
    // 判断一个对象是否是HTMLElement对象
    if (window.HTMLElement) {
      return obj instanceof HTMLElement || (w ? obj instanceof w.HTMLElement : false);
    } else {
      return obj && typeof obj == "object" && obj.nodeType == 1 && typeof obj.nodeName == "string";
    }
  },
  isOldIE() {
    // 判断浏览器是否为IE5~8浏览器
    return "\v" === "v";
  },
  isIE() {
    // 判断浏览器是否为IE浏览器
    if (
      "ActiveXObject" in window ||
      !!window.ActiveXObject ||
      window.navigator.appName === "Microsoft Internet Explorer" ||
      window.navigator.userAgent.indexOf("MSIE") != -1
    ) {
      return true;
    } else {
      return false;
    }
  },
  isFirefox() {
    //判断是否为Firefox浏览器
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("firefox") != -1) {
      return true;
    } else {
      return false;
    }
  },
  isChrome() {
    //判断是否为chrome浏览器
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("chrome") != -1 && !this.isOpera()) {
      return true;
    } else {
      return false;
    }
  },
  isOpera() {
    //判断是否为Opera浏览器
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("opera") != -1 || userAgent.indexOf("opr") != -1) {
      return true;
    } else {
      return false;
    }
  },
  isSafari() {
    //判断是否为Opera浏览器
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("safari") != -1 && !this.isChrome() && !this.isOpera()) {
      return true;
    } else {
      return false;
    }
  },
  getStyle(elem, style) {
    if (!this.isString(style)) {
      return;
    }

    // 主流浏览器
    if (window.getComputedStyle) {
      // 获取 float 属性使用 cssFloat
      // 测试最新版的浏览器，使用 cssFloat 已经获取不到 float 了，直接使用下面的通用语法
      // if(style === 'float'){
      //  return win.getComputedStyle(elem, null).getPropertyValue('cssFloat');
      // }
      return window.getComputedStyle(elem, null).getPropertyValue(style);
    } else {
      // 不支持 getComputedStyle
      // IE下获取透明度
      if (style == "opacity") {
        return this.getIEOpacity(elem);

        // IE687 下获取浮动使用 styleFloat
      } else if (style == "float") {
        return elem.currentStyle.getAttribute("styleFloat");

        // 未设置元素的高宽，获取的值是 auto
        // 这里要获取精确的 px 值，使用 elem.getBoundingClientRect 进行 hack
        // 跨浏览器的方法 getBoundingClientRect 可以获得元素四个点相对于文档视图左上角的值 top、left、bottom、right ，通过计算就可以容易地获得准确的元素大小
      } else if ((style == "width" || style == "height") && elem.currentStyle[style] == "auto") {
        var clientRect = elem.getBoundingClientRect();

        // 加上 px ，转化为标准输出
        return (style == "width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
      } else if (style == "backgroundPosition" && this.isOldIE()) {
        return elem.currentStyle.backgroundPositionX + " " + elem.currentStyle.backgroundPositionY;
      }

      // 其他样式，无需特殊处理
      return elem.currentStyle.getAttribute(this.camelize(style));
    }
  },
  setStyle(elem, props, w) {
    // 为HTMLElement对象设置css属性
    if (this.isDOM(elem, w) && _isPlainObject(props)) {
      for (let p in props) {
        // 如果是设置 opacity ，需要特殊处理
        if (p == "opacity") {
          var value = props[p];
          //IE7 bug:filter 滤镜要求 hasLayout=true 方可执行（否则没有效果）
          if (!elem.currentStyle || !elem.currentStyle.hasLayout) {
            // 设置 hasLayout=true 的一种方法
            elem.style.zoom = 1;
          }
          // IE678 设置透明度叫 filter ，不是 opacity
          p = "filter";

          // !!转换为 boolean 类型进行判断
          if (!!window.XDomainRequest) {
            elem.style[p] = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=" + value * 100 + ")";
          } else {
            elem.style[p] = "alpha(opacity=" + value * 100 + ")";
          }
        }
        elem.style[p] = props[p];
      }
    }
  },
  offset(elem) {
    if (!this.isDOM(elem)) {
      return null;
    }

    var _offsetParent = elem.offsetParent;
    var _offsetTop = elem.offsetTop;
    var _offsetLeft = elem.offsetLeft;
    var offset = {};

    while (_offsetParent) {
      var parentBorderTopWidth = this.getStyle(_offsetParent, "border-top-width");
      var parentBorderLeftWidth = this.getStyle(_offsetParent, "border-left-width");

      if (this._isNaN(parseFloat(parentBorderTopWidth))) {
        parentBorderTopWidth = 0;
      }
      if (this._isNaN(parseFloat(parentBorderLeftWidth))) {
        parentBorderLeftWidth = 0;
      }

      if (_offsetParent.nodeName.toLowerCase() !== "body" && _offsetParent.nodeName.toLowerCase() !== "html") {
        _offsetTop += _offsetParent.offsetTop + parseFloat(parentBorderTopWidth);
        _offsetLeft += _offsetParent.offsetLeft + parseFloat(parentBorderLeftWidth);
      } else {
        if (this.isFirefox()) {
          _offsetTop += parseFloat(parentBorderTopWidth);
          _offsetLeft += parseFloat(parentBorderLeftWidth);
        }
      }

      _offsetParent = _offsetParent.offsetParent;
    }

    offset.top = _offsetTop;
    offset.left = _offsetLeft;

    return offset;
  },
  position(elem) {
    if (!this.isDOM(elem)) {
      return null;
    }

    var a;
    var _offsetParent = elem.offsetParent;
    var b = this.offset(_offsetParent);
    var obj = {};
    var parentBorderTopWidth = parseFloat(this.getStyle(_offsetParent, "border-top-width"));
    var parentBorderLeftWidth = parseFloat(this.getStyle(_offsetParent, "border-left-width"));

    if (this._isNaN(parseFloat(parentBorderTopWidth))) {
      parentBorderTopWidth = 0;
    }
    if (this._isNaN(parseFloat(parentBorderLeftWidth))) {
      parentBorderLeftWidth = 0;
    }

    b.top += parentBorderTopWidth;
    b.left += parentBorderLeftWidth;

    if (this.getStyle(elem, "position") === "fixed") {
      a = elem.getBoundingClientRect();
    } else {
      a = this.offset(elem);
    }

    obj.top = a.top - b.top - parseFloat(this.getStyle(elem, "margin-top"));
    obj.left = a.left - b.left - parseFloat(this.getStyle(elem, "margin-left"));

    return obj;
  },
  width(elem) {
    var width = this.getStyle(elem, "width");
    return parseFloat(width);
  },
  height(elem) {
    var height = this.getStyle(elem, "height");
    return parseFloat(height);
  },
  getIEVersion() {
    var reg = /msie ([\d.]*);/;
    var result = navigator.userAgent.toLowerCase().match(reg);
    if (!!result) {
      return parseInt(result[1]);
    } else {
      return null;
    }
  },
  scrollTop(val, elem) {
    // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
    if (elem && !this.isDOM(elem)) {
      return;
    }

    if (!this._isEmpty(val) && this.isNumber(val)) {
      if (elem) {
        elem.scrollTop = val;
      } else {
        document.documentElement.scrollTop = val;
        document.body.scrollTop = val;
      }
    } else {
      var scrollTop;
      if (elem) {
        scrollTop = elem.scrollTop;
        return scrollTop;
      } else {
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        return scrollTop;
      }
    }
  },
  scrollLeft(val, elem) {
    // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
    if (elem && !this.isDOM(elem)) {
      return;
    }

    if (!this._isEmpty(val) && this.isNumber(val)) {
      if (elem) {
        elem.scrollLeft = val;
      } else {
        document.documentElement.scrollLeft = val;
        document.body.scrollLeft = val;
      }
    } else {
      var scrollLeft;
      if (elem) {
        scrollLeft = elem.scrollLeft;
        return scrollLeft;
      } else {
        scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        return scrollLeft;
      }
    }
  },
  encryption(val) {
    // 加密(后台模式)
    var md5 = CryptoJS.MD5(val);
    var utf8 = CryptoJS.enc.Utf8.parse(md5);
    var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
    return base64;
  },
  encryptionApp(val) {
    // 加密(app模式)
    var md5 = CryptoJS.MD5(val);
    var base64 = CryptoJS.enc.Base64.stringify(md5) || md5.toString(CryptoJS.enc.Base64);
    return base64;
  },
  encryption_base64(val) {
    // 加密（仅base64）
    var utf8 = CryptoJS.enc.Utf8.parse(val);
    var base64 = CryptoJS.enc.Base64.stringify(utf8) || utf8.toString(CryptoJS.enc.Base64);
    return base64;
  },
  decryption(val) {
    // 解密（仅base64）
    var base64 = CryptoJS.enc.Base64.parse(val);
    var utf8 = CryptoJS.enc.Utf8.stringify(base64);
    return utf8;
  },
  setEcharts(echartsInstance, callback) {
    // echarts图表插件
    let options = null;

    if (this.isFunction(callback)) {
      options = callback();
    }

    echartsInstance.setOption(options);
  },
  //禁用滚轮
  disabledMouseWheel() {
    if (document.addEventListener) {
      document.addEventListener("DOMMouseScroll", this.scrollFunc, false);
    } //W3C
    window.onmousewheel = document.onmousewheel = this.scrollFunc; //IE/Opera/Chrome
  },
  enabledMouseWheel() {
    if (document.addEventListener) {
      document.removeEventListener("DOMMouseScroll", this.scrollFunc, false);
    } //W3C
    window.onmousewheel = document.onmousewheel = ""; //IE/Opera/Chrome
  },
  scrollFunc(evt) {
    evt = evt || window.event;
    if (evt.preventDefault) {
      // Firefox
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // IE
      evt.cancelBubble = true;
      evt.returnValue = false;
    }
    return false;
  },
  /**
   * 格式化时间函数
   * @param    {string}   date   日期字符串或时间戳
   * @param    {string}   format 格式，缺省为：yyyy-MM-dd hh:mm:ss
   * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
   * @return   {string}          按format格式输出日期
   */
  dateFormat(date, format, isUTC) {
    var timezoneOffset = 0;
    var dateObj = new Date(date);
    var patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/;
    var dateArr;
    var now = new Date();
    // IOS 解析失败时尝试手动解析
    if (dateObj.toString() === "Invalid Date" && typeof date === "string") {
      dateArr = date.match(patt) || [];
      dateObj = new Date(
        dateArr[1] || now.getFullYear(),
        dateArr[2] - 1 + "" || now.getMonth(),
        dateArr[3] || now.getDate(),
        dateArr[4] || now.getHours(),
        dateArr[5] || now.getMinutes(),
        dateArr[6] || now.getSeconds()
      );
    }
    format = format || "yyyy-MM-dd hh:mm:ss";
    if (isUTC) {
      // 处理utc时间
      timezoneOffset = new Date().getTimezoneOffset();
      dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);
    }
    var map = {
      M: dateObj.getMonth() + 1, //月份
      d: dateObj.getDate(), //日
      h: dateObj.getHours(), //小时
      m: dateObj.getMinutes(), //分
      s: dateObj.getSeconds(), //秒
      q: Math.floor((dateObj.getMonth() + 3) / 3), //季度
      S: dateObj.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
      var v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = "0" + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === "y") {
        return (dateObj.getFullYear() + "").substr(4 - all.length);
      }
      return all;
    });
    return format;
  },
  getParamsBysplitStr(str, mode) {
    const x = str.lastIndexOf(mode);
    if (x < 0) return [];
    return [str.substring(0, x), str.substring(x + 1)];
  }
};

export default Tools;
