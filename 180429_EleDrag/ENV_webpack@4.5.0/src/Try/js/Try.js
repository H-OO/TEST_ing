import '../scss/Try.scss';
import Drag from 'drag';
import Move from 'move';

// 双向拖拽实现例子
const Move_ONOFF = [true, true];
const drag0 = new Drag({
  target: document.querySelector('.parent'),
  direction: 'double',
  callback: params => {
    const _drag = drag0; // 拖拽实例
    const {
      x,
      y
    } = params;
    const site = {
      x: 0,
      y: 0
    };
    if (Move_ONOFF[0]) {
      Move_ONOFF[0] = false;
      Move['ease']([x, 0], 800, (v) => {
        site.x = v;
        _drag.targetDom.style.transform = `translate(${site.x}px, ${site.y}px)`;
      }, () => {
        console.log('x方向动画结束');
        Move_ONOFF[0] = true;
      })
    }
    if (Move_ONOFF[1]) {
      Move_ONOFF[1] = false;
      Move['ease']([y, 0], 800, (v) => {
        site.y = v;
        _drag.targetDom.style.transform = `translate(${site.x}px, ${site.y}px)`;
      }, () => {
        console.log('y方向动画结束');
        Move_ONOFF[1] = true;
      })
    }
  }
});