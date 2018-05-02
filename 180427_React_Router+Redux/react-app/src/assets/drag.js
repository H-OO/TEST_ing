/**
 * 通过 position 进行偏移控制
 * @param initMsg isObj
 * {
 *  box, // 盒子元素
 *  target, // 进行移动的元素
 *  direction, // 控制拖拽方向
 *  limit, // 是否控制可移动范围
 *  callback // 拖拽完毕后的回调函数
 * }
 */

const drag = function (initMsg) {
  // 两个 DOM 分别为盒子元素和将进行移动的元素
  const {
    box,
    target,
    direction,
    limit,
    callback
  } = initMsg;
  this.box = document.querySelector(box);
  this.target = document.querySelector(target);

  const state = {
    allowMove: false
  };

  // 【pc】
  // 元素 position left/top width/height
  const eleOffset = {
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
  // 元素位置
  const eleSite = {
    x: 0,
    y: 0
  };
  // 边界大小
  const boundary = {
    left: 0,
    top: 0
  };

  // 判断当前设备为[pc|web]
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
   * 为元素添加事件监听
   */

  // 事件处理函数
  const eventStartHandler = e => {
    e.stopPropagation();
    const _target = e.target;
    if (_target.classList[0] !== target.replace(/\.|\#/, '')) {
      return;
    }

    eleOffset.left = _target.offsetLeft;
    eleOffset.top = _target.offsetTop;
    eleOffset.width = _target.offsetWidth;
    eleOffset.height = _target.offsetHeight;

    state.allowMove = true;
    enterSite.x = e.clientX || e.targetTouches[0].clientX;
    enterSite.y = e.clientY || e.targetTouches[0].clientY;
    
    boundary.left = this.box.offsetWidth - eleOffset.width;
    boundary.top = this.box.offsetHeight - eleOffset.height;
  };
  const eventIngHandler = e => {
    e.stopPropagation();

    if (!state.allowMove) {
      return;
    }

    moveSite.x = e.clientX || e.targetTouches[0].clientX;
    moveSite.y = e.clientY || e.targetTouches[0].clientY;

    eleSite.x = eleOffset.left + moveSite.x - enterSite.x;
    eleSite.y = eleOffset.top + moveSite.y - enterSite.y;

    // 边界控制
    if (limit) {
      if (eleSite.x < 0) {
        eleSite.x = 0;
      }
      if (eleSite.y < 0) {
        eleSite.y = 0;
      }
      if (eleSite.x > boundary.left) {
        eleSite.x = boundary.left;
      }
      if (eleSite.y > boundary.top) {
        eleSite.y = boundary.top;
      }
    }
    
    if (direction === 'horizontal') {
      this.target.style.left = eleSite.x + 'px';
    } else if (direction === 'vertical') {
      this.target.style.top = eleSite.y + 'px';
    } else {
      this.target.style.left = eleSite.x + 'px';
      this.target.style.top = eleSite.y + 'px';
    }

  };
  const eventEndHandler = e => {
    e.stopPropagation();
    state.allowMove = false;
    callback(); // 拖拽完毕后的回调
  };

  // 添加事件监听
  this.target.addEventListener(eventStart, eventStartHandler, false);

  document.addEventListener(eventIng, eventIngHandler, false);

  document.addEventListener(eventEnd, eventEndHandler, false);

  // 移除事件监听
  this.removeEventListener = () => {
    this.target.removeEventListener(eventStart, eventStartHandler);
    document.removeEventListener(eventIng, eventIngHandler);
    document.removeEventListener(eventEnd, eventEndHandler);
  };

};

export default drag;