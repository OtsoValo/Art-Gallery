/**
 * 检测用户身份以及加密
 */

const crypto = require('crypto');
const updateCode = 'artoex';
function cryptPwd(pwd) {
	const secret = pwd;
	const hash = crypto.createHmac('sha256', secret)
		.update(updateCode)
		.digest('hex');
	return hash;
}

module.exports = { cryptPwd };