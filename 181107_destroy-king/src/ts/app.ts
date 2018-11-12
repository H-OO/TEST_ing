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
const video1 =
  'http://3gimg.qq.com/mig_market/activity/act/h/video/part1_20181109.mp4';
const video2 =
  'http://3gimg.qq.com/mig_market/activity/act/h/video/part2_20181109.mp4';

const loadingNode: HTMLElement = document.querySelector('.loading');
const loadingProgressNode: HTMLElement = document.querySelector(
  '.loading__progress'
);
const warningNode: HTMLElement = document.querySelector('.warning');
const warningGoNode: HTMLElement = document.querySelector('.warning_go');
const warningFps: HTMLElement = document.querySelector('.warning_fps');
const warning_bgm: HTMLAudioElement = document.querySelector('.warning_bgm');
const part1Box: HTMLElement = document.querySelector('.part1');
const part1GoNode: HTMLElement = document.querySelector('.part1_go');
const part2Box: HTMLElement = document.querySelector('.part2');
const part1Video: HTMLVideoElement = document.querySelector('.part1-video');
const part2Video: HTMLVideoElement = document.querySelector('.part2-video');
const progress_1: HTMLVideoElement = document.querySelector(
  '.loading__progress_1'
);
const progress_2: HTMLVideoElement = document.querySelector(
  '.loading__progress_2'
);

let part2CanPlay = false; // 默认为false

let fileFinish: number = 0; // 本次资源warning+part1+part2 === 3 开始运作
function fileFinishCallback() {
  // 进度条：加载完成
  progress.end((step: number) => {
    // console.log('end → ' + step);
    const actionClassName_Number = step / 10 + '';
    // console.log(actionClassName_Number);
    if (step === 100) {
      // loadingNode.innerHTML = '点击播放';
      progress_1.className = 'loading__progress_1 loading__progress_number_1';
      progress_2.className = 'loading__progress_2 loading__progress_number_0';
      setTimeout(() => {
        warning_bgm.play(); // warning背景音播放
        loadingNode.style.display = 'none'; // 隐藏loading区
        warningFps.className += ' warning_fps_animation'; // warning播放帧动画
        warningGoNode.onclick = () => {
          warning_bgm.pause(); // 暂停播放
          part1Video.play(); // 播放part1Video
          warningNode.style.display = 'none'; // 隐藏warning区
        };
      }, 600);
    } else {
      progress_2.className = `loading__progress_2 loading__progress_number_${actionClassName_Number}`;
    }
  });
}

/**
 * loading
 */
const progress = new Progress({
  range: [50, 70],
  pace: 10,
  runTs: 5000
});
progress.run((step: number) => {
  // console.log('run → ' + step);
  const actionClassName_Number = step / 10 + '';
  // console.log(actionClassName_Number);
  progress_2.className = `loading__progress_2 loading__progress_number_${actionClassName_Number}`;
});

/**
 * warning
 */
let warningCache: Array<any>;
function preloadImage(
  names: Array<string>,
  cb: (imgs: any) => void,
  prefix: string
) {
  warningCache = [];
  var n = 0,
    img,
    imgs: any = {};
  names.forEach(function(name) {
    img = new Image();
    warningCache.push(img);
    img.onload = (function(name, img) {
      return function() {
        imgs[name] = img;
        ++n === names.length && cb && cb(imgs);
      };
    })(name, img);
    img.src = (prefix || '') + name;
  });
}

preloadImage(
  [
    'warning(1).jpg',
    'warning(2).jpg',
    'warning(3).jpg',
    'warning(4).jpg',
    'warning(5).jpg',
    'warning(6).jpg',
    'warning(7).jpg',
    'warning(8).jpg',
    'warning(9).jpg',
    'warning(10).jpg',
    'warning(11).jpg',
    'warning(12).jpg',
    'warning(13).jpg',
    'warning(14).jpg',
    'warning(15).jpg',
    'warning(16).jpg',
    'warning(17).jpg',
    'warning(18).jpg',
    'warning(19).jpg',
    'warning(20).jpg',
    'warning(21).jpg',
    'warning(22).jpg',
    'warning(23).jpg',
    'warning(24).jpg',
    'warning(25).jpg',
    'warning(26).jpg',
    'warning(27).jpg',
    'warning(28).jpg',
    'warning(29).jpg',
    'warning(30).jpg',
    'warning(31).jpg',
    'warning(32).jpg',
    'warning(33).jpg',
    'warning(34).jpg',
    'warning(35).jpg'
  ],
  () => {
    console.log('warning_xhr_onload');
    fileFinish++;
    if (fileFinish === 3) {
      fileFinishCallback(); // 资源就位
    }
  },
  'http://3gimg.qq.com/mig_market/activity/act/h/img/warning/'
);

// console.log(warningFps);
const w: number = 750; // 缩放后设计稿宽
const h: number = 1624; // 缩放后设计稿高
const warningAdapter = new Adapter({
  planW: w,
  planH: h
});
const { cut }: { cut: number } = warningAdapter.msg;
warningFps.style.backgroundPosition = `0 ${cut}px`;

/**
 * warning背景音自动播放
 */
// wx.config({
//   // 配置信息, 即使不正确也能使用 wx.ready
//   debug: false,
//   appId: 'gh_1a8c118653f8',
//   timestamp: 1,
//   nonceStr: '',
//   signature: '',
//   jsApiList: []
// });
// wx.ready(function() {
//   // 获取控制权
//   warning_bgm.play();
//   warning_bgm.pause();
// });

/**
 * Part1
 */
part1Video.onended = () => {
  console.log('1ended');
  if (!part2CanPlay) {
    return;
  }
  // 点击part1跳转到part2
  part1GoNode.onclick = () => {
    part2Video.play(); // 播放part2
    part1Box.style.display = 'none';
  };
};
// part1 onload
const part1_xhr = new XMLHttpRequest();
part1_xhr.open('GET', video1);
part1_xhr.responseType = 'blob';
part1_xhr.onload = () => {
  console.log('part1_xhr_onload');
  // 加载完毕
  const blob = window.URL.createObjectURL(part1_xhr.response);
  part1Video.src = blob;
  //
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
  // 判断资源是否就位
  fileFinish++;
  if (fileFinish === 3) {
    fileFinishCallback();
  }
};
part1_xhr.send(null);

/**
 * Part2
 */
part2Video.onended = () => {
  console.log('2ended');
};
// part2 onload
const part2_xhr = new XMLHttpRequest();
part2_xhr.open('GET', video2);
part2_xhr.responseType = 'blob';
part2_xhr.onload = () => {
  console.log('part2_xhr_onload');
  // 加载完毕
  const blob = window.URL.createObjectURL(part2_xhr.response);
  part2Video.src = blob;
  //
  part2CanPlay = true;
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
  // 判断资源是否就位
  fileFinish++;
  if (fileFinish === 3) {
    fileFinishCallback();
  }
};
part2_xhr.send(null);