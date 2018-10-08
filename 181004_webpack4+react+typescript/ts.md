## ts

## **基本类型**

- boolean
- number
- string
- undefined
- null
- 数组 number[] / Array<number|string>
- 元组 [number, string]
- 枚举 enum {First = 0, Second, Third}
- any 模糊类型
- void 没有任何类型，只能是 undefined 和 null
- never 函数存在无法到达的终点，例如抛出错误，死循环等
- 类型断言 <> / as，jsx 中只能使用 as
- 对象检查 <接口>{}

注：默认情况下，undefined 和 null 是所有类型的子类型

```ts
// 数组解构
let [first, second]: [number, string] = [123, 'yy'];
console.log(first, second);
// 对象解构
let { a, b }: { a: number; b: string } = { a: 123, b: 'yy' };
// 对象解构-属性重命名
let { a: first, b: second }: { a: number; b: string } = { a: 123, b: 'yy' };
console.log(first, second); // 123 'yy'
// 对象解构-缺少值时
let { a: first, b: second = 'oo' }: { a: number; b?: string } = { a: 123 };
console.log(first, second); // 123 'oo'
// 函数参数-数组解构
function foo([first, second]: [number, string]): void {
  console.log(first, second);
}
foo([123, 'yy']);
// 函数参数-对象解构
function foo({ first, second }: { first: number; second: string }): void {
  console.log(first, second);
}
foo({ a: 123, b: 'yy' });
// 函数参数-返回值
type C = { a: number; b: string }; // 方式2 interface C {a: number, b: string};
function foo(param: C): object {
  return param;
}
foo({ a: 123, b: 'yy' });
// 函数参数-接口
interface Foo {
  (first: string, second: number): void;
}
const foo: Foo = function(first, second) {
  console.log(first, second); // 'yy' 123
};
foo('yy', 123);
// 数组-索引类型
interface Arr {
  [index: number]: string
}
const arr: Arr = ['a', 'b', 'c'];
const a = arr[0];
console.log(a); // 'a'
// 对象-索引类型
interface Obj {
  [index: string]: number
}
const obj: Obj = {
  first: 0,
  second: 1
};
console.log(obj['first']);
// 类-类型（公共部分）
interface Person {
  name: string;
  sayAge(age: number): number;
}
class P implements Person {
  name: string;
  constructor(name: string) {
    // 私有部分接口不能对其进行检查
    this.name = name;
  }
  sayAge(age: number) {
    return age;
  }
}
const p = new P('yy');
console.log(p.name, p.sayAge(18)); // 'yy' 18
// 类-类型（私有部分处理）
interface PIF {
  name: string;
}
interface PCtor {
  new (name: string, age: number): PIF;
}
class P implements PIF {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
function createP(ctor: PCtor, name: string, age: number): PIF {
  return new ctor(name, age);
}
const p = createP(P, 'yy', 18);
console.log(p); // {name: "yy", age: 18}
```

## **接口**

- :
- interface A { first: string, second?: number }
- type A = { first: string, second?: number }
- 对象只读属性，属性前面加 readonly
- 只读数组 ReadonlyArray<any>
- 额外属性 [propName: string]: any
- 索引类型 数组[index: number]: any，对象[index: string]: any
- 类类型 implements (接口只描述类的公共部分)

## **类**

属性成员
* public  公共，外部可访问(默认)
* private 私有，外部不可访问

```ts

```