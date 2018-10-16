import { start } from "repl";

/**
 * v1.0 支持水平垂直滑动
 */

namespace NS_Tapper {
  export interface I_Tapper {
    wrapper: Element;
    scroller: Element;
    tapStartHr: (event: TouchEvent) => void;
    tapMoveHr: (event: TouchEvent) => void;
    tapEndHr: (event: TouchEvent) => void;
    startX: number;
    startY: number;
    init: () => void;
    system: () => Object;
    todo: (e: Event) => void;
  }
  export interface I_touch {
    clientX?: number;
    clientY?: number;
  }
}

class Tapper implements NS_Tapper.I_Tapper {
  public wrapper: Element;
  public scroller: Element;
  public isMobile: boolean;
  public startX: number;
  public startY: number;
  public moveX: number;
  public moveY: number;
  public constructor(wrapper: Element) {
    this.wrapper = wrapper;
    this.scroller = wrapper.firstElementChild;
    this.tapStartHr = this.tapStartHr.bind(this);
    this.tapMoveHr = this.tapMoveHr.bind(this);
    this.tapEndHr = this.tapEndHr.bind(this);
    this.startX = 0;
    this.startY = 0;
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
  public tapStartHr(event: TouchEvent): void {
    console.log('__Start__');
    // 记录点击位置
    const e: TouchEvent = event;
    const { clientX: x, clientY: y }: NS_Tapper.I_touch = e.touches[0];
    this.startX = x;
    this.startY = y;
  }
  public tapMoveHr(event: TouchEvent): void {
    // 移动跟随
    const e: TouchEvent = event;
    const { clientX: x, clientY: y }: NS_Tapper.I_touch = e.touches[0];
    this.moveX = x;
    this.moveY = y;
    // console.log(this.moveX, this.moveY);
    // console.log(this.startX, this.startY);
    const { startX, moveX }: { startX: number; moveX: number } = this;
    const distance: number = moveX - startX;
    if (distance > 0) {
      // 右滑动
      // console.log(this.scroller.style);
    } else {
      // 左滑动
    }
  }
  public tapEndHr(event: TouchEvent): void {
    console.log('__End__');
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
    // console.log(startX, startY);
    // console.log(moveX, moveY);
    // 重置
    this.startX = 0;
    this.startY = 0;
    this.moveX = 0;
    this.moveY = 0;
  }
  public todo(event: Event): void {
    const e = event as TouchEvent;
    interface I_touches {
      0?: Object;
      length: number;
    }
    const touches: I_touches = e.touches; // 伪数组
    const touche: Object = touches[0];
    if (touche) {
      interface I_touche {
        clientX?: number;
        clientY?: number;
      }
      const { clientX, clientY }: I_touche = touche;
      console.log(clientX, clientY);
    }
  }
}

export default Tapper;
