const ele = document.querySelector('.test');
const newChild = document.createElement('li');
newChild.textContent = '__XXX__';
console.log(newChild);
const replaceEle = ele.children[2];
console.log(replaceEle);
ele.replaceChild(newChild, replaceEle);

document.cloneNode();

console.log(document.doctype);

ele.removeChild(ele.lastElementChild);

console.log(document.referrer);

// document.domain = 'https://jin88.com.cn/Bestpay/IndexChart/merchantAndBankInfo';
document.domain = 'jin88.com.cn';
