interface SquareConfig {
  a?: string;
  b?: number;
  // [propName: string]: any;
}

function test(param: SquareConfig): SquareConfig {
  return param;
}

const o = {
  a: '1',
  b: 2,
  c: []
};

const res = test(o);
console.log(res);
