import { isArray } from 'util';

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
    scrollerW: number;
    startX: number;
    moveX: number;
    enterTime: number;
    leaveTime: number;
    banEndEvent: boolean;
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
  scrollerW: number; // 滚动容器的宽度
  startX: number; // 手指初次点击的x坐标
  moveX: number; // 手指移动中的x坐标
  enterTime: number; // 手指初次点击时的时间戳
  leaveTime: number; // 手指离开时的时间戳
  banEndEvent: boolean = true; // 默认点击未移动时禁止end事件

  // distance: number; // 偏移距离(手指离开时计算)
  // index: number; // 默认轮播位置
  // banMoveEvent: boolean; // 是否禁止滑动(动画过程中需禁止)
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
    this.scrollerW = scrollerW;
    scrollerStyle.width = scrollerW + 'px'; // 初始化 scroller 的宽度
    scrollerStyle.transform = `translateX(${-this.itemW}px)`; // 初始化 scroller 水平方向的默认偏移(默认向左偏移一个子容器的宽度)
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
      currentTranslateX: number = +scrollerCSSStyle.transform
        .match(/[^a-z\(\)]+/)[0]
        .replace(/\s/g, '')
        .split(',')[4];
    // 计算新的 translateX
    let nextTranslateX: number = currentTranslateX + distance / 15;
    console.log(nextTranslateX);
    // 跟随
    scrollerStyle.transform = `translateX(${nextTranslateX}px)`; // 跟随手指滑动
  }
  touchEndHr(e: TouchEvent): void {
    if (this.banEndEvent) {
      // 未移动前禁止end事件
      return;
    }
    const { timeStamp: leaveTime }: NS_Tapper.I_event = e,
      { startX, moveX, enterTime }: NS_Tapper.I_Tapper = this,
      distance = moveX - startX; // 计算手指滑动距离 [→ + | ← -]
    if (distance > 0) {
      console.log('→');
    } else if (distance < 0) {
      console.log('←');
    }
    /**
     * 开闭原则状态重置回默认状态
     */
    this.banEndEvent = true; // 默认禁止end事件
  }
}

export default Tapper;
