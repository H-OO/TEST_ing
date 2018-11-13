const device = {
  iPhoneX: {
    name: 'iPhoneX',
    full: [375, 812],
    wx: [375, 724]
  },
  iPhone6: {
    name: 'iPhone6',
    full: [375, 667],
    wx: [375, 603]
  },
  iPhone6sPlus: {
    name: 'iPhone6sPlus',
    full: [414, 736],
    wx: [414, 672]
  },
  main1: {
    name: '非全面屏主流机型',
    full: [360, 640],
    wx: [360, 567]
  }, // 非全面屏主流机型
  mate8: {
    name: '华为mate8',
    full: [360, 640],
    wx: [360, 532]
  } // 华为mate8
};

const _list = {};
const _full = {};
const _wx = {};
for (let k in device) {
  const { name, full, wx } = device[k];
  _list[k] = name;
  _full[k] = full;
  _wx[k] = wx;
}

export const mode = ['微信环境', '全屏环境'];
export const list = _list;
export const full = _full;
export const wx = _wx;
