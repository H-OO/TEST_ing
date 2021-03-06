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
12种基本数据类型
* 布尔
* 数字
* 字符串
* 数组
* 元组
* 枚举
* any
* void
* null
* undefined
* never
* Symbols
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

**函数类型**
---
```TS
interface c {
  (
    one: string,
    two: number
  ): void;
}
let test: c;
test = function (one, two) {
  console.log(one);
  console.log(two);
}
test('1', 2);
```

**字符串索引签名**
---
```TS
/******************_数组使用_******************/
interface f_arr {
  [index: number]: string; // 规定索引签名是number类型，返回值是字符串类型
}
let arr: f_arr = ['1', '2']; // 元素都为string
/******************_对象使用_******************/
interface f_obj {
  [propName: string]: number; // 规定索引签名是string类型，返回值是number类型
}
let obj: f_obj = {
  one: 1 // string: number
};
// 返回值不限制可使用 any
interface f_obj {
  one: string;
  two: number;
  [propName: string]: any; // 除one与two外，其他规定为 string: any 类型
}
let obj: f_obj = {
  one: '1',
  two: 2,
  three: null
};
```

**类类型**
---
```TS
// interface 定义接口
interface c {
  one: number;
  two(param: string): void;
}
// implements 使用接口
class C implements c {
  one = 123; // 实例中
  two(param: string) {} // 原型中
}
```

**类静态部分与实例部分的区别**
---
类使用接口时，接口只对实例部分进行检查
```TS
interface TestConstructor {
  new(x: string): TestInterface; // 实例: TestInterface
}
interface TestInterface {
  handler(param: number): void;
}
class Test implements TestInterface {
  // 构造函数属于静态部分，不检查
  constructor(x: string) { }
  // 实例部分，检查
  handler(param: number) { }
}
const res = new Test('x');
res.handler(123);
```

**继承接口**
---
```TS
interface A {
  a: string;
}
interface B {
  b: number;
}
interface C extends A, B {
  c: number[]
}
let test: C = {
  a: '123',
  b: 123,
  c: [1, 2, 3]
};
```

**混合类型**
---
```TS
interface A {
  // 单个时为函数接口
  (a: string): void;
  // 多个时为混合类型接口
  value: number;
  handler(b: string): void;
};
function test(): A {
  let x = <A>function (a: string) {}; // 类型断言
  x.value = 123;
  x.handler = function () {};
  return x;
}
```

**接口继承类**
---
接口会继承类的 private 成员  
这个接口类型只能被这个类或其子类所实现 implements
```TS
class Test {
  private state: any;
}
interface A extends Test {
  handler(): void;
}
class Button extends Test implements A {
  handler() {}
}
```

**类**
---
类继承
```TS
/******************_简单继承例子_******************/
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() { }
}
class B extends A { } // B继承A（B原型替换成A实例）
const res = new B('H'); // 实例化
// res.name // 实例属性
// res.sayName // B原型A实例原型中的方法
/******************_成员默认用 public 标记_******************/
class A {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public sayName() { }
}
/******************_成员改成用 private 标记_******************/
class A {
  private name: string; // 属性私有化
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    return this.name;
  }
}
const a = new A('H');
const res = a.sayName();
console.log(res); // H
/******************_成员改成用 protected 标记_******************/
// protected 与 private 行为相似，但 protected 成员在派生类中可以访问
// 从类的外部无法访问
class P {
  protected name: string; // 派生类访问该属性 [protected OK | private Error]
  constructor(name: string) {
    this.name = name;
  }
}
class C extends P {
  protected age: number;
  constructor(name: string, age: number) {
    super(name); // 将参数传递给父类构造函数，改变父类构造函数属性的 this 指向
    this.age = age;
  }
  // 访问P类 name 属性
  public sayName() {
    console.log(this.name);
  }
}
const c = new C('H', 17);
console.log(c); // {name: 'H', age: 17}
c.sayName(); // H
/******************_成员改成用 readonly 标记_******************/
class A {
  readonly name: string; // 构造函数实例化后不可篡改该属性
  constructor(name: string) {
    this.name = name;
  }
}
const a = new A('H');
console.log(a.name); // H
```

**参数属性**
---
类中构造函数参数 public 属性名 简化属性写法
```TS
/******************_简化前_******************/
class A {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    return this.name;
  }
}
/******************_简化后_******************/
class A {
  constructor(public name: string) {
    // public name 等同于 this.name = name
  }
  sayName() {
    return this.name;
  }
}
/******************_同样的用法_******************/
const a = new A('H');
const res = a.sayName();
console.log(res); // H
```

**存取器**
---
对访问存取属性值添加限制，使用 get set 模式

**静态属性**
---
static 修饰符，将属性设置为静态属性  
静态属性只能被类本身访问，实例不能访问
```TS
class A {
  public static msg: string; // 静态属性只能被类本身访问，实例不能访问
  public constructor(msg: string) {
    A.msg = msg; // 类调用属性进行赋值
  }
}
```

**abstract抽象类**
---
```TS
// 抽象类
abstract class A {
  constructor(public name: string) { }
  sayName(): void {
    console.log(this.name);
  }
  abstract sayHi(): void; // 派生类中必须有该方法
}
// 派生类
class B extends A {
  sayHi(): void {
    console.log('Hi');
  }
  // 方法需要在抽象类中备案 → abstract 方法名(): void;
  // 编译前会检查派生类中的方法在抽象类中是否存在
}
const b = new B('H');
b.sayName(); // H
```