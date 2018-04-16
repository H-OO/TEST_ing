import h from '../css/Home.css';
import '../sass/Home.sass';
console.log(h);

import _ from 'lodash';

import echarts from 'echarts';
console.log(echarts);


function Foo() {
  this.a = 1;
}
 
function Bar() {
  this.c = 3;
}
 
Foo.prototype.b = 2;
Bar.prototype.d = 4;
 
const newObj = _.assign({ 'a': 0 }, new Foo, new Bar);
console.log(newObj);

