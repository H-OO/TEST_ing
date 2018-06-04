function login(req, res) {
  res.write('登录');  
}
function join(req, res) {
  res.write('注册');  
}

module.exports = {
  login,
  join
};