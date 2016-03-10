/**
 * @authors lingirl (success99@126.com)
 * @date    2015-08-31 15:11:11
 * @version $Id$
 */

var $ = jQuery = require('jquery');
var tools = require('pizzatools');
var turnpage = require('turnpage/turnpage');
require('layer');
require('pizzaui');

var tpg = new turnpage({
    "name": "mcCmt.page",
    "mp": 4
});

/*tools.setCookie('id', '20150902');
tools.setCookie('nickname', 'lingirl');
tools.setCookie('avatar', __uri('style.jpg'));
tools.setCookie('nid', '2015');*/

var comment = function() {

    var _this = this;

    var isLogin = false; // 判断是否登录
    var obj = $('.comment-wrap'); // 包裹评论的外层DIV
    var oInput = $('#comment-textarea');
    var tpl = [function(locals, filters, escape, rethrow
/**/) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var __stack = { lineno: 1, input: "\r\n<% for(var i = 0; i < data.length; i++) { %>\r\n\t<ul class=\"comment-ceil clearfix\">\r\n\t    <li class=\"li-1\">\r\n\t        <a href=\"<%= data[i].href %>\"><img src=\"<%= data[i].avatar %>\" alt=\"\"><span class=\"span-1\"><%= data[i].nickname %></span><span class=\"span-2\"><%= data[i].province %>/<%= data[i].city %></span></a>\r\n\t    </li>\r\n\t    <li class=\"icon-link\"></li>\r\n\t    <li class=\"li-2\"><%= data[i].content %></li>\r\n\t    <li class=\"small\"><%= data[i].time %></li>\r\n\t    <li class=\"icon-remove\"></li>\r\n\t</ul>\r\n<% } %>\r\n\r\n", filename: "widget/comment/comment.ejs" };
function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;
  
  throw err;
}
try {
var buf = [];
with (locals || {}) { (function(){ 
 buf.push('\n');__stack.lineno=2; for(var i = 0; i < data.length; i++) { ; buf.push('\n	<ul class="comment-ceil clearfix">\n	    <li class="li-1">\n	        <a href="', escape((__stack.lineno=5,  data[i].href )), '"><img src="', escape((__stack.lineno=5,  data[i].avatar )), '" alt=""><span class="span-1">', escape((__stack.lineno=5,  data[i].nickname )), '</span><span class="span-2">', escape((__stack.lineno=5,  data[i].province )), '/', escape((__stack.lineno=5,  data[i].city )), '</span></a>\n	    </li>\n	    <li class="icon-link"></li>\n	    <li class="li-2">', escape((__stack.lineno=8,  data[i].content )), '</li>\n	    <li class="small">', escape((__stack.lineno=9,  data[i].time )), '</li>\n	    <li class="icon-remove"></li>\n	</ul>\n');__stack.lineno=12; } ; buf.push('\n\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0];

    // 需要的变量
    var uid = tools.getCookie('id'),
        nid = tools.getCookie('nid'),
        avatar = tools.getCookie('avatar'),
        nickname = tools.getCookie('nickname'),
        targetid = 20150902;

    // 初始化操作
    _this.init = function() {
        // ajax 整体设置
        $.ajaxSetup({
            global: true,
            type: 'POST',
            dataType: 'JSON',
            timeout: 3000
        });

        // ajax 的相关设定
        $(document).ajaxStart(function() {
            //console.log('start');
            layer.close(layer.confirm());
            layer.load(2);
        })
        .ajaxError(function() {
            //console.log('err');
            layer.msg('网络错误，请稍后重试！', {time:600});
        })
        .ajaxComplete(function() {
            //console.log('always');
            layer.close(layer.load());
        });

        // 事件绑定 -- 确认发表
        $('.publish-comment').on('click', function() {
            _this.create($(this));
        });
        // 事件绑定 -- 删除评论
        $('.comment-wrap').on('click', '.icon-remove', function() {
            _this.del($(this).parent());
        });

        _this.setAvatar();
        oInput.val('');

        $('#comment-textarea').wordsTip({
            min: 1,
            max: 128
        });
    };
    // 获取cookie，判断是否登录
    _this.setAvatar = function() {
        var avatar = tools.getCookie('avatar');
        if (avatar != '0') {
            isLogin = true;
            $('#comment-avatar').attr('src', avatar);
        }
    }
    // 判断当前用户是否为自己
    _this.isMe = function() {
        //
    }  
    // 发表评论
    _this.create = function(that) {
        // 获取输入的评论，过滤空格回车
        var inputcomment = tools.xss($.trim($('#comment-textarea').val())
        .replace(/\s{3,}/g, '').replace(/[\r\n]+/g, '<br>'));

        if (uid == 0) {
            layer.msg('您尚未登录，请登录后发表评论！', {time:1000});
            return;
        }

        var flag = oInput.attr('validate');

        if (flag == 'false') {
            layer.msg('评论不可为空且字数在128字以内！', {time:1000});
            return;
        }

        var msg1 = {
            "data": [{
                href: 'http://www.baidu.com/',
                avatar: 'style.jpg',
                nickname: 'TianMing',
                province: '河南',
                city: '郑州',
                content: inputcomment,
                time: '2015-09-01   14:28'
            }]
        };

        $.ajax({
            url: '/webpart/upcomment',
            data: {
                uid: uid,
                nid: nid,
                content: inputcomment,
                avatar: avatar,
                nickname: nickname,
                targetid: targetid,
                '&_csrf=': $('#csrf').val()
            }
        }).done(function(msg) {
            if (msg.state === 'true') {
                obj.prepend(tpl(msg1));
            }
            oInput.val('');
        });
    };
    // 获取评论
    _this.page = function(cp) {

        var data = {
            url: '/webpart/getcomment',
            data: {
                cp: cp,
                targetid: targetid,
                '&_csrf': $('#csrf').val()
            }
        };

        if(!cp) {
            cp = 1;
            data.global = false;
        }

        $.ajax(data).done(function(msg) {
            if (msg.sum != 0) {
                obj.siblings('.turnpage').remove();
                obj.html(tpl(msg)).after(tpg.hud(cp, msg.sum));
            }
        });
    };
    // 删除评论 
    _this.del = function(that) {
        layer.confirm('确定删除这条评论吗？', function() {
            $.post({
                url: '/webpart/delcomment',
                data: {
                    uid: uid,
                    commentid: 123456,
                    '&_csrf': $('#csrf').val()
                }
            }).done(function(msg) {
                if (msg.state === 'true') {
                    that.slideUp(500, function() {
                        that.remove();
                    });
                }
            });
        });
    };
    // 评论数 + 1 
    _this.addone = function() {
        console.log('评论增加一条');
    }
};

module.exports = comment;
