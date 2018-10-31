/**
 * 虚拟效果进度条
 * 获取随机进度 `[60, 80]`
 * Math.random() => [0,1)
 * 定时器可到达终点为`99%`
 * 异步资源加载完毕可重当前位置继续走完 时间为`1s`
 * ------------------------
 * @class Progress
 * @member run 方法进行一段冲刺，再缓慢增加，终点 99 (异步请求发出时)
 * @member end 方法在当前位置快速直达终点 100 (异步请求成功后)
 * run & end 都会将当前的进度返回，在回调函数用一个参数进行接收
 */

interface I_Progress {
  randomPosition: number; // 随机位置
  currentPosition: number; // 当前位置
  timer: any; // 定时器
  randomFrom: (min: number, max: number) => number; // 随机数区间
  run: (callback: (step: number) => void) => void; // 0 -> 99
  end: (callback: (step: number) => void) => void; // [0, 99] -> 100
}
interface I_Ctor_arg {
  range: Array<number>;
}
class Progress {
  randomPosition: number;
  currentPosition: number;
  timer: any;
  constructor(arg: I_Ctor_arg) {
    const { range }: I_Ctor_arg = arg;
    const [min, max] = range;
    this.randomPosition = this.randomFrom(min, max); // 当前进度为0，获取下个随机进度
  }
  randomFrom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  run(callback: (step: number) => void): void {
    const { randomPosition }: { randomPosition: number } = this;
    // console.log(randomPosition);
    const time = 2000 / (randomPosition - 0); // 定时器时间
    let step: number = 0; // 累加定时器循环次数
    clearInterval(this.timer);
    // 随机位置定时器
    this.timer = setInterval(() => {
      step++;
      this.currentPosition = step;
      // console.log('step++');
      callback(step);
      // 当随机位置，但资源未加载完毕时
      if (step === randomPosition) {
        // console.log('-> 缓动');
        clearInterval(this.timer); // 清除第一段随机位置定时器
        // 缓动位置定时器
        this.timer = setInterval(() => {
          step++;
          this.currentPosition = step;
          // console.log('step++');
          callback(step);
          if (step === 99) {
            clearInterval(this.timer); // 清除缓动效果定时器
            // console.log('[99]');
          }
        }, 2000);
      }
    }, time);
    // 2s内 从 0-> position
  }
  end(callback: (step: number) => void): void {
    // 异步资源加载完毕，打断定时器
    const { currentPosition }: { currentPosition: number } = this;
    // 100 拦截
    if (currentPosition === 100) {
      // console.log('end');
      return;
    }
    clearInterval(this.timer); // 打断前往 randomPosition 的行为
    const rest: number = 100 - currentPosition; // 剩余部分
    const time: number = 1000 / rest; // 定时器时间
    let step: number = currentPosition; // 累加定时器循环次数
    this.timer = setInterval(() => {
      step++;
      // console.log('step++');
      callback(step);
      if (step === 100) {
        clearInterval(this.timer);
        this.currentPosition = step;
        // console.log('[100]');
      }
    }, time);
  }
}

const progress = new Progress({
  range: [60, 80]
});
progress.run((step: number) => {
  console.log(step);
});

// 模拟异步资源加载完成后
document.body.addEventListener(
  'click',
  () => {
    progress.end((step: number) => {
      console.log(step);
      if (step === 100) {
        console.log('play..');
      }
    });
  },
  false
);
