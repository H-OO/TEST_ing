/** 
 * 导出声明
 * 任何声明（比如变量、函数、类、类型别名或接口）都能通过添加`export`关键字来导出
 */
export function testFunc(): void {
  console.log('_test_');
}

export const msg = '声明导出测试';

export function log(msg: string): void {
  console.log(msg);
}
