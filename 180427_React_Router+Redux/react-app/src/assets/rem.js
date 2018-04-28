/**
 * rem自适应
 * 设备基准宽度375px html字体100px body字体16px
 */
const rem = () => {
  const _doc = document;
  _doc.querySelector('body').style.fontSize = '16px';
  const w = window.innerWidth;
  const fontSize = w / 375 * 100;
  _doc.querySelector('html').style.fontSize = fontSize + 'px';
}

export default rem;
