const url = require('url');
const fs = require('fs');
const path = require('path');
const async = require('async');
const file = require('../controler/file');

const querystring = require('querystring'); // post请求参数获取

module.exports = {
  // 首页
  index: (req, res) => {
    file.readFile(path.resolve(__dirname, '../view/index.html'), req, res);
  },
  // 处理登录请求
  login: (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    /************************_GET_************************/
    console.log(url.parse(req.url, true));
    
    const {
      query
    } = url.parse(req.url, true);
    const {username, password} = query;
    if (username !== '' && password !== '') {
      fs.readFile(path.resolve(__dirname, '../database/user.json'), 'binary', (err, file) => {
        if (err) {} else {
          const user = JSON.parse(file.toString());
          // console.log(password, user['0'].password);
          if (username === user['0'].username && password === user['0'].password) {
            res.write('登录成功');
          } else {
            res.write('登录失败');
          }
          res.end();
        }
      });
    } else {
      res.write('格式有误');
      res.end();
    }

    /************************_POST_************************/
    // let post = '';
    // req.on('data', (chunk) => {
    //   post += chunk;
    // });
    // req.on('end', () => {
    //   post = querystring.parse(post);
    //   console.log(post);
    //   const {
    //     username,
    //     password
    //   } = post;
    //   if (username !== '' && password !== '') {
    //     fs.readFile(path.resolve(__dirname, '../database/user.json'), 'binary', (err, file) => {
    //       if (err) {} else {
    //         const user = JSON.parse(file.toString());
    //         if (username === user['0'].username && password === user['0'].password) {
    //           res.write('登录成功');
    //         } else {
    //           res.write('登录失败');
    //         }
    //         res.end();
    //       }
    //     });
    //   } else {
    //     res.write('格式有误');
    //     res.end();
    //   }
    // });
  },
  // 获取图片
  img: (req, res) => {
    file.readImg(path.resolve(__dirname, '../public/logo.png'), req, res);
  },
  // async 串行无关联 series
  series: (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.write('async series ing...');
    async.parallel({
      one: (done) => {
        let count = 0;
        let timer = setInterval(() => {
          if (count > 3) {
            clearInterval(timer);
            done('one_err', '__——one——__');
          }
          console.log('__one__');
          count++; 
        }, 1000)
      },
      two: (done) => {
        console.log('__two__');
        done(null, '__——two——__');
      }
    }, (err, succ) => {
      console.log(err)
      console.log(succ)
      // if (err) {
      //   console.log('---');
      //   console.log(err);
      // } else {
      //   res.write('async series success!');
      //   console.log(succ);
      // }
      res.end();
    })
  },
  // waterfall
  waterfall: (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    async.waterfall([(done) => {
      let count = 0;
      let timer = setInterval(() => {
        if (count > 3) {
          clearInterval(timer);
          done(null, '__one__');
        }
        console.log(count);
        count++;
      }, 1000);
    }, (preValue, done) => {
      console.log('---');
      console.log(preValue);
      done(null, '__two__');
    }], (err, succ) => {
      console.log('--over--');
      
      console.log(err);
      console.log(succ);
      res.end();
    })
  }
};