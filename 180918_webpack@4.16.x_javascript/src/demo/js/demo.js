import '../style/style1.css';
import '../style/style2.scss';
import '../font/iconfont.css';
console.log('demo');
import _ from 'lodash';
console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
import e from 'echarts';
console.log(e);

const one = 'abc';
let two = 123;

console.log(one);
console.log(two);

const fn = () => {
  console.log('箭头函数');
};
fn();

const obj1 = {
  aaa: 'aaa'
};

const obj2 = {
  bbb: 'bbb'
};

const newObj = Object.assign({}, obj1, obj2);
console.log(newObj);

console.log('--------------------------------');

import es6 from '../../lib/lib_es6/test.es6';
console.log(es6);
