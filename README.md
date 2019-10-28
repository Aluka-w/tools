# 项目问题

## IOS下

1. 时间问题:  '2019-01-04' 在ios下不能被解析, '2019/01/04'才行

2. ant-mobile + react(或泛移动端), 多次点击输入框才能聚焦的问题

```js
    <InputItem
        // : input上添加onTouchTap事件, 在时间上绑定focus事件
        ref={ int => this.int = int}
        onTouchTap={ () => this.int.focus() }
    ></InputItem>
```

3. h5 ios移动端，键盘收起以后页面不归位, 导致使用antd-mobile的Date-Pick不能使用问题

```js
    <InputItem
        // 手动在失焦时归位, 这样Date-Pick就可以使用
        onBlur={() => window.scrollTo(0, 0);}
    ></InputItem>
```
补充: 
问题详情描述：

     输入内容，软键盘弹出，页面内容整体上移，但是键盘收起，页面内容不下滑

出现原因分析：

    固定定位的元素 在元素内 input 框聚焦的时候 弹出的软键盘占位 失去焦点的时候软键盘消失 但是还是占位的 导致input框不能再次输入 在失去焦点的时候给一个事件

解决办法：

```js
    <input onBlur={this.handleChange}/>
    
    handleChange = () => {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isIOS = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isIOS){
            setTimeout(() => {
                const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                 window.scrollTo(0, Math.max(scrollHeight - 1, 0))
            }, 200)
       }
    }
```

4. IOS下input或者textarea标签无法输入的问题

    ~ 在input的父类加上-webkit-user-select:text !important;

5. IOS或部分Android下唤出弹出框, 弹出框底下页面还能被滑动

 ```js
    // 打开弹窗时
    let bodyEl = document.body;
    let top = window.scrollY;
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = -top + 'px';
    this.setState({ showModel: true, scrollTop: top })
    // 关闭弹窗时
    let bodyEl = document.body;
    bodyEl.style.position = '';
    bodyEl.style.top = '';
    window.scrollTo(0, this.state.scrollTop);
 ```
 
 6. ios端兼容input光标高度
 
    问题详情描述：
 
        input输入框光标，在安卓手机上显示没有问题，但是在苹果手机上

        当点击输入的时候，光标的高度和父盒子的高度一样。例如下图，左图是正常所期待的输入框光标，右边是ios的input光标
    
     出现原因分析：
 
         通常我们习惯用height属性设置行间的高度和line-height属性设置行间的距离（行高），当点击输入的时候，光标的高度就自动和父盒子的高度一样了。（谷歌浏览器的设计原则，还有一种可能就是当没有内容的时候光标的高度等于input的line-height的值，当有内容时，光标从input的顶端到文字的底部

    解决办法：高度height和行高line-height内容用padding撑开
    
 7. ios端微信h5页面上下滑动时卡顿、页面缺失
 
    问题详情描述：在ios端，上下滑动页面时，如果页面高度超出了一屏，就会出现明显的卡顿，页面有部分内容显示不全的情况，例如下图，右图是正常页面，边是ios上下滑动后，卡顿
    
    出现原因分析：

        笼统说微信浏览器的内核，Android上面是使用自带的WebKit内核，iOS里面由于苹果的原因，使用了自带的Safari内核，Safari对于overflow-scrolling用了原生控件来实现。对于有-webkit-overflow-scrolling的网页，会创建一个UIScrollView，提供子layer给渲染模块使用。【有待考证】
      
```css
    // 公共样式新增
    *{
      -webkit-overflow-scrolling: touch;
    }
```

## Android下

1. flex布局, 或者引用了`100vh`这种布局, 在唤出手机键盘时, 会出现页面压缩的情况

    1. 解决方案, js动态计算页面高度, 并设置页面高度, 就能解决

```js
    componentDidMount () {
        let clientH = document.documentElement.clientHeight;
        let El = document.getElementsByClassName('login-wrapper')[0];
        El.style.height = `${clientH}px`;
        // Actions.getBaseInfo();
    }
```

## 通用

1. 图片预加载的方法, 在页面最开始时, 把所有图片预加载一次, 使得浏览器提前缓存相应图片

```js
    // 预加载所有的图片, 可放于componentDid
    preload = () => {
        let imgs = [
            "../static/img/dry.png",
            "../static/img/dry-icon.png"
        ]
        for (let img of imgs) {
            let image = new Image()
            image.src = img
            image.onload = () => {
                // console.log(image);
            }
        }
    }
```

## 验证码问题

1. 通过布局, 使得6个横岗放在input下方

2. input聚焦, 则横岗生成模拟的光标(隐藏原光标), 失焦则消失

3. 根据input的值, 渲染横岗的值, 且根据值的多少, 横岗背景色也会变化

4. 值得注意的是, 让input光标消失需要在input的css上

```css
   caret-color: transparent;
   color: transparent;
   text-indent: -999em;
   margin-left: -50%;
```

```jsx
    <div className="mine-phone-code">
        <InputItem
            type="number"
            placeholder="请输入验证码"
            disabled={checkCodeIng}
            onChange={this.handleChange}
            value={checkCode}
            onFocus={() => this.handleHaveFocus(true)}
            onBlur={() => this.handleHaveFocus(false)}
            ref={el => this.inputRef = el}
            maxLength={6}/>
        <span>验证码已发送{count}s</span>
        <div className="mine-phone-mask">
            {
            [0, 1, 2, 3, 4, 5].map(ele => (
                <span key={ele} className={haveFocus && checkCode.length > ele ? 'active':''}>
                <i className={haveFocus && checkCode.length === ele ? 'active-code':''}>{checkCode[ele] || ''}</i>
                </span>
            ))
            }
        </div>
    </div>
```
