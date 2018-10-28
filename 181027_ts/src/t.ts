console.log('demo');
let a = 1;
const p = new Promise((done, err) => {
  done('test1');
});
console.log(p);

async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
