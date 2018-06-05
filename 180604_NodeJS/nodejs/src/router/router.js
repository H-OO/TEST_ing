const url = require('url');
const fs = require('fs');
const path = require('path');
const file = require('../controler/file');

const querystring = require('querystring'); // post请求参数获取

module.exports = {
  // 首页
  index: (req, res) => {
    file.readFile('./view/index.html', req, res);
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
    file.readImg('./public/logo.png', req, res);
  }
};