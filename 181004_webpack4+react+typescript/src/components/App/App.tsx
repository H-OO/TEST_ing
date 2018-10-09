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
    // 重载
    function handler(param: object): number;
    function handler(param: number): string;
    function handler(param: any): any {
      if (typeof param === 'object') {
        return 123
      } else if (typeof param === 'number') {
        return 'abc'
      }
    }
    const res0 = handler({});
    console.log(res0); // 123
    const res1 = handler(0);
    console.log(res1); // 'abc'
    

    // let suits = ["hearts", "spades", "clubs", "diamonds"];

    // function pickCard(x: any): any {
    //     // Check to see if we're working with an object/array
    //     // if so, they gave us the deck and we'll pick the card
    //     if (typeof x == "object") {
    //         let pickedCard = Math.floor(Math.random() * x.length);
    //         return pickedCard;
    //     }
    //     // Otherwise just let them pick the card
    //     else if (typeof x == "number") {
    //         let pickedSuit = Math.floor(x / 13);
    //         return { suit: suits[pickedSuit], card: x % 13 };
    //     }
    // }
    
    // let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    // let pickedCard1 = myDeck[pickCard(myDeck)];
    // console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
    
    // let pickedCard2 = pickCard(15);
    // console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

    // let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

    // function pickCard(x: { suit: string; card: number }[]): number;
    // function pickCard(x: number): { suit: string; card: number };
    // function pickCard(x: any): any {
    //   console.log('_p_');
      
    //   // Check to see if we're working with an object/array
    //   // if so, they gave us the deck and we'll pick the card
    //   if (typeof x == 'object') {
    //     let pickedCard = Math.floor(Math.random() * x.length);
    //     return pickedCard;
    //   }
    //   // Otherwise just let them pick the card
    //   else if (typeof x == 'number') {
    //     let pickedSuit = Math.floor(x / 13);
    //     return { suit: suits[pickedSuit], card: x % 13 };
    //   }
    // }

    // let myDeck = [
    //   { suit: 'diamonds', card: 2 },
    //   { suit: 'spades', card: 10 },
    //   { suit: 'hearts', card: 4 }
    // ];
    // console.log(pickCard);
    
    // let pickedCard1 = myDeck[pickCard(myDeck)];
    // console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

    // let pickedCard2 = pickCard(15);
    // console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);
    // class Handler {
    //   info: string;
    //   onClickBad(this: Handler, e: Event) {
    //     // oops, used this here. using this callback would crash at runtime
    //     this.info = e.message;
    //   }
    // }
    // let h = new Handler();
    // uiElement.addClickListener(h.onClickBad); // error!

    // class Handler {
    //   info: string;
    //   onClickBad(this: Handler, e: Event) {
    //     // oops, used this here. using this callback would crash at runtime
    //     console.log(e);

    //     this.info = e.message;
    //   }
    // }
    // let h = new Handler();
    // console.log(h);
    // h.onClickBad(Handler);

    // class A {
    //   f() {
    //     console.log(this);
    //   }
    // }
    // const a = new A();
    // console.log(a);
    // a.f();

    // function a(this: void, msg: string) {
    //   console.log(this);
    //   console.log(msg);

    // }
    // a('yy');

    // const foo = () => {
    //   console.log(this);
    // };
    // foo();

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
