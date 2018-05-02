import '../scss/Try.scss';
import Drag from 'drag';

const p = document.querySelector('.parent');
// const p = document.body;
const c = document.querySelector('.child');
// const c = document.querySelector('.parent');

const drag = new Drag({
  box: '.parent',
  target: '.child',
  direction: 'freedom', // [horizontal | vertical | freedom]
  limit: true,
  callback: () => {
    console.log('执行回调');
  }
});
