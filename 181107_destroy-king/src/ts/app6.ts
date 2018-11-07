/**
 * 适配器
 */
interface I_Adapter {
  computed: (planW: number, planH: number) => I_Adapter_computed_msg;
}
interface I_Adapter_ctor {
  planW: number; // 设计稿宽度
  planH: number; // 设计稿高度
}
interface I_Adapter_computed_msg {
  planW: number; // 设计稿宽
  planH: number; // 设计稿高
  viewW: number; // 可视区宽
  viewH: number; // 可视区高
  zoomPlanW: number; // 缩放后设计稿宽
  zoomPlanH: number; // 缩放后设计稿高
  cut: number; // 上/下裁剪量
}
class Adapter implements I_Adapter {
  public msg: I_Adapter_computed_msg;
  constructor(arg: I_Adapter_ctor) {
    // 接收设计稿宽高
    const { planW, planH } = arg;
    const msg = this.computed(planW, planH);
    this.msg = msg;
  }
  // 计算裁剪量
  public computed(planW: number, planH: number): I_Adapter_computed_msg {
    // 可视区宽高
    const viewW: number = window.innerWidth;
    const viewH: number = window.innerHeight;
    // 计算等宽缩放比
    const zoomScale: number = viewW / planW;
    // 计算设计稿缩放高
    const zoomPlanH: number = planH * zoomScale;
    // 上/下裁剪量
    const cut: number = -[(zoomPlanH - viewH) / 2];
    // msg
    const msg: I_Adapter_computed_msg = {
      planW,
      planH,
      viewW,
      viewH,
      zoomPlanW: viewW,
      zoomPlanH,
      cut
    };
    return msg;
  }
}

/**
 * 虚拟进度条
 */
