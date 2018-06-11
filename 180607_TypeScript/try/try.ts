interface TestConstructor {
  new(x: string): TestInterface; // 实例: TestInterface
}

interface TestInterface {
  handler(param: number): void;
}

class Test implements TestInterface {
  // 类使用接口时，接口只对实例部分进行检查
  // 构造函数属于静态部分，不检查
  constructor(x: string) { }
  // 实例部分，检查
  handler(param: number) { }
}

const res = new Test('x');
res.handler(123);
