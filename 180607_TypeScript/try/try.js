var Test = /** @class */ (function () {
    // 类使用接口时，接口只对实例部分进行检查
    // 构造函数属于静态部分，不检查
    function Test(x) {
    }
    // 实例部分，检查
    Test.prototype.handler = function (param) { };
    return Test;
}());
var res = new Test('x');
res.handler(123);
console.log(res);
