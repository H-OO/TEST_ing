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
* Number.parseFloat() // 字符串转数字，保留浮点数
* toString() // 传递参数返回进制数值的字符串
* toFixed() // 保留几位小数

**String 字面量**
---
* \n 换行
* \b 空格

**String**
---
API
* charAt 根据索引返回字符
* charCodeAt 单个字符转 Unicode
* concat 连接字符串
* indexOf 正向检索字符串，返回字符串下标
* lastIndexOf 反向检索字符串，返回字符串下标
* match 正则检索，返回匹配字符、索引、整个字符串
* replace 替换
* search 正则检索，返回索引
* slice 切割
* split 字符串转数组
* substr 选取字符串，参数1为起始下标，参数2为字符个数
* substring 切割
* toLocaleLowerCase 字母字符串转小写
* toLocaleUpperCase 字母字符串转大写
* toLowerCase 字母字符串转小写
* toUpperCase 字母字符串转大写
* toString 返回自身
* trim 去首尾空格
* valueOf 返回自身

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

**执行环境**
---
根据 ECMAScript 实现所在的宿主环境不同，表示执行环境的对象也不一样  
Web 浏览器中，全局执行环境被认为是 window 对象  
因此所有全局变量和函数都是作为 window 对象的属性和方法创建的  
某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁

全局执行环境直到应用程序退出--例如关闭网页或浏览器--时才会被销毁

每个函数都有自己的执行环境  
当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。  
而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。  

**作用域**
---
当代码在一个环境中执行时，会创建变量对象的一个作用域链  
作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问  
作用域链的前端，始终都是当前执行的代码所在环境的变量对象

## 第五章

**Array**
---
API
* concat 拼接数组
* every 遍历数组，判断所有元素是否满足同一条件，返回 Bool
* filter 遍历数组，返回满足条件的元素组成的数组
* forEach 遍历数组，无返回值
* indexOf 正向获取元素下标
* join 转成以其参数进行分割的字符串
* lastIndexOf 反向获取元素下标
* map 遍历数组，将返回的内容用新的空数组进行接收
* pop 移除数组末项 【原】
* push 最末端追加全部参数 【原】
* reduce 累加器，数组从左往右累加
* reduceRight 累加器，数组从右往左累加
* reverse 反转数组 【原】
* shift 移除数组首项 【原】
* slice 切割数组
* splice 切割或拼接替换数组 【原】
* sort 数组升序或降序
* some 遍历数组，检测是否有元素满足条件，返回 Bool
* toString 转成以逗号分割的字符串
* unshift 最前端追加全部参数 【原】
* valueOf 返回自身

**栈**
---
栈是一种LIFO（Last-In-First-Out）的数据结构
```
In -↓-↑- Out
```

**队列**
---
队列是一种FIFO（First-In-First-Out）的数据结构
```
-↓- In
 -
-↓- Out
```

**数组排序**
---
```js
const arr = [2, 1, 3, 0, 4];

// 冒泡排序
function bubbleSort (arr) {
  for (let index = 0, len = arr.length; index < len; index++) {
    for (let i = index; i < len; i++) { // 优化
      if (arr[index] > arr[i]) { // 升序 > | 降序 <
        const tmp = arr[index];
        arr[index] = arr[i];
        arr[i] = tmp;
      }
    }
  }
  return arr;
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    console.log(arr[i]);
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right)); // 升序
  // return quickSort(right).concat([pivot], quickSort(left)); // 降序
}
```

**Date**
---
API
* getTime() 13位时间戳，单位ms
* getFullYear() 年
* getMonth() 月 语言规定返回0至11，即0表示1月
* getDate() 日
* getHours() 时
* getMinutes() 分
* getSeconds() 秒
* getDay() 星期几
* getMilliseconds() 3位时间戳，单位ms
* getTimezoneOffset() 本地时间与UTC时间相差的分钟数 中国东八区-480 美国西五区300

**RegExp**
---
API
* exec() 接收字符串，返回数组，包含选中的字符串、字符串的起始位置下标、整个字符串
* test() 接收字符串，返回 bool

