# 项目问题

## IOS下

1. 时间问题:  '2019-01-04' 在ios下不能被解析, '2019/01/04'才行

## Android下

1. flex布局, 或者引用了`100vh`这种布局, 在唤出手机键盘时, 会出现页面压缩的情况

    1. 解决方案, js动态计算页面高度, 并设置页面高度, 就能解决