
var $ = require('jquery');
//全局变量
window.mcTagOption = {//标签方法传参
	isPost:true,
	url:'/test/updatedoc'
};

var static = new function() {
	_self = this;

	
}
;/**
 * 
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-08-31 17:15:30
 * @version $Id$
 */

var $ = jQuery = require('jquery');
var tools = require('pizzatools');
require('pizzalayer');
var loginState = new function() {
	var _self = this;
	/**
	 * 打印登录状态
	 * @return {[type]} [description]
	 */
	_self.init = function() {
		var s = '';
		var id = tools.getCookie('id');
		if(id == '0' && false) {//未登录
			s = '';
		}
		else {
			s = '<a href="/space">'+tools.getCookie('nickname')+'</a> | <a href="javascript:void(0);" onclick="loginstate.loginout();">退出</a><img src="' + '../public/widget/loginstate/member.jpg' +' " />';
		}
		$('.loginstate').html(s);
	}
	/**
	 * 退出登录
	 * @return {[type]} [description]
	 */
	_self.loginout = function() {
		$.ajax({
			type:'GET',
			url:'/user/loginout',
			success: function(msg) {
				document.location.href = '/';
			}
		})
	}
}
module.exports = loginState;
;/**
 * 
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-09-11 16:55:26
 * @version $Id$
 */


var menunav = new function() {
	_self = this;
	_self.choose = function() {
		var href = document.location.href;
		var hrefArray = href.split('/');
		var type = hrefArray[3];
		var obj = $('#navmenu > li');
		switch(type) {
			case 'space': $(obj[1]).find('a').addClass('choose'); break;
			default: $(obj[0]).find('a').addClass('choose');
		}
	}
}

module.exports = menunav;
;/**
 * 
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-09-01 10:04:09
 * @version $Id$
 */

var $ = require('jquery');
var pizzalayer = require('pizzalayer');

/**
 * 菜单消失事件
 * @param  {[type]} event) {               var o [description]
 * @return {[type]}        [description]
 */
$("body").off('click.space-nav-menu').on('click.space-nav-menu', function(event) {
    var o = $(event.target);
    var select = o.parents('.space-nav-menu');
    if(select.length == 0) {
    	 $('.space-nav-menu:visible').css('display', 'none'); //清除所有的可见菜单
    }
});
/**
 * 菜单悬停
 * @param  {[type]} ) {               var o [description]
 * @return {[type]}   [description]
 */
$('.spacenavright > a > span').mouseover(function() {
    var o = $(this);
    pizzalayer.tips(this, null, '', 0, 0);
    var tabs = o.attr('tabs');
    var tabsWidth = 342;     
    $('.space-nav-menu:visible').css('display', 'none'); //清除所有的可见菜单
    if (tabs) {
        var left = o.offset().left - $('.spacenavright').offset().left - tabsWidth + 30 + 22;
        $('.' + tabs).css({
            'display': 'block',
            'left': left
        });
    }
}).mouseout(function() {
    layer.closeAll('tips');
});

;/**
 * 标签的添加和修改
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-09-02 17:28:57
 * @version $Id$
 */

var $ = require('jquery');
var pizzalayer = require('pizzalayer');
var tools = require('pizzatools');

