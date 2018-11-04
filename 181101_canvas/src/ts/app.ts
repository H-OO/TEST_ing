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
  x?: number;
  y?: number;
}
interface I_img {
  width: number;
  height: number;
}
interface I_particle {
  x: number;
  y: number;
  fillStyle: string;
}

class Particle {
  canvasObj: I_cvsObj;
  imgData: ImageData;
  particles: Array<any>;
  constructor(params: I_ctor_params) {
    const { wrap, imgPath } = params;
    // 第1步：获取容器元素，创建canvas
    const canvasObj: I_cvsObj = this.createCanvas(wrap);
    this.canvasObj = canvasObj;
    // 第2步：创建图片
    this.createImg(imgPath, (img) => {
      this.canvasHr(img);
      this.toParticle();
      this.drawParticle();
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
    this.canvasObj.x = x;
    this.canvasObj.y = y;
  }
  // 粒子化
  toParticle() {

    // 一个像素点 = [R0,G0,B0,A0]
    // 一行第n个
    // 公式 = (n - 1) * 4
    // 第n个像素点的R值：(n - 1) * 4
    // 第n个像素点的G值：(n - 1) * 4 + 1
    // 第n个像素点的B值：(n - 1) * 4 + 2
    // 第n个像素点的A值：(n - 1) * 4 + 3
    
    // 多行第n个
    // 一行10个像素点
    // 获取第22个像素点的RGBA
    // 22 % 10 = 2
    // 获取第m行第n列的像素点
    // 公式 = [(m - 1) * imgW + (n - 1)] * 4
    // 获取第m行第n列像素点的R值：[(m - 1) * imgW + (n - 1)] * 4
    // 获取第m行第n列像素点的G值：[(m - 1) * imgW + (n - 1)] * 4 + 1
    // 获取第m行第n列像素点的B值：[(m - 1) * imgW + (n - 1)] * 4 + 2
    // 获取第m行第n列像素点的A值：[(m - 1) * imgW + (n - 1)] * 4 + 3



    // 粒子化思路：先读取每个像素点的信息，将色值符合要求的保存一部分，绘制到画布上
    // 具体做法：设定每一行和每一列要显示的粒子数，分别是cols和rows，一个粒子代表一个单元格
    // 那么，每一个单元格的宽高就是`imgW/cols`和`imgH/rows`
    // 然后循环每个单元格的第一个像素是否满足像素值的条件，满足就把这个单元格的坐标保存到数组中，用于绘制图案

    const { data, width: imgW, height: imgH }: ImageData = this.imgData;
    const cols: number = 100; // 每一行 100个
    const rows: number = 100; // 每一列 100个
    const len: number = data.length;
    const unitW: number = imgW / cols >> 0; // 单元格宽
    const unitH: number = imgH / rows >> 0; // 单元格宽
    const pos: number = 0; // 数组中的位置
    const { x: startX, y: startY }: I_cvsObj = this.canvasObj; // 绘制时的起点位置
    // 
    // console.log(len, imgW, imgH);
    // console.log(unitW, unitH);
    // 
    // 第mn个： (m - 1) * imgW + (n - 1)
    // const unit = (j * imgH - 1) * imgW + (i - 1);

    // 易混淆点
    // 行 --- 只需知道该像素点处于第几列 |||
    // 列 ||| 只需知道该像素点处于第几行 ---
    const particles: Array<any> = []; // 粒子数组
    this.particles = particles;
    for(let i = 1; i <= cols; i++) {
      for(let j = 1; j <= rows; j++) {
        // i j(1→100)
        // 计算(i, j)在数组中的R的坐标值，乘以单元格宽高，代入(m,n)公式
        // 公式 = [(m - 1) * imgW + (n - 1)] * 4
        // (j * s_height - 1) * image.width + (i * s_width - 1);
        // const pxPos: number = (j - 1) * imgW + (i - 1); // 单元 ???
        // const pxPos: number = (j * unitH - 1) * imgW + (i * unitW - 1); // 单元
        const pxPos: number = (j * unitH - 1) * imgW + (i * unitW - 1); // 单元
        const dataPos: number = pxPos * 4; // r
        // 如果满足色值就填家到粒子数组中
        // console.log(dataPos);
        // rgb(255,169,0)
        // rgb(255,64,133)
        // rgb(0,207,255)
        // rgb(154,188,29)
        if (data[dataPos + 3] > 100) {
          // r > 250
          // (Math.random() - 0.5) * 20  随机偏移量
          const particle: I_particle = {
            x: startX + i * unitW + (Math.random() - 0.5) * 20,
            y: startY + j * unitH + (Math.random() - 0.5) * 20,
            fillStyle: ''
          };
          // 颜色填充区分
          if (data[dataPos + 1] < 175 && data[dataPos + 2] < 10) {
            particle.fillStyle = 'rgb(255,169,0)';
          } else if (data[dataPos + 1] < 75 && data[dataPos + 1] > 50) {
            particle.fillStyle = 'rgb(255,64,133)';
          } else if (data[dataPos + 1] < 195 && data[dataPos + 1] > 175) {
            particle.fillStyle = 'rgb(154,188,29)';
          } else if (data[dataPos + 1] < 220 && data[dataPos + 1] > 190) {
            particle.fillStyle = 'rgb(0,207,255)';
          }
          particles.push(particle); // 符合要求的粒子保存到数组中
        }
      }
    }
    // console.log(particles);
  }
  // 绘制粒子
  drawParticle() {
    const { context: ctx, width: cvsW, height: cvsH}: I_cvsObj = this.canvasObj;
    ctx.clearRect(0, 0, cvsW, cvsH); // 清空画布
    const particles: Array<any> = this.particles; // 粒子数组
    particles.forEach((item: I_particle) => {
      const { x, y, fillStyle }: I_particle = item;
      ctx.fillStyle = fillStyle;
      ctx.fillRect(x, y, 1, 1);
    });
  }
}

const particle = new Particle({
  wrap: '.canvas-box',
  imgPath: '../src/img/isux.png'
});
