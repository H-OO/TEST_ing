**类型注解**
---
用途：设置参数期望数据类型
```TS
/*******************_单个指定_********************/
function test(content: string) {
  return content; // 期望为 string 类型
}
const msg = '123'; // 正常编译运行
// const msg = 123; // 编译产生警告，能正常运行
test(msg);
/*******************_接口多个指定_********************/
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
/*******************_布尔值_*******************/
let bool: boolean = true;
/*******************_数字_*******************/
let num: number = 123;
/*******************_字符串_*******************/
let str: string = 'abc';
/*******************_数组_*******************/
let arr1: number[] = [1, 2, 3]; // 方式1
let arr2: Array<number> = [1, 2, 3]; // 方式2
let arr3: (number|string) = [1, '2']; // 方式3 交叉类型
let arr4: Array<number|string> = [1, '2']; // 方式4 交叉类型
/*******************_元组_*******************/
// 元组类型是一个已知元素数量和类型的数组
let arr: [string, number];
arr = ['1', 2]; // OK
arr = [1, '2']; // Error
arr[3] = '3'; // OK 越界元素使用联合类型 (string|number)
/*******************_enum_*******************/

/*******************_any_*******************/
// 不进行类型检查
let test: any = 123;
let arr: any[] = [1, '2', true];
/*******************_void_*******************/
// 没有任何类型，只能赋值 undefined 或 null
let test: void = null;
/*******************_undefined 和 null_*******************/
// 默认情况下，两者为所有类型的子类型
let test: number = undefined;
// 使用 --strictNullChecks 标记，两者只能赋值给 void 和自身 (推荐使用标记)
let test: void = undefined;
/*******************_never_*******************/
// 永不存在的值类型
// never类型是任何类型的子类型，没有任何类型可以赋值给never类型 (除了自身之外)
/*******************_类型断言_*******************/
// 人为做了类型检查
let test: string = '123'；
let length1: number = (<string>test).length; // 断言方式1 尖括号
let length2: number = (test as string).length; // 断言方式2 as (JSX语法支持)

```