var tag = function(options) {
    var _self = this;
    _self.values = ','; //填写的所有标签的值
    _self.valuesLength = 0;
    var defaults = {
        isPost: false,
        url: '/space/person/updatedoc'
    };
    option = $.extend(defaults, options);
    var o = $('.mcren-tag > div > ul');
    /**
     * tag 事件初始化
     * @return {[type]} [description]
     */
    _self.init = function(tags) {
            pizzalayer.detail('#tag'); //问号弹出提示事件
            o.on('focus', 'input', function() { //input获取焦点事件，弹出提示
                pizzalayer.tips(this, {
                    msg: '鼠标离开或回车键确认',
                    time: 3000
                });
            });
            o.on('blur', 'input', function() { //input失去焦点事件，提示消失
                _self.add(this);
            });
            o.on('keydown', 'input', function(e) { //绑定回车事件
                var e = e || event;
                var keyNum = e.which || e.keyCode;
                if (keyNum == 13) {
                    _self.add(this);
                }
            });
            o.on('click', 'a', function() { //绑定删除事件
                _self.del(this);
            });

            if (tags) { //绑定已有tag
                _self.values = ',' + tags + ',';
                var tagArray = tags.split(',');
                var tagLength = _self.valuesLength = tagArray.length;

                var s = '';
                for (var i = 0; i < tagLength; i++) {
                    s += '<li>' + tagArray[i] + '<a href="javascript:void(0);"><i class="icon-remove btn-icon"></i></a></li>';
                }
                _self.valuesLength == 8 ? o.html(s) :  o.html(s + '<li><input type="text" /></li>');
            }
        }
        /**
         * 添加标签
         * @param {[type]} inputObj [description]
         */
    _self.add = function(inputObj) {
            var input = $(inputObj);
            var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            var value = tools.xss($.trim(input.val()));
            var l = tools.getCharLen(value);
            if (l == 0) {
                layer.closeAll('tips');
                return;
            }
            if (l > 10 || l < 1 || !reg.test(value)) { //判断标签是否合法
                pizzalayer.tips(input, {
                    msg: '请输入1—5个字并且不包含特殊字符',
                    skin: 'layer-pizza-tip-danger',
                    time: 5000
                });
                return;
            } else if (_self.values.indexOf(',' + value + ',') > -1) { //判断是否有重复标签 
                pizzalayer.tips(input, {
                    msg: '该标签已存在',
                    skin: 'layer-pizza-tip-danger',
                    time: 5000
                });
                return;
            }

            layer.closeAll('tips'); //一切正确则进行添加操作 
            _self.values += value + ',';

            var ajaxOption = {
                id: input.parent(),
                success: function() { //成功执行的函数
                    _self.valuesLength++;
                    var inputParent = input.parent();
                    inputParent.html(value + '<a href="javascript:void(0);"><i class="icon-remove btn-icon"></i></a>');
                    if (_self.valuesLength < 8) {
                        inputParent.after('<li><input type="text" /></li>');
                        inputParent.next().find('input').focus()
                    }
                },
                error: function() { //失败执行的函数
                    _self.values = _self.values.replace(',' + value + ',', ',');
                }
            };
            _self.update(ajaxOption);
        }
        /**
         * 删除标签
         * @param  {[type]} obji [description]
         * @return {[type]}      [description]
         */
    _self.del = function(obji) {
            _self.valuesLength--;
            var obji = $(obji).parent();
            var value = obji.text();

            if (_self.values == ',' + value + ',') {
                pizzalayer.msg({
                    msg: '标签不能全部删除',
                    id: obji
                })
                return;
            }
            _self.values = _self.values.replace(',' + value + ',', ',');

            var ajaxOption = {
                id: obji.parent(),
                success: function() {
                    if (_self.valuesLength == 7) {
                        obji.parent().append('<li><input type="text"></li>');
                    }
                    obji.remove();

                },
                error: function() {
                    _self.values = _self.values + value + ',';
                }
            };
            _self.update(ajaxOption);
        }
        /**
         * 获取生成的所有标签，并用逗号隔开
         * @return {[type]} [description]
         */
    _self.getValues = function() {
        var s = '';
        if (_self.values == ',') {
            s = '';
        } else {
            s = _self.values.substring(1, _self.values.length);
            s = s.substring(0, s.length - 1);
        }
        return tools.xss(s);
    }

    _self.update = function(ajaxOption) {
        if (options.isPost) { //提交到服务器
            $.ajax({
                type: 'post',
                url: options.url,
                dataType: 'json',
                data: "name=tag&value=" + _self.getValues() + tools.getCsrf(),
                success: function(data) {
                    if (data.state == 'true') {
                        ajaxOption.success();
                        pizzalayer.msg({
                            'msg': '更新成功',
                            'id': ajaxOption.id,
                            'time': 2000
                        });
                    } else {
                        pizzalayer.msg({
                            'msg': '更新失败，请稍后重试',
                            'id': ajaxOption.id,
                            'time': 2000
                        });
                        ajaxOption.error();
                    }
                },
                error: function() {
                    pizzalayer.msg({
                        'msg': '更新失败，请稍后重试',
                        'id': ajaxOption.id,
                        'time': 2000
                    });
                    ajaxOption.error();
                }
            });
        }
    }
}

module.exports = tag;