interface I_Progress {
  randomPosition: number; // 随机位置
  currentPosition: number; // 当前位置
  timer: any; // 定时器
  pace: number; // 增量 目前只处理 1|10
  runTs: number; // run定时器时间戳
  randomFrom: (min: number, max: number, pace: number) => number; // 随机数区间
  run: (callback: (step: number) => void) => void; // 0 -> 99
  end: (callback: (step: number) => void) => void; // [0, 99] -> 100
}
interface I_Ctor_arg {
  range: Array<number>; // 区间
  pace: number; // 增量
  runTs: number; // run定时器时间戳
}
class Progress implements I_Progress {
  randomPosition: number;
  currentPosition: number;
  timer: any;
  pace: number;
  runTs: number;
  constructor(arg: I_Ctor_arg) {
    const { range, pace = 1, runTs = 3000 }: I_Ctor_arg = arg;
    const [min, max] = range;
    this.randomPosition = this.randomFrom(min, max, pace); // 当前进度为0，获取下个随机进度
    this.pace = pace;
    this.runTs = runTs;
  }
  randomFrom(min: number, max: number, pace?: number): number {
    if (pace === 10) {
      return Math.floor(Math.random() * ((max - min) / 10 + 1) + min / 10) * 10; // 10
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min); // 1
    }
  }
  run(callback: (step: number) => void): void {
    const { randomPosition, pace, runTs }: I_Progress = this;
    const time: number = runTs / (randomPosition / pace); // 定时间隔
    let step: number = 0; // 累加定时器循环次数
    const end: number = pace === 10 ? 90 : 99; // run终点
    clearInterval(this.timer);
    // 随机位置定时器
    this.timer = setInterval(() => {
      step += pace;
      this.currentPosition = step;
      // console.log('step++');
      callback(step);
      // 当随机位置，但资源未加载完毕时
      if (step === randomPosition) {
        // console.log('-> 缓动');
        clearInterval(this.timer); // 清除第一段随机位置定时器
        // 缓动位置定时器
        this.timer = setInterval(() => {
          step += pace;
          this.currentPosition = step;
          // console.log('step++');
          callback(step);
          if (step === end) {
            clearInterval(this.timer); // 清除缓动效果定时器
            // console.log('[90]');
          }
        }, 3000);
      }
    }, time);
    // 2s内 从 0-> position
  }
  end(callback: (step: number) => void): void {
    // 异步资源加载完毕，打断定时器
    const { currentPosition = 0, pace }: I_Progress = this;
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
      step += pace;
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

// 逻辑区
const video1 = 'http://3gimg.qq.com/mig_market/activity/act/h/video/destroy-king_loading_part1_test.mp4';
const video2 = 'http://3gimg.qq.com/mig_market/activity/act/h/video/destroy-king_loading_part2_test.mp4';

const loadingNode: HTMLElement = document.querySelector('.loading');
const part1Box: HTMLElement = document.querySelector('.part1');
const part2Box: HTMLElement = document.querySelector('.part2');
const part1Video: HTMLVideoElement = document.querySelector('.part1-video');
const part2Video: HTMLVideoElement = document.querySelector('.part2-video');

let part2CanPlay = false; // 默认为false

/**
 * loading
 */
const progress = new Progress({
  range: [50, 70],
  pace: 10,
  runTs: 5000
});
progress.run((step: number) => {
  // console.log(step);
  loadingNode.innerHTML = step.toString();
});

/**
 * Part1
 */
part1Video.oncanplay = () => {
  // const w: number = part1Video.videoWidth; // 缩放后设计稿宽
  // const h: number = part1Video.videoHeight; // 缩放后设计稿高
  const w: number = 288; // 缩放后设计稿宽
  const h: number = 640; // 缩放后设计稿高
  const part1Adapter = new Adapter({
    planW: w,
    planH: h
  });
  const { cut }: { cut: number } = part1Adapter.msg;
  part1Video.style.transform = `translateY(${cut}px)`;
  // 进度条：加载完成
  progress.end((step: number) => {
    loadingNode.innerHTML = step.toString(); // → 100
    if (step === 100) {
      loadingNode.innerHTML = '点击播放';
    }
    loadingNode.onclick = () => {
      loadingNode.style.display = 'none'; // 隐藏loading区
      part1Video.play(); // 播放part1Video
    };
  })
};
part1Video.onended = () => {
  console.log('1ended');
  if (!part2CanPlay) {
    return;
  }
  // 点击part1跳转到part2
  part1Video.onclick = () => {
    part1Box.style.display = 'none';
    part2Video.play(); // 播放part2
  };
};
part1Video.src = video1;

/**
 * Part2
 */
part2Video.oncanplay = () => {
  part2CanPlay = true;
  console.log('part2CanPlay');
  // const w: number = part2Video.videoWidth; // 缩放后设计稿宽
  // const h: number = part2Video.videoHeight; // 缩放后设计稿高
  const w: number = 288; // 缩放后设计稿宽
  const h: number = 640; // 缩放后设计稿高
  const part2Adapter = new Adapter({
    planW: w,
    planH: h
  });
  const { cut }: { cut: number } = part2Adapter.msg;
  part2Video.style.transform = `translateY(${cut}px)`;
};
part2Video.onended = () => {
  console.log('2ended');
};
part2Video.src = video2;



/**
 * 测试
 */
const part3Box: HTMLElement = document.querySelector('.part3');
const part3Video: HTMLVideoElement = document.querySelector('.part3-video');
const xhr = new XMLHttpRequest();
xhr.open('GET', video1);
xhr.responseType = 'blob';
// xhr.onprogress = (e) => {
//   if (e.lengthComputable) {
//     if (e.loaded === e.total) {
//       console.log('100');
//     }
//   }
// };
xhr.onload = () => {
  var blob = window.URL.createObjectURL(xhr.response);
  part3Video.src = blob;
  // console.dir(testPart1);
  console.log('part3VideoWidth → ' + part3Video.width);
  console.log('part3VideoHeight → ' + part3Video.height);
  console.dir(part3Video);
};
xhr.send(null);
