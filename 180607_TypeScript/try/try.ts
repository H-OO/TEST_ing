class A {
  public static msg: string; // 静态属性只能被类本身访问，实例不能访问
  public constructor(msg: string) {
    A.msg = msg; // 类调用属性进行赋值
  }
}