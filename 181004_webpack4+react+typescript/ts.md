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
```

## **接口**

* :
* interface A { first: string, second?: number }
* type A = { first: string, second?: number }
* 对象只读属性，属性前面加 readonly
* 只读数组 ReadonlyArray<any>
* 额外属性 [propName: string]: any