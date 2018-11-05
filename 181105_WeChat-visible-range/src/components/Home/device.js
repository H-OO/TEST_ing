/**
  微信环境可视区逻辑尺寸:
    iPhoneX 375x724
    iPhone6 → 375x603
    iPhone6sP → 414x672
    非全面屏主流机型 → 360x567
    华为mate8 → 360x532
 */

export const device = {
  iPhoneX: {
    full: [375, 812],
    wx: [375, 724]
  },
  iPhone6: {
    full: [375, 667],
    wx: [375, 603]
  },
  iPhone6sPlus: {
    full: [414, 736],
    wx: [414, 672]
  },
  main1: {
    full: [360, 640],
    wx: [360, 567]
  }, // 非全面屏主流机型
  mate8: {
    full: [360, 640],
    wx: [360, 532]
  } // 华为mate8
};
