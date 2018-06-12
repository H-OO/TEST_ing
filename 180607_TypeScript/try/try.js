// abstract class Department {
//   constructor(public name: string) { }
//   printName(): void {
//     console.log('Department name: ' + this.name);
//   }
//   abstract printMeeting(): void; // 必须在派生类中实现
//   // abstract generateReports(): void; // 必须在派生类中实现
// }
// class AccountingDepartment extends Department {
//   constructor() {
//     super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
//   }
//   printMeeting(): void {
//     console.log('The Accounting Department meets each Monday at 10am.');
//   }
//   generateReports(): void {
//     console.log('Generating accounting reports...');
//   }
// }
// let department: Department; // 允许创建一个对抽象类型的引用
// // 不能创建一个抽象类的实例
// department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
// department.printName();
// department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A(name) {
        this.name = name;
    }
    A.prototype.sayName = function () {
        console.log(this.name);
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.sayHi = function () {
        console.log('Hi');
    };
    return B;
}(A));
var b = new B('H');
console.log(b);
b.sayName(); // H
