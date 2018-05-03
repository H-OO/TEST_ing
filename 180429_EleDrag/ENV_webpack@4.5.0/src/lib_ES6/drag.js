/**
 * 通过 position 进行偏移控制，需要使用到 left 与 top 值
 * @param initMsg isObj
 * {
 *   box, // 盒子元素 【可选】 isStr 元素类名或ID或标签名
 *   target, // 进行移动的元素 【必须】 isStr 元素类名或ID或标签名
 *   direction, // 控制拖拽方向 【必须】 [horizontal | vertical | double]
 *   limit, // 是否控制可移动范围 【可选】isBool
 *   callback // 拖拽完毕后的回调函数 【可选】isFunc
 * }
 */
const Drag = function (initMsg) {
  /**
   * 用户参数
   */
  const {
    box, // 可选 isStr
    target, // 必须 isStr
    direction, // 移动方向 isStr
    limit, // 边界限制 isBool
    callback // 回调 isFunc
  } = initMsg;

  // 不传入box元素 默认将document作为盒子元素
  this.boxDom = box ? document.querySelector(box) : document.body; // 盒子元素
  this.targetDom = document.querySelector(target); // 目标元素
  this.direction = direction; // 移动方向

  /**
   * 当前运行环境判断
   */
  // 判断当前设备[pc|web]
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /**
   * 阻止微信默认下拉事件
   */
  // 判断当前是否为微信 是微信需要移除默认的body下拉事件
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
  if (isWeChat) {
    // 解决微信H5下拉黑色来源信息显示对该插件下来事件的影响
    document.body.ontouchmove = function (e) {
      e.preventDefault();
    }
  }

  /**
   * 根据当前环境，动态设置事件名
   */
  let eventStart = null,
    eventIng = null,
    eventEnd = null;
  if (isMobile) {
    eventStart = 'touchstart';
    eventIng = 'touchmove';
    eventEnd = 'touchend';
  } else {
    eventStart = 'mousedown';
    eventIng = 'mousemove';
    eventEnd = 'mouseup';
  }

  /**
   * 用于计算元素下一次出现的位置
   */
  // 目标元素 position left/top width/height
  const targetDomOffset = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  // 鼠标刚按下去的位置坐标
  const enterSite = {
    x: 0,
    y: 0
  };
  // 鼠标移动时的位置坐标
  const moveSite = {
    x: 0,
    y: 0
  };
  // 计算出的目标元素下一个位置坐标
  const targetDomSite = {
    x: 0,
    y: 0
  };
  // 边界大小
  const boundary = {
    left: 0,
    top: 0
  };

  /**
   * 事件处理函数
   */
  let moveEventONOFF = false; // 用于控制pc端的mousemove事件
  let resetFirstEnterSiteX = true; // 重置第一次点击的x坐标判断条件
  let firstEnterSiteX = null; // 第一次点击的x坐标
  const eventStartHandler = e => {
    e.stopPropagation();
    // 目标元素
    const _target = this.targetDom;
    // 获取目标元素的有用信息
    targetDomOffset.left = _target.offsetLeft;
    targetDomOffset.top = _target.offsetTop;
    targetDomOffset.width = _target.offsetWidth;
    targetDomOffset.height = _target.offsetHeight;
    // 获取点击位置的坐标
    enterSite.x = e.clientX || e.targetTouches[0].clientX;
    enterSite.y = e.clientY || e.targetTouches[0].clientY;
    firstEnterSiteX = enterSite.x; // 第一次点击的x坐标，用于移动距离判断
    // 获取边界大小
    boundary.left = this.boxDom.offsetWidth - targetDomOffset.width;
    boundary.top = this.boxDom.offsetHeight - targetDomOffset.height;
    // 开启元素移动模式
    moveEventONOFF = true;
  };
  const eventIngHandler = e => {
    e.stopPropagation();
    // 判断是否开始移动模式
    if (!moveEventONOFF) {
      return;
    }
    // 获取移动中的坐标
    moveSite.x = e.clientX || e.targetTouches[0].clientX;
    moveSite.y = e.clientY || e.targetTouches[0].clientY;
    // 计算出元素下一个位置坐标
    targetDomSite.x = targetDomOffset.left + moveSite.x - enterSite.x;
    targetDomSite.y = targetDomOffset.top + moveSite.y - enterSite.y;
    // 边界控制
    if (limit) {
      if (targetDomSite.x < 0) {
        targetDomSite.x = 0;
      }
      if (targetDomSite.y < 0) {
        targetDomSite.y = 0;
      }
      if (targetDomSite.x > boundary.left) {
        targetDomSite.x = boundary.left;
      }
      if (targetDomSite.y > boundary.top) {
        targetDomSite.y = boundary.top;
      }
    }
    // 根据计算出的坐标让元素进行跟随移动
    if (direction === 'horizontal') {
      if (Math.abs(moveSite.x - firstEnterSiteX) > 50) {
        if (resetFirstEnterSiteX) {
          enterSite.x = moveSite.x;
          // 计算出元素下一个位置坐标
          targetDomSite.x = targetDomOffset.left + moveSite.x - enterSite.x;
          // 关闭重置进入位置坐标状态
          resetFirstEnterSiteX = false;
        }
        this.targetDom.style.left = targetDomSite.x + 'px';
      }
    } else if (direction === 'vertical') {
      this.targetDom.style.top = targetDomSite.y + 'px';
    } else if (direction === 'double') {
      this.targetDom.style.left = targetDomSite.x + 'px';
      this.targetDom.style.top = targetDomSite.y + 'px';
    }
  };
  const eventEndHandler = e => {
    e.stopPropagation();
    callback && callback(); // 拖拽完毕，执行回调
    moveEventONOFF = false; // 关闭元素移动模式
    resetFirstEnterSiteX = true; // 开启重置进入位置坐标状态
  };

  /**
   * 添加事件监听
   */
  const triggerDom = box ? this.targetDom : document.body; // 没有盒子元素，默认以body来触发点击事件
  triggerDom.addEventListener(eventStart, eventStartHandler, false);
  document.body.addEventListener(eventIng, eventIngHandler, false);
  document.body.addEventListener(eventEnd, eventEndHandler, false);

  /**
   * 移除事件监听
   */
  this.removeEventListener = () => {
    triggerDom.removeEventListener(eventStart, eventStartHandler);
    document.body.removeEventListener(eventIng, eventIngHandler);
    document.body.removeEventListener(eventEnd, eventEndHandler);
  };
};

module.exports = Drag;
