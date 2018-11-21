// wx分享
(function() {
  _sdi &&
    _sdi.share.init(
      {
        appid: '', // 固定为空字符串
        img_url:
          window.location.protocol +
          '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/img/share/destroy_king.png',
        link: window.location.href,
        desc: '立即查看',
        title: '警告！无敌破坏王即将登录你的WiFi'
      },
      function(opt) {
        //分享前的回调，opt是分享的参数
      },
      function(res) {
        //分享完成后回调，可以用来判断用户是否分享成功了
      }
    );
})();

// qb分享
(function() {
  var params_qb_share = {
    url: window.location.href,
    title: '警告！无敌破坏王即将登录你的WiFi',
    description: '立即查看',
    img_url:
      window.location.protocol +
      '//3gimg.qq.com/mig_market/activity/act/asset/destroy_king_h5/img/share/destroy_king.png',
    img_title: '',
    cus_txt: ''
  };
  //设置QB内的分享内容
  if (window.browser && browser.app && browser.app.setShareInfo) {
    browser.app.setShareInfo(params_qb_share, function(result) {
      console.log(result);
    });
  }
})();