修饰符
* g 全局，应用于所有字符串 global
* i 不区分大小写 case-insensitive
* m 多行模式 multiline

表达式
* [] 范围写法，[0-9]、[a-zA-Z0-9]、[\w\.]
* | 其中任意一个规则匹配
* () 分组符，为单独一项设置匹配规则

元字符
* \d 数字
* \D 非数字
* \s 空格
* \S 非空格
* \w 字母数字下划线
* \W 非字母数字下划线

量词
* \* {0,}
* \+ {1,}
* ? {0,1}

支持符号
* . 除换行符以外的其他单个字符
* ^ 开始
* $ 结束

取反
* [^] 例如[^a-z] 忽略a-z的字符串

```js
// 例子1
const str = 'http://www.baidu.com/a/b.html';
// 截取域名
str.match(/\/\/[\w\.]+/)[0].replace(/\//g, '') // 'www.baidu.com'
// 截取文件名
str.match(/[\w]+\.html/)[0].match(/\w+/)[0] // 'b'

// 例子2
const str = 'http://www.baidu.com/a/b.html?username=1&password=123';
// 截取序列化后的参数变为对象形式
const res = str.match(/\?.*/)[0].replace(/\?/, '').split(/&/);
const param = {};
res.forEach((item, i) => {
  const tmp = item.split(/=/);
  param[tmp[0]] = tmp[1];
});
console.log(param); // {username: "1", password: "123"}

// replace $
const str = '15012341234';
const res = str.replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1-$2-$3');
console.log(res); // 150-1234-1234

// 包裹不确定字符
const str = `$t(Aa._01)aaa$t(Aa._02)`;
const res = str.match(/\$t\([\.\w]*\)/g);
console.log(res); // ['$t(Aa._01)', '$t(Aa._02)']
```

**Function**
---
函数没有重载，重复声明两个同名函数，只有最后一个函数会生效

**Function内部属性**
---
函数内部两个特殊的对象
* arguments 伪数组，用于接收传入的所有参数
* this 默认指向使用对象，该指向会受 new call() apply() bind() 影响

**Math**
---
API 常用
* abs() 绝对值
* ceil() 向上取整
* floor() 向下取整
* max() 选出一组数值的最大值
* min() 选出一组数值的最小值
* PI 获取圆周率 π
* random() 获得大于等于0小于1的一个随机数
* round() 四舍五入取整

## 第六章

**面向对象**
---
目的：理解对象属性、创建对象、继承

ECMAScript 中有两种属性：数据属性和访问器属性

**数据属性**
---
4个描述其行为的特性
* [[Configurable]] 能否通过 delete 操作符删除属性，默认值为 true
* [[Enumerable]] 该属性能否 for-in 遍历获得，默认值为 true
* [[Writable]] 能否修改属性的值，默认为 true
* [[Value]] 保存属性值，在该位置进行读写操作，默认值为 undefined

想修改属性默认的特性，需要使用 Object.defineProperty() 方法
```js
// 该方法接收三个参数：属性所在的对象、属性名、描述符对象
// 描述符对象的属性必须是： configurable 、 enumerable 、 writable 、 value
const person = {};
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'H_OO'
});
person.name = ''; // 非严格模式为无效操作 严格模式会报错
console.log(person.name); // 'H_OO'
```
注意：建议不要在 IE8 使用Object.defineProperty() 方法

**访问器属性**
---
* [[Configurable]] 
* [[Enumerable]] 
* [[Get]] 在读取属性时调用的函数
* [[Set]] 在写入属性时调用的函数

访问器属性不能直接定义，需要使用 Object.defineProperty() 方法
```js
const data = {
  _test: null
};
// Vue原理
const vm = (obj, property) => {
  Object.defineProperty(obj, property, {
    get: function () {
      return this['_' + property]
    },
    set: function(newValue) {
      this['_' + property] = newValue;
      console.log('修改视图...');
    }
  });
  return obj;
}
// 设置属性
const state = vm(data, 'test');
console.log(state['test']); // null
state['test'] = 'xxx'; // 重新赋值
console.log(state['test']); // xxx
```

