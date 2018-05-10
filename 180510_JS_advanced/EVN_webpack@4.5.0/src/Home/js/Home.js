import '../css/Home.css';
import '../scss/Home.scss';
import _ from 'lodash';
import echarts from 'echarts';
import $http from '$http';

import testES6 from 'testES6';
console.log(testES6);

console.log(echarts); // use echarts
console.log($http); // import httpServer


// lodash ↓↓↓
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
// lodash ↑↑↑
