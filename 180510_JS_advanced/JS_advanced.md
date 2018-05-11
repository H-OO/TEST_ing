# JS高级程序设计

目的：全面了解JS，其本质、历史、局限性

JS由三个部分构成：ECMAScript、DOM、BOM

## 第一章

**ECMAScript**
---
由 ECMA-262 定义，提供核心语言功能

**DOM 文档对象模型**
---
DOM(Document Object Model)是用于HTML的应用程序编程接口(API，Application Programming Interface)

通过 DOM 获取 HTML 的树形结构图，从而控制页面内容

DOM 提供的API能让开发人员轻松删除、添加、替换或修改任何节点

DOM1 主要是映射文档的结构

DOM2 扩展了事件、范围、遍历等细分模块；增加了对 CSS 的支持

DOM3 扩展了统一加载、保存和验证文档的方法

**BOM 浏览器对象模型**
---
BOM(Browser Object Model)是用于控制浏览器显示页面以外的部分

提供：

* 弹出新浏览器窗口的功能
* 移动、缩放和关闭浏览器窗口的功能
* 提供浏览器详细信息的 navigator 对象
* 提供浏览器所加载页面详细信息的 location 对象
* 提供用户显示器分辨率详细信息的 screen 对象
* 对 cookies 的支持

## 第二章

**script 元素**
---
HTML 为 script 元素定义了【5个】可选属性：  
* async 规定脚本将被异步执行
* charset 规定在外部脚本文件中使用的字符编码
* defer 外部脚本可以延迟到文档完全被解析和显示之后再执行
* src 要执行代码的外部文件路径
* type 脚本语言的内容类型，默认text/javascript

只要 script 元素不包含 async 和 defer 属性，浏览器都会按照 script 元素的位置依次进行解析

HTML 使用外部文件的优点：  
* 可维护性
* 可缓存（浏览器具有缓存外部JS文件的功能；也就是说两个页面都使用同一个文件，这个文件只需下载一次）
* 适应未来

**noscript 元素**
---
noscript 元素只有在浏览器将脚本禁用时显示

## 第三章

**严格模式**
---
'use strict'; // 浏览器将开启严格模式解析代码

目的是消除JS语法不合理不严谨的地方，提高编译器效率；ie10+支持

**typeof**
---
注意：
* typeof null 返回 'object'
* typeof [] 返回 'object'

**Number e表示法**
---
3.125e7 等于 31250000  
3e-7 等于 0.0000003  

e 的实际含义就是 3.125乘以10^7

**Number 精度**
---
注意：当数值长度或浮点数值超过17位时
* 123456789123456789123 // 123456789123456780000
* 0.123456789123456789123 // 0.12345678912345678

**Number 范围**
---
ECMAScript 能够表示的数值范围
* 最小数值保存在 Number.MIN_VALUE 中，大多浏览器的值为 5e-324  
* 最小数值保存在 Number.MAX_VALUE 中，大多浏览器的值为 1.7976931348623157e+308
如果某次计算结果超过JS数值范围的值，那么这个数值将自动转换成特殊的 ±Infinity值 (±无穷)

**Number 方法**
---
* Number.parseInt() // 默认以十进制解析，传参数二可改成其他进制进行解析

**String 字面量**
---
* \n 换行
* \b 空格

**String 方法**
---
数值、布尔值、对象和字符串值都 toString 方法  
null 和 undefined 值没有 toString 方法  

注意：
* {}.toString() 打印结果为 [object Object]
* [1, 2, 3].toString() 打印结果为 '1,2,3'

**Object 原型方法**
---
new Object() // 实例化后对象拥有 Object 所有的成员
* constructor 访问实例的构造函数
* hasOwnProperty 访问实例的属性是否在其构造函数中，isFunc 返回 Bool 值
* isPrototypeOf 检测原型是否一致， isFunc 返回 Bool 值
* propertyIsEnumerable 实例的属性是否能使用 for-in 语句，isFunc 返回 Bool 值
* toLocaleString 
* toString 
* valueOf 返回自身

**构造函数、原型对象、实例化**
---
```js
// 构造函数
function Example() {
  this.content = {};
}
console.log(Example.prototype); // 构造函数访问自身原型对象

const example = new Example(); // 实例化
console.log(example); // 实例
console.log(example.constructor); // 实例访问其构造函数
console.log(example.__proto__); // 实例访问其原型对象
```

**call、apply**
---
作用：继承其他构造函数实例化后对象的属性，两者作用相同  
参数一都是改变其他构造函数的 this 指向  
* apply 方法参数二接收一个数组或伪数组，方法内部会自行遍历
* call 方法则接收数组或伪数组遍历出来后的结果，每一项以逗号隔开

**一元操作符**
---
++ -- + -
* 前++/-- 在该行语句执行前进行++/--
* 后++/-- 在该行语句执行后进行++/--
* +/- 可进行隐式转换

**布尔操作符**
---
* ! 取反
* && 找假 true && false => false
* || 找真 false && true => true

**相等操作符**
---
ECMAScript 提供两组操作符：
* 相等与不相等---先转换再比较
* 全等与不全等---仅比较而不转换

注意：  
null == undefined // true  
null == 0 // false  
undefined == 0 // false  

**逗号操作符**
---
使用逗号操作符可以在一条语句中执行多个操作  
```js
// 声明多个变量
let a = 1, b = 2, c = 3;
// 赋值
let num = (1, 2, 3); // 3
```

**do-while**
---
```js
do {
  // 循环体（至少执行一次）
} while (false)
```

**while**
---
```js
while (false) {
  // 循环体
}
```

**break、continue**
---
* break 使用场景：当满足某个条件时退出循环（完全退出循环）
* continue 使用场景：当满足某个条件时跳过当前循环（只退出当前循环）

## 第四章

**typeof、instanceof 操作符**
---
* typeof 判断值类型
* instanceof 判断是否在原型链上

注意：  
typeof 无法精确识别 [] null /xxx/ 类型，都返回 'object'  
instanceof 可以判断该实例是否为该构造函数实例化出来的  
```js
[] instanceof Array; // true
{} instanceof Object; // true
/x/ instanceof RegExp; // true
```

****