**定义多个属性**
---
注意运行环境
```js
const book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});
```

**创建对象-工厂模式**
---
通过 new Object() 创建一个空对象，再对该对象定制属性，通过参数进行赋值
```js
function createPerson (name, age, job) {
  const o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  return o;
}
const person1 = createPerson('YY', 17, 'WEB');
const person2 = createPerson('OO', 17, 'H5C3ES6');
```

**创建对象-构造函数模式**
---
通过函数、this、new操作符创建对象
```js
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  // 不需要 return 也会将自身返回
}
const person1 = new Person('YY', 17, 'WEB');
```

**创建对象-原型模式**
---
通过函数的 prototype 属性访问构造函数原型对象添加成员，原型对象上的成员是被实例共享的
```js
function Person () {}
Person.prototype.sayHi = () => {};
const person1 = new Person();
const person2 = new Person();
console.log(person1.sayHi === person2.sayHi); // true
```
因为创建了一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性  
prototype 属性指向函数的原型对象  
原型对象都会自动获得一个 constructor 属性  
constructor 属性包含一个指向 prototype 属性所在函数的指针

注意：实例对象添加与原型对象相同的属性时，不会影响原型对象上的属性  
因为实例在使用某个属性时，先会在当前实例中查找，查不到再去原型对象中查找  
如果原型对象中也没有，则返回 undefined

**创建对象-构造函数模式与原型模式**
---
在 ECMAScript 中使用最广泛、认同度最高的一种
```js
function Person () {}
Person.prototype = {
  constructor: Person, // 替换了原有的原型对象 需要重新添加 constructor 属性
  sayHi: function () {
    console.log(this); // this 指向
  }
};
const p1 = new Person();
```

**创建对象-动态原型模式**
---
保留构造函数模式与原型模式的优点，将所有的信息都封装在构造函数中  
也就是说，通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
```js
function Person () {
  this.name = 'yy';
  // 只需检查其中一个即可
  if (typeof this.sayHi != 'function') {
    // 只执行一次
    Person.prototype.sayHi = function () {
      console.log(this);
    }
  }
}
const p1 = new Person();
```
注意：在已经创建了实例的情况下重写原型，会切断现有实例与新原型之间的联系

**创建对象-寄生构造函数模式**
---
思想：创建一个函数用来封装创建对象的代码，然后再返回新创建的对象
```js
function Person (name) {
  const o = new Object();
  o.name = name;
  o.sayHi = function () {
    console.log(this.name);
  }
  return o;
}
const p1 = new Person('yy');
p1.sayHi(); // yy
```
应用场景
```js
// 创建一个具有额外方法的特殊数组
function SpecialArray () {
  const arr = new Array();
  arr.push.apply(arr, arguments);
  arr.toPipedString = function () {
    return this.join('|');
  }
  return arr;
}
const arr = new SpecialArray(1, 2, 3); // 获得特殊数组
const res = arr.toPipedString(); // 使用特殊数组的方法
console.log(res); // 1|2|3
```

**创建对象-稳妥构造函数模式**
---
特征：构造函数内部不适用 this，使用构造函数不使用 new 操作符  
适用于安全环境中，这些环境会禁止使用 this 和 new
```js
function Person (name) {
  const o = new Object();
  o.sayName = function () {
    console.log(name);
  }
}
const p = Person('YY'); // 不使用 new
```

**继承**
---
许多OO语言都支持两种继承方式：接口继承、实现继承  
* 接口继承 只继承方法签名
* 实现继承 继承实际的方法

由于 ECMAScript 函数没有签名，所以不能实现接口继承  
ECMAScript 只支持实现继承，主要依靠原型链来实现

**原型链**
---
思想：利用原型让一个引用类型继承另一个引用类型的属性和方法

优点：实现继承

缺点：包含引用类型值的原型

