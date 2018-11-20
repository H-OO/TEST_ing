console.log('v1.0.3');
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
    const time: number = 1000 / (rest / pace); // 定时器时间
    // console.log(time);
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
  '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/video/part1_181117_1.33.mp4';
const video2 =
  '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/video/part2_181120_5.13.mp4';
// loading
const loadingNode: HTMLElement = document.querySelector('.loading');
const loadingProgressNode: HTMLElement = document.querySelector(
  '.loading__progress'
);
// warning
const warningNode: HTMLElement = document.querySelector('.warning');
const warningGoNode: HTMLElement = document.querySelector('.warning_go');
const warningFps: HTMLElement = document.querySelector('.warning_fps');
// const warningIcon: HTMLElement = document.querySelector('.warning_icon');
const warningCheck: HTMLElement = document.querySelector('.warning_check');
// part1
const part1Box: HTMLElement = document.querySelector('.part1');
const part1Logo: HTMLElement = document.querySelector('.part1_logo');
const part1GoNode: HTMLElement = document.querySelector('.part1_go');
const part1Video: HTMLVideoElement = document.querySelector('.part1-video');
// part2
const part2Box: HTMLElement = document.querySelector('.part2');
const part2Video: HTMLVideoElement = document.querySelector('.part2-video');
const part2Weal: HTMLVideoElement = document.querySelector('.part2_weal');
const part2Go: HTMLVideoElement = document.querySelector('.part2_go');
// progress
const progress_1: HTMLVideoElement = document.querySelector(
  '.loading__progress_1'
);
const progress_2: HTMLVideoElement = document.querySelector(
  '.loading__progress_2'
);
// BGM
const bgm1: HTMLAudioElement = document.querySelector('.bgm_1'); // 帧背景音
const bgmJoin: HTMLAudioElement = document.querySelector('.bgm_join'); // 衔接音效
const bgm2: HTMLVideoElement = document.querySelector('.bgm_2'); // 视频背景音
// light
const light: HTMLDivElement = document.querySelector('.light'); // 白光

let part2CanPlay = false; // 默认为false

let fileLoadCount: number = 0; // 本次资源warning+part1+part2 === 3 开始运作
// let fileFinish: number = 3; // 资源数

// test ↓↓↓
let fileFinish: number; // 资源数
const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
if (isAndroid) {
  fileFinish = 4; // bgm2
  /**
   * BGM2 mp4 onload
   */
  const bgm2_xhr = new XMLHttpRequest();
  bgm2_xhr.open(
    'GET',
    '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/audio/bgm_2_181117_t.mp4'
  );
  bgm2_xhr.responseType = 'blob';
  bgm2_xhr.onload = () => {
    console.log('bgm2_mp4 onload');
    const blob = window.URL.createObjectURL(bgm2_xhr.response);
    bgm2.src = blob;
    // 判断资源是否就位
    fileLoadCount++;
    if (fileLoadCount === fileFinish) {
      fileFinishCallback();
    }
  };
  bgm2_xhr.send(null);
} else {
  fileFinish = 3;
}
// test ↑↑↑

let warningGoOnce: boolean = false; // warningGo只允许点击一次

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
        setTimeout(() => {
          // warningIcon.classList.add('warning_icon_animation');
          warningCheck.classList.add('warning_check_animation');
        }, 3800);
        loadingNode.style.display = 'none'; // 隐藏loading区
        warningFps.className += ' warning_fps_animation'; // warning播放帧动画
        warningGoNode.onclick = () => {
          console.log('sdi → 立即查看 参与1');
          _sdi && _sdi.stat({ ptype: '2', stype: '1' }); // 参与1
          // 
          if (warningGoOnce) {
            return;
          }
          warningGoOnce = true; // 关闭回调执行入口
          const u = navigator.userAgent;
          const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          if (isAndroid) {
            // Android设备
            bgm1.pause(); // 暂停bgm1
            bgmJoin.play(); // 衔接音效
            part1Video.play(); // 播放part1
            bgm2.play(); // 播放bgm
            // bgm2.pause();
            // 处理兼容问题 等待音效播放完毕 替换mp4作为背景音输出
            setTimeout(() => {
              bgmJoin.src = ''; // 暂停衔接音效
              // bgm2.play(); // 播放bgm2
              // part1Video.play(); // 播放video1
              warningNode.style.display = 'none'; // 隐藏warning区
            }, 800);
          } else {
            // iOS设备
            const isWx = (/micromessenger/i).test(navigator.userAgent);
            // 非微信环境
            if (!isWx) {
              bgm1.play(); // 播放mp3
            }
            part1Video.play(); // 播放part1Video
            setTimeout(() => {
              warningNode.style.display = 'none'; // 隐藏warning区
            }, 800)
          }
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
  range: [30, 50],
  pace: 10,
  runTs: 10000
});
progress.run((step: number) => {
  // console.log('run → ' + step);
  const actionClassName_Number = step / 10 + '';
  // console.log(actionClassName_Number);
  progress_2.className = `loading__progress_2 loading__progress_number_${actionClassName_Number}`;
});

/**
 * wx ready
 * 背景音
 */
// wx && wx.config({
//   // 配置信息, 即使不正确也能使用 wx.ready
//   debug: false,
//   appId: 'gh_1a8c118653f8',
//   timestamp: 1,
//   nonceStr: '',
//   signature: '',
//   jsApiList: []
// });
// wx && wx.ready(function() {
//   var bgm1 = document.querySelector('.bgm_1'); // 帧背景音
//   bgm1.play(); // 播放背景音
// });

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

