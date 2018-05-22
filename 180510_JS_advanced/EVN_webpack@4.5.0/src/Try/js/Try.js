// function SuperType(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
// }
// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// };

// function SubType(name, age) {
//   SuperType.call(this, name); //第二次调用 SuperType()

//   this.age = age;
// }
// SubType.prototype = new SuperType(); //第一次调用 SuperType()
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// };

const str = '13012341234';
const res = str.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3');
console.log(res);
