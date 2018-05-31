const ele = document.querySelector('.test');
// let data = location.search.slice(1);
// data = decodeURIComponent(data).split(/=/)[1];
// console.log(data);
// const data = '%3Cscript%3Ealert(1)%3C/script%3E';
// ele.innerHTML = data;


let data = decodeURIComponent(location.search);
// data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/=/g, '&#61;');
console.log(data);

ele.innerHTML = data;

