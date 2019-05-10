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

## Android下

1. flex布局, 或者引用了`100vh`这种布局, 在唤出手机键盘时, 会出现页面压缩的情况

    1. 解决方案, js动态计算页面高度, 并设置页面高度, 就能解决