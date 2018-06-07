const events = require('events');

function User() {
  this.events = new events.EventEmitter();
  this.login = (param) => {
    console.log('登录', param);
  }
  this.join = (param) => {
    console.log('注册', param);
  }
}
module.exports = {
  User
};