import * as React from 'react';
import './Home.scss';
import { device } from './device'; // 机型

interface I_state {
  device?: any;
  typeSelectOptions?: JSX.Element; // 机型下拉列表选项
  typeListRef?: React.RefObject<HTMLSelectElement>; // 机型下拉列表Node
  viewRef?: React.RefObject<HTMLDivElement>; // 效果图容器Node
  deviceWRef?: React.RefObject<HTMLDivElement>; // 设备宽度信息Node
  deviceHRef?: React.RefObject<HTMLDivElement>; // 设备高度信息Node
  fileInputRef?: React.RefObject<HTMLInputElement>; // 获取文件Node
  hint?: string; // 提示语
  planW?: number; // 设计稿宽
  planH?: number; // 设计稿宽
  logRef?: React.RefObject<HTMLDivElement>; // 打印区
  phone?: string; // 机型
  runMode?: string; // 模拟运行环境
  fullW?: number; // 全屏宽
  fullH?: number; // 全屏高
  wxW?: number; // 微信可视区宽
  wxH?: number; // 微信可视区高
  cut?: number; // 上/下裁剪量
  zoomPlanW?: number; // 等比缩放后设计稿宽
  zoomPlanH?: number; // 等比缩放后设计稿高
  cutToggle?: boolean; // 裁剪区默认隐藏
}

