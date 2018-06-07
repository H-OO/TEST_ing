const http = require('http');
const url = require('url');
const router = require('./src/router/router');
const events = require('events');

// const eventEmit = new events.EventEmitter();
// eventEmit.once('test', (a, b) => {
//   console.log(a);
//   console.log(b);
// });
// eventEmit.emit('test', 'aa', 'bb');

const {User} = require('./src/event/event');
const user = new User();
user.events.once('login', (param) => {
  user.login(param);
});
user.events.once('join', (param) => {
  user.join(param);
});
user.events.emit('login', {loginMsg: '_login_'});
user.events.emit('join', {joinMsg: '_join_'});



http.createServer((req, res) => {
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    let {pathname} = url.parse(req.url);
    pathname = pathname.slice(1);
    let {query} = url.parse(req.url, true);
    // 异常处理 try{}catch(err){}
    try {
      router[pathname](req, res);
    } catch (err) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.write('404');
      res.end();
    }
  }
}).listen(8000);
console.log('Server run at localhost:8000');
