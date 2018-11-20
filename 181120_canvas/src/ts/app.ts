// 获取画布
const cvs: HTMLCanvasElement = document.querySelector('#myCanvas');
// 获取绘制上下文环境
const ctx: CanvasRenderingContext2D = cvs.getContext('2d');

// part1
ctx.fillStyle = 'rgb(200, 0, 0)'; // 填充色
ctx.fillRect(0, 0, 100, 100); // 绘制一个矩形

// part2
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'; // 填充色
ctx.fillRect(20, 20, 150, 150); // 绘制一个矩形

// clear
ctx.clearRect(0, 0, 50, 50);

// part3
ctx.fillStyle = 'rgb(0, 200, 0)';
ctx.fillRect(0, 0, 10, 10);
