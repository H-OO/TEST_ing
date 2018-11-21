# canvas

`<canvas id="myCanvas"></canvas>`

默认为300*150的透明画布

# context 绘制上下文

```ts
const cvs: HTMLCanvasElement = document.querySelector('#myCanvas'); // 画布
const ctx: CanvasRenderingContext2D = cvs.getContext('2d'); // 获取绘制上下文环境 2d
```

# API

- fillStyle // 填充样式属性
- fillRect(x,y,w,h) // 填充矩形位置与大小
- strokeStyle // 描边样式属性
- strokeRect(x,y,w,h) // 描边矩形位置与大小
- 
