**类型注解**
---
用途：设置参数期望数据类型
```TS
/****************_单个指定_****************/
function test(content: string) {
  return content; // 期望为 string 类型
}
const msg = '123'; // 正常编译运行
// const msg = 123; // 编译产生警告，能正常运行
test(msg);
/****************_接口多个指定_****************/
interface Content {
  a: string;
  b: string;
}
function test(content: Content) {
  return content;
}
const msg = {
  a: '1',
  b: '2'
};
test(msg);
/****************_可选属性_****************/
interface Content {
  a: string;
  b: string;
  c?: string; // 可选
}
/****************_只读属性_****************/
interface Content {
  readonly a: string;
  readonly b: string;
}
// 只读的数值类型 ReadonlyArray<>
interface Content {
  readonly a: string;
  readonly b: ReadonlyArray<number>;
}
// ReadonlyArray 赋值到其他变量是不可以的，但可以用类型断言重写
```

**基于类的面向对象编程**
---
* 类和接口可以一同使用
* 构造函数的参数上使用 public 等同于创建了同名的成员变量
```TS
class Test {
  res: string;
  constructor(a, public b) {
    this.res = a + ' ' + b;
  }
}
interface Param {
  a: string,
  b: string
}
const msg = {
  a: '1',
  b: '2'
};
const test = new Test('_a_', '_b_');
console.log(test.res);
```
编译后↓
```JS
var Test = /** @class */ (function () {
  function Test(a, b) {
    this.b = b;
    this.res = a + ' ' + b;
  }
  return Test;
}());
var msg = {
    a: '1',
    b: '2'
};
var test = new Test('_a_', '_b_');
console.log(test.res); // _a_ _b_
```

**基础数据类型**
---
```TS
/****************_布尔值_****************/
let bool: boolean = true;
/****************_数字_****************/
let num: number = 123;
/****************_字符串_****************/
let str: string = 'abc';
/****************_数组_****************/
let arr1: number[] = [1, 2, 3]; // 方式1
let arr2: Array<number> = [1, 2, 3]; // 方式2
let arr3: (number|string) = [1, '2']; // 方式3 交叉类型
let arr4: Array<number|string> = [1, '2']; // 方式4 交叉类型
/****************_元组_****************/
// 元组类型是一个已知元素数量和类型的数组
let arr: [string, number];
arr = ['1', 2]; // OK
arr = [1, '2']; // Error
arr[3] = '3'; // OK 越界元素使用联合类型 (string|number)
/****************_enum_****************/
// 枚举类型可以为一组数值赋值友好的名字
// 默认从0开始元素编号，也可以手动指定成员的数值，如下
enum Color {Red=5, Green, Blue}
let c: Color = Color.Green;
console.log(c);
var Color;
(function (Color) {
    Color[Color["Red"] = 5] = "Red";
    Color[Color["Green"] = 6] = "Green";
    Color[Color["Blue"] = 7] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c); // 6
/****************_any_****************/
// 不进行类型检查
let test: any = 123;
let arr: any[] = [1, '2', true];
// 函数不需要返回值
function test(): any {}
/****************_void_****************/
// 没有任何类型，只能赋值 undefined 或 null
let test: void = null;
// 函数不需要返回值
function test(): void {}
/****************_undefined 和 null_****************/
// 默认情况下，两者为所有类型的子类型
let test: number = undefined;
// 使用 --strictNullChecks 标记，两者只能赋值给 void 和自身 (推荐使用标记)
let test: void = undefined;
/****************_never_****************/
// 永不存在的值类型
// never类型是任何类型的子类型，没有任何类型可以赋值给never类型 (除了自身之外)
/****************_类型断言_****************/
// 人为做了类型检查
let test: string = '123';
let length1: number = (<string>test).length; // 断言方式1 尖括号
let length2: number = (test as string).length; // 断言方式2 as (JSX语法支持)
```

**变量声明**
---
let 与 var 用法基本一致，唯一不同的是 let 可以生成块级作用域  
```TS
/******************_块级作用域_******************/
if (true) {
  let a = 0;
}
console.log(a); // Error
/******************_属性重命名_******************/
const o = {
  a: 1,
  b: '2'
};
// 解构并将属性重命名
let { a: newName1, b: newName2 } = o;
// 编译后 ↓
var newName1 = o.a, newName2 = o.b;
// 指示类型 ↓
let { a: newName1, b: newName2 }: {a: number, b: string} = o;
```

**展开操作符**
---
```TS
/******************_对象中使用_******************/
let o1 = {a: 1, b: 2, c: 3};
let o2 = {...o1, a: 0};
console.log(o2); // { a: 0, b: 2, c: 3 }
// 等效于
Object.assign({}, o1, {a: 0});
```

**class**
---
```TS
/******************_TS_******************/
class C {
  p = 123; // 实例中
  m() {} // 原型中
}
/******************_ES6_******************/
class C {
  constructor() {
    // 实例中
    this.p = 123;
  }
  m() {} // 原型中
}
```
