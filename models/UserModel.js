const crypto = require("../utils/crypto");

const User = {
	"_login":'User\'s login',get login(){return this._login;},set login(login){this._login = login;},
	"_pass":'User\'s password',get pass(){return this._pass;},set pass(password){this._pass = password;},
	"_email":'User\'s email',get email(){return this._email;},set email(email){this._email = email;},
	"getHash":function(){return crypto(this._pass);},
	"_dateBegin":'When user start the test'
};
Object.defineProperty(User,'dateBegin',{
	get:function(){return this._dateBegin;},
	set:function(){this._dateBegin = new Date();}
});

module.exports = User;