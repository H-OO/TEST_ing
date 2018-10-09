import * as React from 'react';
import './App.scss';
import logo from './logo.svg';

class App extends React.Component {
  constructor(param: object) {
    super(param);
    // this.handler = this.handler.bind(this);
    // this.lodashHr = this.lodashHr.bind(this);
  }
  handler() {
    // const p = new Promise((done, err) => {
    //   done('200');
    // });
    // p.then(msg => {
    //   console.log(msg);
    // });
  }
  lodashHr() {
    // require.ensure(
    //   [],
    //   () => {
    //     const _ = require('lodash');
    //     console.log(_.defaults({ a: 1 }, { a: 3, b: 2 }));
    //   },
    //   'lodash'
    // );
  }
  componentWillMount() {
    // 类作为接口
    class P1 {
      name: string;
      age: number;
    }
    class P2 extends P1 {
      add: string;
    }
    const p: P2 = {
      name: 'yy',
      age: 18,
      add: 'SZ'
    };
    console.log(p);
    
    // interface P2 extends P1 {
    //   add: string;
    // }
    // const p: P2 = { name: 'yy', age: 18, add: 'SZ' };
    // console.log(p); // {name: "yy", age: 18, add: "SZ"}
    
    // // 抽象类
    // abstract class F {
    //   constructor(public name: string) {}
    //   abstract printName(): void; // 必须在派生类中实现
    // }
    // // 派生类
    // class C extends F {
    //   constructor(name: string) {
    //     super(name); // 派生类构造函数必须调用`super`方法
    //   }
    //   printName(): void {
    //     console.log(this.name);
    //   }
    // }
    // // 抽象类不能创建实例
    // // 抽象类中用`abstract`标记的属性需要在派生类中实现
    // const c0: C = new C('yy');
    // console.log(c0.name); // 'yy'
    // c0.printName(); // 'yy'
    // const c1: C = new C('oo');
    // console.log(c1.name); // 'oo'
    // c1.printName(); // 'oo'
    // abstract class Department {
    //   constructor(public name: string) {}

    //   printName(): void {
    //     console.log('Department name: ' + this.name);
    //   }

    //   abstract printMeeting(): void; // 必须在派生类中实现
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
    // // department = new Department(); // 错误: 不能创建一个抽象类的实例
    // department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
    // department.printName();
    // department.printMeeting();
    // // department.generateReports(); // 错误: 方法在声明的抽象类中不存在

    // class Person {
    //   protected name: string;
    //   constructor(name: string) {
    //     this.name = name;
    //   }
    // }

    // class Employee extends Person {
    //   private department: string;

    //   constructor(name: string, department: string) {
    //     super(name);
    //     this.name = 'yy';
    //     this.department = department;
    //   }

    //   public getElevatorPitch() {
    //     return `Hello, my name is ${this.name} and I work in ${
    //       this.department
    //     }.`;
    //   }
    // }

    // let howard = new Employee('Howard', 'Sales');
    // console.log(howard.getElevatorPitch());
    // console.log(howard.name); // 错误

    // class P {
    //   readonly name: string;
    //   constructor(name: string) {
    //     this.name = name;
    //     this.name = '_yy_';
    //   }
    //   change() {
    //   }
    // }
    // const p = new P('yy');
    // console.log(p);

    // let a: Array<number | string | object> = [1, 2, 3, '1', {}];
    // console.log(a);

    // let b: [string, number];
    // // b = [1, '1'];
    // b = ['1', 1];
    // console.log(b);
    // 枚举
    // enum Arr {First = 1, Second = 4, Third};
    // let c: Arr = Arr.Third;
    // console.log(c);

    // const o1 = {
    //   a: 1
    // };
    // const o2 = {
    //   a: 2,
    //   b: 2
    // };

    // const o = Object.assign({}, o1, o2);
    // console.log(o);

    // const s = new Set();

    // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    // for (let i of s) {
    //   console.log(i);
    // }

    // function* foo() {}
    // console.log(foo);
    // let {a, b}: {a: number, b: string} = {a: 123, b: 'yy'};
    // console.log(a, b);
    // let o = {
    //   a: 123,
    //   b: 'yy'
    // };
  }
  public render() {
    return (
      <div className="App">
        <img src={logo} alt="" className="App_logo" />
        <br />
        {/* <button onClick={this.handler}>get</button>
        <button onClick={this.lodashHr}>lodash</button> */}
      </div>
    );
  }
}

export default App;
