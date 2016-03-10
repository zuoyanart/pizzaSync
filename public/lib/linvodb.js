/**
 * 数据库操作
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-09-17 16:23:55
 * @version $Id$
 */

var linvodb = new function() {
	var _self = this;
	var LinvoDB = require('linvodb3');
	LinvoDB.defaults.store = {db: require("medeadown")};
	LinvoDB.dbPath = process.cwd();

	var Doc = new LinvoDB("doc", {});

	_self.insert = function(json) {
		Doc.insert(json, function(err, newDoc) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(newDoc._id);
		})
	}
}

module.exports = linvodb;