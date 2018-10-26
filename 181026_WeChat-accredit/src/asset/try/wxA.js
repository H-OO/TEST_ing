!(function(e) {
  function t(e) {
    var t = '&' + window.location.search.substring(1), // ?
      n = location.pathname, // /
      o = location.origin, // host+port
      i = location.hash, // #/
      c = new RegExp('&' + e + '=([^&]+)'); // 
    return (
      (t =
        '?' +
        t
          .replace(c, '')
          .replace(/&state=STATE/g, '')
          .substring(1)),
      o + n + t + i
    );
    // return ? + 
  }
  var n, o;
  (n = {
    set: function(e, t, n) {
      document.cookie = e + '=' + escape(t) + ';expires=' + this.getSec(n);
    },
    get: function(e) {
      var t = document.cookie.match(new RegExp('(^| )' + e + '=([^;]*)(;|$)'));
      return null != t ? unescape(t[2]) : null;
    },
    del: function(e) {
      var t = e.split('=')[0],
        n = new Date();
      n.setTime(n.getTime() - 2e4),
        (document.cookie = t + '=a; expires=' + n.toGMTString());
    },
    getSec: function(e) {
      var t = 'number' == typeof e ? e : 10,
        n = 288e5 + 60 * t * 1e3,
        o = new Date(),
        i = o.getTime();
      o.setTime(i + n);
      var c = o.toGMTString();
      return c;
    }
  }),
    (o = {
      response: function(e, t) {
        if (200 === e.ret_code) {
          var i = e.data.userinfo,
            c = i.nickname,
            a = i.headimgurl,
            r = i.openid,
            s = this.getQueryString('ref');
          n.set(t.id, r),
            n.set(t.head, a),
            n.set(t.name, c),
            n.set('codes', 0),
            s && 'debug' === s
              ? console.log(i)
              : 'function' == typeof this.opt.asyns
                ? this.opt.asyns(i)
                : this.opt.reload
                  ? 'function' == typeof this.opt.call && this.opt.call()
                  : window.location.reload(!0);
        } else
          console.log('code信息获取失败!'),
            (window.location.href = o.redirectUri());
      },
      request: function(e, t) {
        // $.ajax({
        //   url: e.url,
        //   type: 'get',
        //   async: !1,
        //   dataType: 'jsonp',
        //   jsonp: 'call_back_name',
        //   jsonpCallback: 'success_jsonpCallback',
        //   success: function(e) {
        //     o.response(e, t);
        //   },
        //   error: function(e, t, n) {
        //     console.log('用户信息获取失败!'),
        //       (window.location.href = o.redirectUri());
        //   }
        // });
      },
      getQueryString: function(e) {
        var t = new RegExp('(^|&)' + e + '=([^&]*)(&|$)', 'i'),
          n = window.location.search.substr(1).match(t);
        return null != n ? unescape(n[2]) : null;
      },
      getSelfUrl: function(e) {
        return e ? e : location.href;
      },
      redirectUri: function() {
        var e = this.opt.base ? 'snsapi_base' : 'snsapi_userinfo',
          n =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            this.opt.appKeys +
            '&redirect_uri=' +
            encodeURIComponent(t('code')) +
            '&response_type=code&scope=' +
            e +
            '&state=STATE#wechat_redirect';
        return n;
      },
      init: function(e) {
        this.opt = e;
        var t = e.appKeys,
          o = 'function' == typeof e.call ? e.call : function() {},
          i = 'function' == typeof e.authConfig ? e.authConfig() : e.authConfig,
          c =
            'function' == typeof e.cookieConfig
              ? e.cookieConfig()
              : e.cookieConfig,
          a = n.get(c.id);
        if ('undefined' == typeof t || '' === t || !t)
          return alert('参数不完整，授权失败');
        if (a) 'function' == typeof o && o();
        else {
          var r = this.getQueryString('code') || (this.opt.t ? this.opt.t : '');
          r
            ? ((i.url = i.url.replace('NEWCODE', r)), this.request(i, c))
            : (window.location.href = this.redirectUri());
        }
      }
    }),
    (e.getWxJsSDK = function(e, t) {
      // (e = e || {}),
      // $.ajax({
      //   type: 'post',
      //   url: e.url,
      //   dataType: 'json',
      //   data: e.data,
      //   success: function(e) {
      //     200 === e.ret_code
      //       ? 'function' == typeof t &&
      //         t({
      //           appId: 'wx4f817bc9cee4c90c',
      //           timestamp: e.data.timestamp,
      //           nonceStr: e.data.nonceStr,
      //           signature: e.data.signature
      //         })
      //       : console.log('签名失败!');
      //   },
      //   error: function(e) {}
      // });
    }),
    (e.cookies = n),
    (e.auth = o);

  module.exports = window.wxAuth;
})(window.wxAuth || (window.wxAuth = {}));

/**
 * @key auth = o
 * @key cookies = n
 * @key getWxJsSDK ajax -> success -> t()
 */
