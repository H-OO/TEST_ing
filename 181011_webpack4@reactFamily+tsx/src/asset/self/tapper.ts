/**
 * v1.0 支持水平垂直滑动
 */
const movejs = require('../lib/move');
const { default: move } = movejs;

namespace NS_Tapper {
  export interface I_Tapper {
    wrapper: Element;
    scroller: Element;
    index: number;
    isMobile: boolean;
    tapStartHr: (event: TouchEvent) => void;
    tapMoveHr: (event: TouchEvent) => void;
    tapEndHr: (event: TouchEvent) => void;
    startX: number;
    startY: number;
    moveX: number;
    moveY: number;
    distance: number;
    banTap: boolean;
    banEnd: boolean;
    banMouseMove: boolean;
    init: () => void;
    system: () => Object;
  }
  export interface I_touch {
    clientX?: number;
    clientY?: number;
  }
}

class Tapper implements NS_Tapper.I_Tapper {
  public wrapper: HTMLElement;
  public scroller: HTMLElement;
  public index: number;
  public isMobile: boolean;
  public startX: number;
  public startY: number;
  public moveX: number;
  public moveY: number;
  public distance: number;
  public banTap: boolean;
  public banEnd: boolean;
  public banMouseMove: boolean;
  public constructor(wrapper: HTMLElement) {
    // 交互容器
    this.wrapper = wrapper;
    // 滚动容器初始化
    this.scroller = wrapper.firstElementChild as HTMLElement;
    this.scroller.style.transform = 'translate(0, 0)';
    // 当前轮播页
    this.index = 0;
    // 事件私有化
    this.tapStartHr = this.tapStartHr.bind(this);
    this.tapMoveHr = this.tapMoveHr.bind(this);
    this.tapEndHr = this.tapEndHr.bind(this);
    this.startX = 0;
    this.startY = 0;
    // pc需点击后才可触发move事件
    this.banMouseMove = true;
    // 绑定所有监听
    this.init();
  }
  public init(): void {
    /**
     * 判断当前设备，动态添加事件监听
     */
    // 获取设备类型
    interface I_device {
      isTablet?: boolean;
      isPhone?: boolean;
      isAndroid?: boolean;
      isPc?: boolean;
    }
    const device: I_device = this.system();
    // 根据设备动态监听事件类型
    interface I_tapEvent {
      tapstart?: string;
      tapmove?: string;
      tapend?: string;
    }
    const tapEvent: I_tapEvent = {};
    if (device.isAndroid || device.isPhone || device.isTablet) {
      // 移动设备
      this.isMobile = true;
      console.log('移动设备');
      tapEvent.tapstart = 'touchstart';
      tapEvent.tapmove = 'touchmove';
      tapEvent.tapend = 'touchend';
    } else {
      // pc
      this.isMobile = false;
      console.log('pc');
      tapEvent.tapstart = 'mousedown';
      tapEvent.tapmove = 'mousemove';
      tapEvent.tapend = 'mouseup';
    }
    const { tapstart, tapmove, tapend }: I_tapEvent = tapEvent;
    // 需要监听事件的DOM
    const wrapper: Element = this.wrapper;
    wrapper.addEventListener(tapstart, this.tapStartHr, false);
    wrapper.addEventListener(tapmove, this.tapMoveHr, false);
    wrapper.addEventListener(tapend, this.tapEndHr, false);
  }
  public system(): Object {
    const ua: string = window.navigator.userAgent,
      isWindowsPhone: boolean = /(?:Windows Phone)/.test(ua),
      isSymbian: boolean = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid: boolean = /(?:Android)/.test(ua),
      isFireFox: boolean = /(?:Firefox)/.test(ua),
      isChrome: boolean = /(?:Chrome|CriOS)/.test(ua),
      isTablet: boolean =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone: boolean = /(?:iPhone)/.test(ua) && !isTablet,
      isPc: boolean = !isPhone && !isAndroid && !isSymbian;

    interface I_res {
      isTablet: boolean;
      isPhone: boolean;
      isAndroid: boolean;
      isPc: boolean;
    }
    const res: I_res = {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc
    };

    return res;
  }
  public tapStartHr(event: Event): void {
    // console.log('__Start__');
    // 记录点击位置
    if (!this.isMobile) {
      const e: MouseEvent = event as MouseEvent;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.banMouseMove = false;
    } else {
    const e: TouchEvent = event as TouchEvent;
    const { clientX: x, clientY: y }: NS_Tapper.I_touch = e.touches[0];
      this.startX = x;
      this.startY = y;
    }
    this.distance = 0;
  }
  public tapMoveHr(event: Event): void {
    // pc未点击不允许触发move事件
    if (!this.isMobile && this.banMouseMove) {
      return;
    }
    // 移动跟随
    if (!this.isMobile) {
      const e: MouseEvent = event as MouseEvent;
      this.moveX = e.clientX;
      this.moveY = e.clientY;
    } else {
      const e: TouchEvent = event as TouchEvent,
        { clientX: x, clientY: y }: NS_Tapper.I_touch = e.touches[0];
        this.moveX = x;
        this.moveY = y;
    }
    const { startX, moveX }: { startX: number; moveX: number } = this,
      distance: number = moveX - startX,
      { style: scrollerStyle } = this.scroller,
      scrollerCSSStyle: CSSStyleDeclaration = window.getComputedStyle(
        this.scroller
      ),
      currentTranslateX: number = +scrollerCSSStyle.transform
        .match(/[^a-z\(\)]+/)[0]
        .replace(/\s/g, '')
        .split(',')[4], // matrix(1, 0, 0, 1, -15, 0)
      scrollerW: number = this.scroller.clientWidth,
      itemW: number = this.scroller.firstElementChild.clientWidth,
      confineR: number = -(scrollerW - itemW);
    let moveStep: number = currentTranslateX + distance / 20;
    this.distance = distance;
    if (distance > 0) {
      // 右滑动
      if (moveStep > 0) {
        moveStep = 0;
        this.banEnd = true;
      } else {
        this.banEnd = false;
      }
    } else {
      // 左滑动
      if (currentTranslateX <= confineR) {
        moveStep = confineR;
        this.banEnd = true;
      } else {
        this.banEnd = false;
      }
    }
    scrollerStyle.transform = `translateX(${moveStep}px)`; // 跟随手指滑动
  }
  public tapEndHr(event: Event): void {
    if (this.banTap || this.banEnd) {
      return;
    }
    // console.log('__End__');
    // 计算触发值
    const {
      startX,
      startY,
      moveX,
      moveY
    }: {
      startX: number;
      startY: number;
      moveX: number;
      moveY: number;
    } = this;
    // 触发边界值
    const itemW: number = this.scroller.firstElementChild.clientWidth,
      confineVal: number = itemW / 2,
      { style: scrollerStyle } = this.scroller,
      scrollerCSSStyle: CSSStyleDeclaration = window.getComputedStyle(
        this.scroller
      ),
      currentTranslateX: number = +scrollerCSSStyle.transform
        .match(/[^a-z\(\)]+/)[0]
        .replace(/\s/g, '')
        .split(',')[4];
    
    if (Math.abs(this.distance) > confineVal) {
      // 禁止点击
      this.banTap = true;
      const itemLen: number = this.scroller.children.length;
      // 判断左or右轮播
      if (this.startX > this.moveX) {
        // 左轮播
        console.log('左轮播');
        // 从当前位置走完剩余的距离
        // console.log('当前位置 => ' + currentTranslateX);
        // const remain = -(this.index * itemW) -(itemW + currentTranslateX);
        const endPosition: number = -itemW + -(this.index * itemW);
        // console.log(itemW * this.index);
        move['elastic']([currentTranslateX, endPosition], 1000, (v: any) => {
          // console.log(v);
          scrollerStyle.transform = `translateX(${v}px)`;
          if (v === endPosition) {
            this.banTap = false;
          }
        });
        if (this.index < 0) {
          this.index = 0;
        } else {
          this.index++;
        }
      } else {
        // 右轮播
        console.log('右轮播');
        // 从当前位置走完剩余的距离
        // console.log('当前位置 => ' + currentTranslateX);
        // const remain = -(this.index * itemW) -(itemW + currentTranslateX);
        const endPosition: number = itemW + -(this.index * itemW);
        // console.log(itemW * this.index);
        move['elastic']([currentTranslateX, endPosition], 1000, (v: any) => {
          // console.log(v);
          scrollerStyle.transform = `translateX(${v}px)`;
          if (v === endPosition) {
            this.banTap = false;
          }
        });
        // itemLen
        if (this.index > itemLen -1) {
          this.index = itemLen -1;
        } else {
          this.index--;
        }
      }
    } else {
      const endPosition: number = -(this.index * itemW);
      move['elastic']([currentTranslateX, endPosition], 1000, (v: any) => {
        // console.log(v);
        scrollerStyle.transform = `translateX(${v}px)`;
        if (v === endPosition) {
          this.banTap = false;
        }
      });
    }
    // 重置
    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;
    if (!this.isMobile) {
      this.banMouseMove = true;
    }
  }
}

export default Tapper;
