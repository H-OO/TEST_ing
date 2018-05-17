// Object.defineProperty
const obj = {
  _test: {
    a: 'a'
  },
};

Object.defineProperty(obj, 'test', {
  get: function () {
    return this._test;
  },
  set: function (newValue) {
    console.log(newValue);
    this._test = newValue;
  }
});


obj.test = '__B__';

console.log(obj._test);

// var book = {
//   _year: 2004,
//   edition: 1
// };

// Object.defineProperty(book, "year", {
//   get: function () {
//     return this._year;
//   },
//   set: function (newValue) {
//     console.log(newValue);
//     if (newValue > 2004) {
//       this._year = newValue;
//       this.edition += newValue - 2004;
//     }
//   }
// });
// book.year = 2005;

// console.log(book.edition); //2