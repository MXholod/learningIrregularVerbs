var cr = require('crypto');
const secretHash = "irregularVerbs";
function hashPassword(login,pass){// secretHash + login + password
	var result = secretHash+login+pass;
	return cr.createHash('md5').update(result).digest("hex");
}
/*var data = "asdf"; 
var crypto = require('crypto'); 
crypto.createHash('md5').update(data).digest("hex"); */

/*const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
console.log(hash);*/
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
module.exports = hashPassword;