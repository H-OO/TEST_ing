/**
 * 图片粒子化
 * v 0.0.1
 */

interface I_ctor_params {
  wrap: string;
  imgPath: string;
}
interface I_cvsObj {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
}
interface I_img {
  width: number;
  height: number;
}

class Particle {
  canvasObj: I_cvsObj;
  imgData: ImageData;
  constructor(params: I_ctor_params) {
    const { wrap, imgPath } = params;
    // 第1步：获取容器元素，创建canvas
    const canvasObj: I_cvsObj = this.createCanvas(wrap);
    this.canvasObj = canvasObj;
    // 第2步：创建图片
    this.createImg(imgPath, (img) => {
      this.canvasHr(img);
      this.particle();
    });
  }
  // 获取Node
  getEle(name: string): HTMLElement {
    return document.querySelector(name);
  }
  // 创建canvas
  createCanvas(wrap: string): I_cvsObj {
    // 承载容器
    const wrapNode: HTMLElement = this.getEle(wrap);
    // 承载容器宽高
    const wrapW: number = wrapNode.clientWidth;
    const wrapH: number = wrapNode.clientHeight;
    // 创建画布
    const cvs = document.createElement('canvas');
    // 设置画布宽高 默认1:1 (后期优化需考虑设备像素比)
    cvs.width = wrapW;
    cvs.height = wrapH;
    // 获取2d环境
    const ctn2d: CanvasRenderingContext2D = cvs.getContext('2d');
    // 将画布加入容器节点中
    wrapNode.appendChild(cvs);
    // 输出对象
    const cvsObj: I_cvsObj = {
      canvas: cvs,
      context: ctn2d,
      width: wrapW,
      height: wrapH
    };
    return cvsObj;
  }
  // 创建img，当img加载完成执行回调
  createImg(imgPath: string, callback?: (img: HTMLImageElement) => void, isCrossOrigin: boolean = false) {
    const img: HTMLImageElement = new Image();
    if (isCrossOrigin) {
      img.crossOrigin = ''; // 跨域资源
    }
    img.onload = () => {
      callback && callback(img);
    };
    img.src = imgPath;
  }
  // draw & get
  canvasHr(img: HTMLImageElement) {
    const { context, width: cvsW, height: cvsH }: I_cvsObj = this.canvasObj;
    const { width: imgW, height: imgH }: I_img = img;
    const x = Math.abs(cvsW - imgW) / 2;
    const y = Math.abs(cvsH - imgH) / 2;
    context.drawImage(img, x, y, imgW, imgH); // 将图片绘制到画布上
    const imgData: ImageData = context.getImageData(x, y, imgW, imgH); // 获取画布上的像素数组
    this.imgData = imgData;
  }
  // 粒子化
  particle() {
    const { data }: { data: Uint8ClampedArray } = this.imgData;
    console.log(data);
  }
}

const particle = new Particle({
  wrap: '.canvas-box',
  imgPath: '../src/img/isux.png'
});