class Home extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.state = {
      device,
      typeSelectOptions: null,
      typeListRef: React.createRef(),
      viewRef: React.createRef(),
      deviceWRef: React.createRef(),
      deviceHRef: React.createRef(),
      fileInputRef: React.createRef(),
      hint: '亲，我目前只支持图片 ^_^',
      planW: 0,
      planH: 0,
      logRef: React.createRef(),
      phone: 'iPhoneX',
      runMode: '',
      fullW: 0,
      fullH: 0,
      wxW: 0,
      wxH: 0,
      cut: 0,
      zoomPlanW: 0,
      zoomPlanH: 0,
      cutToggle: false
    };
    this.getTypeSelectOptions = this.getTypeSelectOptions.bind(this);
    this.getDefaultType = this.getDefaultType.bind(this);
    this.getTypeSelectOptions = this.getTypeSelectOptions.bind(this);
    this.getFile = this.getFile.bind(this);
    this.logMsg = this.logMsg.bind(this);
    this.cutShow = this.cutShow.bind(this);
  }
  public componentDidMount() {
    this.getTypeSelectOptions();
    this.getFile();
  }
  public componentDidUpdate() {
    this.getDefaultType();
  }
  // 获取机型下拉列表
  public getTypeSelectOptions() {
    const { device }: I_state = this.state;
    const options = [];
    for(let name in device) {
      let option: JSX.Element;
      if (name === 'iPhoneX') {
        option = (
          <option value={name} key={name}>{name}</option>
        );
      } else if (name === 'main1') {
        option = (
          <option value={name} key={name}>非全面屏主流机型</option>
        );
      } else {
        option = (
          <option value={name} key={name}>{name}</option>
        );
      }
      options.push(option);
    }
    this.setState({
      typeSelectOptions: options
    });
  }
  // 获取默认机型并绑定事件
  public getDefaultType() {
    const { typeListRef, device, deviceWRef, deviceHRef, viewRef, planW, planH }: I_state = this.state;
    const { current: typeListNode } = typeListRef;
    const { current: deviceWNode } = deviceWRef;
    const { current: deviceHNode } = deviceHRef;
    const { current: viewNode } = viewRef;
    // 机型切换
    typeListNode.onchange = () => {
      this.setState({
        hint: ''
      });
      // console.log('change');
      const type = typeListNode.value;
      const { wx, full } = device[type];
      deviceWNode.innerHTML = wx[0];
      deviceHNode.innerHTML = wx[1];
      viewNode.style.width = wx[0] + 'px';
      viewNode.style.height = wx[1] + 'px';
      if (!planW) {
        return;
      }
      // 重置图片Y方向偏移量
      // console.log(planW, planH);
      const { clientWidth: viewW, clientHeight: viewH }: { clientWidth: number; clientHeight: number } = viewNode;
      // 等比例换算
      const scale = viewW / planW;
      const zoomImgH = planH * scale; // 等比缩放后的设计稿高度
      // 未优化的偏移量
      const moveStep = -[(zoomImgH - viewH) / 2];
      // console.log(moveStep);
      const viewImg: HTMLElement = viewNode.firstElementChild as HTMLElement;
      viewImg.style.transform = `translateY(${moveStep}px)`;
      // 打印相关信息
      this.setState({
        phone: type === 'main1' ? '非全面屏主流机型' : type,
        fullW: full[0],
        fullH: full[1],
        wxW: wx[0],
        wxH: wx[1],
        cut: moveStep,
        zoomPlanW: viewW,
        zoomPlanH: zoomImgH
      });
      this.logMsg();
    };
    // 获取默认机型
    const type = typeListNode.value;
    const { wx } = device[type];
    deviceWNode.innerHTML = wx[0];
    deviceHNode.innerHTML = wx[1];
    viewNode.style.width = wx[0] + 'px';
    viewNode.style.height = wx[1] + 'px';
  }
  // 选择需要测试的文件
  public getFile() {
    const { fileInputRef, viewRef }: I_state = this.state;
    const { current: fileInputNode } = fileInputRef;
    const { current: viewNode } = viewRef;
    // console.log(hintNode);
    const reader: FileReader = new FileReader();
    const img: HTMLImageElement = new Image();
    fileInputNode.onchange = () => {
      // 清除提示语
      this.setState({
        hint: ''
      });
      const file: File = fileInputNode.files[0];
      reader.onload = () => {
        const base64: string|ArrayBuffer = reader.result;
        img.onload = () => {
          const planW = img.width; // 设计稿宽
          const planH = img.height; // 设计稿高
          img.style.width = '100%';
          viewNode.appendChild(img);
          const { clientWidth: viewW, clientHeight: viewH }: { clientWidth: number; clientHeight: number } = viewNode;
          // 等比例换算
          const scale = viewW / planW;
          const zoomImgH = planH * scale; // 等比缩放后的设计稿高度
          // 未优化的偏移量
          const moveStep = -[(zoomImgH - viewH) / 2];
          img.style.transform = `translateY(${moveStep}px)`;
          // 打印相关信息
          this.setState({
            planW,
            planH,
            wxW: viewW,
            wxH: viewH,
            zoomPlanW: viewW,
            zoomPlanH: zoomImgH,
            cut: moveStep
          })
          this.logMsg();
        };
        img.src = base64 as string;
      };
      file && reader.readAsDataURL(file);
    };
  }
  // 打印相关信息
  public logMsg() {
    const { logRef, phone, wxW, wxH, planW, planH, cut, zoomPlanW, zoomPlanH }: I_state = this.state;
    const { current: logNode } = logRef;
    /**
     * 机型：
     * 当前显示模式：微信|全屏
     * 全屏尺寸：
     * 微信窗口尺寸：
     * 当前图片尺寸：
     * 上/下裁剪量：
     */
    // &nbsp; &nbsp;全屏尺寸：${fullW}×${fullH} <br>
    const tmp = `
      <br>
      &nbsp; &nbsp;机型：${phone} <br>
      &nbsp; &nbsp;运行环境：微信 <br>
      &nbsp; &nbsp;微信窗口尺寸：${wxW}×${wxH} <br>
      &nbsp; &nbsp;设计稿尺寸：${planW}×${planH} <br>
      &nbsp; &nbsp;设计稿缩放尺寸：${zoomPlanW.toFixed(2)}×${zoomPlanH.toFixed(2)} <br>
      &nbsp; &nbsp;上/下裁剪量：${cut.toFixed(4)}
    `;
    logNode.innerHTML = tmp;
  }
  // 显示被裁剪的部分
  public cutShow() {
    const { cutToggle, viewRef }: I_state = this.state;
    const { current: viewNode } = viewRef;
    const viewImg: HTMLElement = viewNode.firstElementChild as HTMLElement;
    this.setState({
      cutToggle: !cutToggle
    });
    if (!cutToggle) {
      // console.log('显示');
      viewNode.style.overflow = 'visible';
      viewImg.style.opacity = '0.7';
    } else {
      // console.log('隐藏');
      viewNode.style.overflow = 'hidden';
      viewImg.style.opacity = '1';
    }
  }
  public render() {
    const { typeSelectOptions, viewRef, typeListRef, deviceWRef, deviceHRef, fileInputRef, logRef, hint, cutToggle }: I_state = this.state;
    return (
      <div className="home">
        <select className="home__device-list" ref={typeListRef}>
          {typeSelectOptions}
        </select>
        <div className="home__size">
          <span>微信窗口: </span>
          <span className="home__size-w" ref={deviceWRef}>宽</span>
          <span>×</span>
          <span className="home__size-h" ref={deviceHRef}>高</span>
        </div>
        <div className="home__effect" ref={viewRef}></div>
        <div className="home__hint">{hint}</div>
        <div className="home__file-btn">
          <input type="file" accept="image/*" ref={fileInputRef} />
        </div>
        <div className="home__log" ref={logRef}></div>
        <div className="home__cut-show">
          <button onClick={this.cutShow}>裁剪{cutToggle ? '隐藏' : '显示'}</button>
        </div>
      </div>
    );
  }
}

export default Home;
