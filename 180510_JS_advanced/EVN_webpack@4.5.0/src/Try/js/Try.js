// const form = document.querySelector('#form');
// const submit = document.querySelector('#submit');
// const file = document.querySelector('#file');

// submit.addEventListener('click', e => {
//   e.preventDefault();
//   const data = new FormData(form);
//   // console.log(data.get('img'));
//   console.log(file.files[0] === file.files.item(0));
//   // 获取图片的三种方式
//   // new FormData().get()
//   // inputEle.file.files[0]
//   // inputEle.file.files.item(0)
//   URL.createObjectURL()
// });

const inputFile = document.querySelector('#file');
const insertImg = document.querySelector('#insert_img');
inputFile.addEventListener('change', e => {
  const target = e.target;
  // 取消操作也会触发change事件
  if (target.files.length === 0) {
    return;
  }
  // 获取 blob 字符串
  const url = window.URL.createObjectURL(target.files.item(0));
  // 设置图片路径
  insertImg.src = url;
});