/**
 * warning_fps
 */
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
    'warning(35).jpg',
    'warning(36).jpg',
    'warning(37).jpg',
    'warning(38).jpg',
    'warning(39).jpg',
    'warning(40).jpg',
    'warning(41).jpg'
  ],
  () => {
    // console.log('warning_xhr_onload');
    fileLoadCount++;
    if (fileLoadCount === fileFinish) {
      fileFinishCallback(); // 资源就位
    }
  },
  '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/img/warning/'
);

// console.log(warningFps);
const w: number = 750; // 缩放后设计稿宽
const h: number = 1624; // 缩放后设计稿高
const warningAdapter = new Adapter({
  planW: w,
  planH: h
});
const { cut }: { cut: number } = warningAdapter.msg;
warningFps.style.backgroundPosition = `0 ${cut}px`; // warning适配
// warningIcon.style.backgroundPosition = `0 ${cut}px`; // icon容器适配
warningCheck.style.backgroundPosition = `0 ${cut}px`; // check容器适配
part2Weal.style.backgroundPosition = `0 ${cut}px`; // 福利按钮容器适配

/**
 * Part1
 */
part1Video.onended = () => {
  // console.log('1ended');
  if (!part2CanPlay) {
    return;
  }
  // logo循环缩放
  part1Logo.classList.add('part1_logo_animation');
  // 点击part1跳转到part2
  part1GoNode.onclick = () => {
    console.log('sdi → 点击logo 按钮1');
    _sdi && _sdi.stat({ ptype: '7', stype: '1' }); // 按钮1
    // 
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if (isAndroid) {
      part1Video.src = ''; // 清除part1
      part1Box.style.display = 'none'; // 隐藏part1
      light.classList.toggle('ad'); // 直接白屏遮罩
      part2Video.play(); // 播放part2
      setTimeout(() => {
        light.classList.toggle('ad'); // 隐藏白光效果
      }, 500);
    } else {
      light.classList.toggle('action'); // 开启白光效果
      part2Video.play(); // 播放part2
      setTimeout(() => {
        light.classList.toggle('action'); // 隐藏白光效果
        part1Box.style.display = 'none'; // 隐藏part1
      }, 800);
    }
    // 领取福利按钮绑定事件
    setTimeout(() => {
      part2Go.onclick = () => {
        console.log('sdi → 去领福利 转化1');
        _sdi && _sdi.stat({ ptype: '4', stype: '1' }); // 转化1
        // 
        // console.log('跳转路径...');
        const jumpPath =
          '//sdi.3g.qq.com/v/2018111216374111578?sdi_from=16';
        window.location.href = jumpPath;
      };
    }, 16500);
  };
};
// part1 onload
const part1_xhr = new XMLHttpRequest();
part1_xhr.open('GET', video1);
part1_xhr.responseType = 'blob';
part1_xhr.onload = () => {
  // console.log('part1_xhr_onload');
  // 加载完毕
  const blob = window.URL.createObjectURL(part1_xhr.response);
  part1Video.src = blob;
  //
  // const w: number = part1Video.videoWidth; // 缩放后设计稿宽
  // const h: number = part1Video.videoHeight; // 缩放后设计稿高
  const w: number = 750; // 缩放后设计稿宽
  const h: number = 1624; // 缩放后设计稿高
  const part1Adapter = new Adapter({
    planW: w,
    planH: h
  });
  const { cut }: { cut: number } = part1Adapter.msg;
  part1Video.style.transform = `translateY(${cut}px)`;
  // 判断资源是否就位
  fileLoadCount++;
  if (fileLoadCount === fileFinish) {
    fileFinishCallback();
  }
};
part1_xhr.send(null);

// logo
const logoPlanW: number = 750; // 缩放后设计稿宽
const logoPlanH: number = 1624; // 缩放后设计稿高
const warningLogoAdapter = new Adapter({
  planW: logoPlanW,
  planH: logoPlanH
});
const { cut: logoCut }: { cut: number } = warningLogoAdapter.msg;
part1Logo.style.backgroundPosition = `0 ${logoCut}px`; // part1_logo容器适配

/**
 * Part2
 */
part2Video.onended = () => {
  // console.log('2ended');
  // 福利按钮循环帧
  part2Weal.classList.add('part2_weal_animation');
};
// part2 onload
const part2_xhr = new XMLHttpRequest();
part2_xhr.open('GET', video2);
part2_xhr.responseType = 'blob';
part2_xhr.onload = () => {
  // console.log('part2_xhr_onload');
  // 加载完毕
  const blob = window.URL.createObjectURL(part2_xhr.response);
  part2Video.src = blob;
  //
  part2CanPlay = true;
  // const w: number = part2Video.videoWidth; // 缩放后设计稿宽
  // const h: number = part2Video.videoHeight; // 缩放后设计稿高
  const w: number = 750; // 缩放后设计稿宽
  const h: number = 1624; // 缩放后设计稿高
  const part2Adapter = new Adapter({
    planW: w,
    planH: h
  });
  const { cut }: { cut: number } = part2Adapter.msg;
  part2Video.style.transform = `translateY(${cut}px)`;
  // 判断资源是否就位
  fileLoadCount++;
  if (fileLoadCount === fileFinish) {
    fileFinishCallback();
  }
};
part2_xhr.send(null);