**继承-借用构造函数继承**
---
借用构造函数继承也叫伪经典继承  
原理：通过apply() 和 call() 方法改变另一个构造函数的 this 指向
```js
// 将构造函数B的属性和方法继承给构造函数A的实例
function A() {
  B.call(this); // 继承
}
function B() {
  this.arr = [1, 2, 3];
}
const a1 = new A();
a1.arr.push(4);
console.log(a1.arr);
const a2 = new A();
console.log(a2.arr);
```
优点：可传递参数  
缺点：函数不可复用

**继承-组合继承**
---
组合继承指将原型链和借用构造函数的技术组合在一起  
思想：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承  
做法：将简单类型和引用类型设置在构造函数中，function类型设置在原型对象中  
```js
function A() {
  B.call(this);
}
function B() {
  this.arr = [1, 2, 3];
}

B.prototype.sayArr = function () {
  console.log(this);
  console.log(this.arr);
};
A.prototype = new B(); // A原型继承B实例
// 原型链关系：a → a.__proto__ (b) → b.__proto__

const a1 = new A();
const a2 = new A();
console.log(a1.arr === a2.arr); // false
console.log(a1.sayArr === a2.sayArr); // true
```

**继承-原型式继承**
---
原生
```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
const person = {
  sayHi: function () {
    console.log('Hi');
  }
};
const p = object(person);
p.sayHi(); // Hi
```

使用 Object.create 方法 (IE9+)
```js
const person = {
  sayName: function () {
    console.log(this.name);
  }
};
const o1 = Object.create(person, {
  name: {
    value: 'yy'
  }
});
const o2 = Object.create(person, {
  name: {
    value: 'oo'
  }
});
o1.sayName(); // yy
o2.sayName(); // oo
console.log(o1.sayName === o2.sayName); // true
```

**继承-寄生式继承**
---
寄生式继承的思路与寄生构造函数和工厂模式类似，创建一个仅用于封装继承过程的函数  
```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function createPerson(original) {
  const clone = object(original);
  clone.sayHi = function () {
    console.log('Hi');
  }
  return clone;
}
const original = {};
const p = createPerson(original);
console.log(p); // {sayHi: f}
```

**继承-寄生组合式继承**
---
通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
```js
// 父类
function F(name) {
  this.name = name;
}
F.prototype.say = function () {
  console.log(this.name);
}
// 子类
function C() {
  F.apply(this, arguments); // 修改父类的this指向，继承属性
}
// 寄生组合式 ↓↓↓
// 生成新对象 
function object(o) {
  function O() {}
  O.prototype = o;
  return new O();
}
// 继承方法
function inheritPrototype(C, F) {
  const prototype = object(F.prototype); // 创建对象 （原生方法）
  // const prototype = Object.create(F.prototype); // 创建对象 （API方法）
  prototype.constructor = F; // 增强对象
  C.prototype = prototype; // 作为子类的原型
}
inheritPrototype(C, F);
// 寄生组合式 ↑↑↑
const c = new C('YY');
console.log(c);
c.say(); // YY
```

**小结**
---
创建对象的模式
* 工厂模式：通过原生对象构造函数生成对象，然后添加属性，最后return
* 构造函数模式：通过函数内部的this对象，生成对象使用 new 操作符
* 原型模式：通过prototype添加属性
* 组合模式：构造函数通过this用来设置属性，原型用来设置方法 【推荐】
* 动态原型模式：通过 typeof 检查某个方法是否有效，来决定是否初始化原型
* 寄生构造函数模式：想创建一个具有额外方法的特殊数组时
* 稳妥构造函数模式：函数内部不使用 this 对象，生成对象不使用 new 操作符

继承 (A子类 B父类)
* 原型链继承：A.prototype = new B()
* 借用构造函数继承：A构造函数内 B.call(this) 改变B构造函数的 this 指向
* 组合继承：将A构造函数的原型替换成B构造函数的实例，A构造函数内 B.call(this)
* 原型式继承：创建一个临时的构造函数，将传入的对象作为这个构造函数的原型
* 寄生式继承：与原型式紧密结合，接收原型式返回的对象，然后增强该对象后再返回
* 寄生组合式继承：A.prototype.__proto__ = B.prototype 【经典继承】

