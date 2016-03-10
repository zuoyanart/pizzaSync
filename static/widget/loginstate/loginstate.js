/**
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
			s = '<a href="/space">'+tools.getCookie('nickname')+'</a> | <a href="javascript:void(0);" onclick="loginstate.loginout();">退出</a><img src="' + __uri('member.jpg') +' " />';
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