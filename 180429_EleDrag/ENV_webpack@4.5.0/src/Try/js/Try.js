import '../scss/Try.scss';
import Drag from 'drag';
import Move from 'move';

const drag0 = new Drag({
  // box: '.parent',
  // target: '.child0',
  target: '.parent',
  limit: false,
  direction: 'horizontal', // [horizontal | vertical | double]
  callback: () => {
    // return;
    const _drag = drag0;
    const {
      offsetLeft,
      offsetTop
    } = _drag.targetDom;
    // 判断是否执行回弹动画
    if (offsetLeft > 0 || offsetLeft < 0) {
      Move['ease']([offsetLeft, 0], 800, function (v) {
        _drag.targetDom.style.left = v + 'px';
      })
    }
  }
});

const drag1 = new Drag({
  // box: '.parent',
  // target: '.child0',
  target: '.parent',
  limit: false,
  direction: 'vertical', // [horizontal | vertical | double]
  callback: () => {
    // return;
    const _drag = drag1;
    const {
      offsetLeft,
      offsetTop
    } = _drag.targetDom;
    // 判断是否执行回弹动画
    if (offsetTop > 0 || offsetTop < 0) {
      Move['ease']([offsetTop, 0], 800, function (v) {
        _drag.targetDom.style.top = v + 'px';
      })
    }
  }
});