## 第七章

**递归**
---
```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
factorial(5); // 120
```
```
num = 5
|- 5 * factorial(4) // 5 * 24 = 120
|-       4 * factorial(3) // 4 * 6 = 24
|-             3 * factorial(2) // 3 * 2 = 6
|-                   2 * factorial(1) // 2 * 1 = 2
|-                         1
```

**闭包**
---
闭包是指有权访问另一个函数作用域中的变量的函数  
常见方式：在一个函数内部创建另一个函数  

* 使用闭包
```js
function outer () {
  const msg = 'Hi';
  return function () {
    console.log(msg);
  }
}
const p = outer(); // f inner () {}
p(); // Hi
```

* 释放内存
```js
function outer () {
  let num = 0;
  return function () {
    num++;
    console.log(num);
  }
}

let f = outer();
document.addEventListener('click', function (e) {
  f(); // 执行匿名函数
}, false)

document.addEventListener('dblclick', function (e) {
  f = null; // 回收
  f = outer(); // 重新创建
}, false)
```

**内存泄露**
---
IE9之前版本，如果闭包的作用域链中保存着一个 HTML 元素，那么就意味着该元素将无法被销毁
```js
// 泄露
function handler() {
  let ele = document.querySelector('#test');
  ele.onclick = function () {
    console.log(ele.id); // 存在对 ele 的引用
  }
}
handler();

// 解决方案
function handler() {
  let ele = document.querySelector('#test');
  const id = ele.id; // 
  ele.onclick = function () {
    console.log(id);
  }
  ele = null; // 内存回收
}
handler();
```

**匿名函数**
---
匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window  
但是由于书写方式的不同，这一点可能不会那么明显
```js
// 对象中使用匿名函数 this 指向会丢失
const obj = {
  a: function () {
    return function () {
      console.log(this); // undefined
    }
  }
};
obj.a();
```

## 第八章
BOM

**window对象-窗口位置**
---
* screenX 浏览器与显示屏左边界的距离
* screenY 浏览器与显示屏上边界的距离

**window对象-窗口大小**
---
* outerWidth 浏览器整体宽度
* outerHeight 浏览器整体高度
* innerWidth 可视窗口宽度
* innerHeight 可视窗口高度

**window对象-导航**
---
* open() 跳转至开启一个新标签 参数1为[域名|本服务器HTML路径] 参数2为[_self|_blank]
* close() 关闭当前标签页

**定时器**
---
* setTimeout
* clearTimeout
* setInterval
* clearInterval

**系统对话框**
---
显示这些系统对话框，代码会停止执行，关闭后又恢复执行
* alert() 系统提示框
* confirm() 系统确认框 返回bool
* prompt() 系统输入框 返回输入内容

**location对象**
---
它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能  
既是window对象的属性，又是document对象的属性  
https://github.com:80/H-OO/Note?username=H-OO#123
* hash #123
* host github.com:80
* hostname github.com
* href https://github.com:80/H-OO/Note?username=H-OO#123
* pathname /H-OO/Note
* port 80
* protocol https:
* search ?username=H-OO

**navigator对象**
---
navigator.userAgent 获取用户设备信息
* WeChat MicroMessenger
* 安卓 Android
* iOS iPhone
* iPad iPad
* PC 非以上则视为PC端
获取设备信息后，可先将字符串的字母转小写，再通过 indexOf() 进行检查

**screen对象**
---
表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等
* availHeight
* availLeft
* availTop
* availWidth
* colorDepth
* height
* orientation
* pixelDepth
* width

**history对象**
---
出于安全方面的考虑，开发人员无法得知用户浏览过的 URL  
* back() 退后一页
* forward() 前进一页
* go() 传递number类型代表前进或后退几页，string类型则跳转最近的与参数匹配的页
* length 第一个页面 (history.length === 0)
* replace() 导航到一个新 URL，同时该 URL 会替换浏览器历史记录中当前显示的页面

