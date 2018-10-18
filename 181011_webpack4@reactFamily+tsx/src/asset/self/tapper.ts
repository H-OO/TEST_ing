/**
 * v1.1 支持水平手势，回弹、速度计算、常用贝塞尔运动曲线效果
 */

// 运动库
const movejs = require('../lib/move');
const { default: move } = movejs;
// 声明接口
namespace NS_Tapper {
  export interface I_Tapper {
    wrapper: HTMLElement;
    scroller: HTMLElement;
    itemLen: number;
    itemW: number;
    scrollerStyle: CSSStyleDeclaration;
    scrollerW: number;
    startX: number;
    moveX: number;
    enterTime: number;
    leaveTime: number;
    banEndEvent: boolean;
    distance: number;
    currentTranslateX: number;
    index: number;
    banMoveEvent: boolean;
    siteBox: HTMLElement;
    getSiteIndex: (index: number, itemLen: number) => number;
  }
  export interface I_event {
    timeStamp?: number;
    touches?: TouchList;
  }
}
class Tapper implements NS_Tapper.I_Tapper {
  wrapper: HTMLElement; // 交互容器
  scroller: HTMLElement; // 滚动容器
  itemLen: number; // 子容器数量
  itemW: number; // 子容器的宽度
  scrollerStyle: CSSStyleDeclaration; // 滚动容器style属性
  scrollerW: number; // 滚动容器的宽度
  startX: number; // 手指初次点击的x坐标
  moveX: number; // 手指移动中的x坐标
  enterTime: number; // 手指初次点击时的时间戳
  leaveTime: number; // 手指离开时的时间戳
  banEndEvent: boolean = true; // 默认点击未移动时禁止end事件
  distance: number; // 偏移距离(手指离开时计算)
  currentTranslateX: number; // 滚动容器当前的 translateX 值
  index: number = 1; // 默认轮播位置
  banMoveEvent: boolean = false; // 默认不禁止滑动(当动画过程中需禁止)
  siteBox: HTMLElement; // 下标指示器
  constructor(arg: HTMLElement) {
    /**
     * 实例私有方法
     */
    this.touchStartHr = this.touchStartHr.bind(this);
    this.touchMoveHr = this.touchMoveHr.bind(this);
    this.touchEndHr = this.touchEndHr.bind(this);
    /**
     * 初始化
     */
    const wrapper: HTMLElement = arg;
    this.wrapper = wrapper;
    const scroller: HTMLElement = wrapper.firstElementChild as HTMLElement;
    this.scroller = scroller;
    this.itemW = scroller.children[0].clientWidth;
    const firstNode = scroller.firstElementChild.cloneNode(true), // 克隆 scroller 首节点
      lastNode = scroller.lastElementChild.cloneNode(true); // 克隆 scroller 末节点
    scroller.appendChild(firstNode); // 将克隆的首节点追加到scroller
    scroller.insertBefore(lastNode, scroller.firstElementChild); // 将克隆的末节点插入scroller作为首节点
    this.itemLen = scroller.children.length; // 当前子容器数量
    const scrollerStyle: CSSStyleDeclaration = scroller.style, // scroller style 对象
      scrollerW: number = this.itemLen * this.itemW; // scroller 的宽度
    this.scrollerStyle = scrollerStyle;
    this.scrollerW = scrollerW;
    scrollerStyle.width = scrollerW + 'px'; // 初始化 scroller 的宽度
    scrollerStyle.transform = `translateX(${-this.itemW}px) translateZ(0)`; // 初始化 scroller 水平方向的默认偏移(默认向左偏移一个子容器的宽度)
    // 下标指示器
    this.siteBox = wrapper.lastElementChild as HTMLElement;
    /**
     * 交互容器绑定事件
     */
    wrapper.addEventListener('touchstart', this.touchStartHr, false);
    wrapper.addEventListener('touchmove', this.touchMoveHr, false);
    wrapper.addEventListener('touchend', this.touchEndHr, false);
  }
  touchStartHr(e: TouchEvent): void {
    const { timeStamp, touches }: NS_Tapper.I_event = e;
    this.enterTime = timeStamp; // 记录点击时的时间戳
    const { clientX: x } = touches[0];
    this.startX = x; // 记录点击位置的x坐标
  }
  touchMoveHr(e: TouchEvent): void {
    // 是否禁止滑动
    if (this.banMoveEvent) {
      return;
    }
    const { touches }: NS_Tapper.I_event = e,
      { clientX: x } = touches[0];
    this.moveX = x; // 记录移动中的x坐标
    this.banEndEvent = false; // 允许end事件
    const { startX }: NS_Tapper.I_Tapper = this,
      // 计算手指滑动距离
      distance: number = x - startX,
      // scroller style 对象
      { style: scrollerStyle }: { style?: CSSStyleDeclaration } = this.scroller,
      // scroller 计算样式
      scrollerCSSStyle: CSSStyleDeclaration = window.getComputedStyle(
        this.scroller
      ),
      // scroller 的宽度
      scrollerW: number = this.scrollerW,
      // 当前scroller的 translateX
      lastTranslateX: number = +scrollerCSSStyle.transform
        .match(/[^a-z\(\)]+/)[0]
        .replace(/\s/g, '')
        .split(',')[4];
    this.distance = distance; // 记录手指滑动距离
    // 计算新的 translateX
    let currentTranslateX: number = lastTranslateX + distance / 12;
    this.currentTranslateX = currentTranslateX; // 记录 scroller 当前的 translateX 值
    // 跟随
    scrollerStyle.transform = `translateX(${currentTranslateX}px) translateZ(0)`; // 跟随手指滑动
  }
  touchEndHr(e: TouchEvent): void {
    if (this.banEndEvent) {
      // 未移动前禁止end事件
      return;
    }
    const { timeStamp: leaveTime }: NS_Tapper.I_event = e,
      {
        enterTime,
        distance,
        currentTranslateX,
        itemW,
        scrollerStyle,
        itemLen,
        siteBox,
        getSiteIndex
      }: NS_Tapper.I_Tapper = this;
    // console.log('distance => ' + distance);
    // console.log('currentTranslateX => ' + currentTranslateX);
    // console.log(Math.abs(currentTranslateX) - itemW * index);
    // 当前子容器的偏移距离
    const currentStep: number = Math.abs(
      Math.abs(currentTranslateX) - itemW * this.index
    );
    // 满足手指滑动步长可触发滚动
    const triggerStep: number = itemW / 2;
    // 满足滑动速度可触发滚动 >0.3
    const moveSpeed: number = Math.abs(distance) / (leaveTime - enterTime);
    // console.log('滑动速度 => ' + moveSpeed);
    const scrollerLastIndex = this.index; // scroller上一次的index
    // 最终位置
    let endPosition: number;
    // 判断触发滚动or回弹
    if (currentStep >= triggerStep || moveSpeed > 0.3) {
      // 滚动
      // 根据滑动方向走完剩余步长 [→ + | ← -]
      if (distance < 0) {
        // console.log('←');
        endPosition = -(++this.index * itemW);
      } else if (distance > 0) {
        // console.log('→');
        endPosition = -(--this.index * itemW);
      }
      /** 
       * 下标指示器
       */
      const siteLastIndex: number = getSiteIndex(scrollerLastIndex, itemLen); // 指示器上一次高亮下标
      const siteCurrentIndex: number = getSiteIndex(this.index, itemLen); // 指示器当前高亮下标
      siteBox.children[siteLastIndex].classList.remove('action'); // 移除高亮
      siteBox.children[siteCurrentIndex].classList.add('action'); // 高亮
    } else {
      // 回弹
      endPosition = -(this.index * itemW); // 哪也不去
    }
    // 禁止滑动事件被触发
    this.banMoveEvent = true;
    // 运动曲线 ease elastic
    move['ease']([currentTranslateX, endPosition], 600, (v: any) => {
      scrollerStyle.transform = `translateX(${v}px) translateZ(0)`;
      if (v === endPosition) {
        // 判断当前是否在最首or最末
        if (this.index === itemLen - 1) {
          scrollerStyle.transform = `translateX(${-itemW}px) translateZ(0)`; // 闪动 4 => 1 [0][1|2|3][4]
          this.index = 1; // 当前下标位置
        } else if (this.index === 0) {
          const toIndex: number = itemLen - 2; // 对应下标
          scrollerStyle.transform = `translateX(${-(itemW * toIndex)}px) translateZ(0)`; // 闪动 0 => 3
          this.index = toIndex; // 当前下标位置
        }
        this.banMoveEvent = false; // 允许滑动事件
      }
    });
    /**
     * 开闭原则状态重置回默认状态
     */
    this.banEndEvent = true; // 默认禁止end事件
  }
  getSiteIndex(index: number, itemLen: number): number {
    if (index === 1 || index === itemLen - 1) {
      // 4 & 1 => 0
      index = 0;
    } else if (index === 0 || index === itemLen - 2) {
      // 0 & 3 => 2
      index = itemLen - 2 - 1;
    } else {
      // [1|2|3] => [0|1|2]
      index--;
    }
    return index;
  }
}

export default Tapper;
