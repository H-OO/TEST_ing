const p = document.querySelector('.p');
const c = document.querySelector('.c');
c.addEventListener('mousemove', (e) => {
  console.log(e);
}, false);

c.addEventListener('mouseup', (e) => {
  console.log(e);
}, false);

c.addEventListener('click', (e) => {
  console.log(e);
}, false);