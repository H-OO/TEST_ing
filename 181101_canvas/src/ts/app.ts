// http://3gimg.qq.com/mig_market/activity/act/h/img/img_0.jpg

const cvs: HTMLCanvasElement = document.createElement('canvas'); // 创建画布
const ctx: CanvasRenderingContext2D = cvs.getContext('2d'); // 2d环境

// 创建图片
const img: HTMLImageElement = new Image();
img.crossOrigin = 'anonymous'; // 图片跨域处理
img.addEventListener(
  'load',
  () => {
    // 图片宽高
    const {
      width: imgW,
      height: imgH
    }: { width: number; height: number } = img;
    ctx.drawImage(img, 0, 0, imgW, imgH); // 绘制到画布
    const imgData: ImageData = ctx.getImageData(0, 0, imgW, imgH); // 获取图片像素信息
    // console.log(imgData);
    const { data: dataArr }: { data: Uint8ClampedArray } = imgData; // 一维数组，每个像素点的RGBA [R0,G0,B0,A0,R1,G1,B1,A1,...]
    console.log(dataArr);
    // 获取第x行第y列的像素格子位置：pos = (x - 1) * img.width + (y - 1)
    // R: pos * 4
    // G: pos * 4 + 1
    // B: pos * 4 + 2
    // A: pos * 4 + 3
    
  },
  false
);
img.src = 'http://3gimg.qq.com/mig_market/activity/act/h/img/img_0.jpg';
