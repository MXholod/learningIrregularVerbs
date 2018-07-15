const crypto = require("../utils/crypto");
//Pack data to User object before save them into DB
const User = {
	"_login":'User\'s login',get login(){return this._login;},set login(login){this._login = login;},
	"_pass":'User\'s password',get pass(){return this._pass;},set pass(password){this._pass = password;},
	"_email":'User\'s email',get email(){return this._email;},set email(email){this._email = email;},
	"getHash":function(){return crypto(this._login,this._pass);},
	"_dateBegin":'When user start the test',
	"_dateLastVisit":'When user start the test'
};
Object.defineProperty(User,'dateBegin',{
	get:function(){return this._dateBegin;},
	set:function(dateBegin){this._dateBegin = dateBegin;}
});
Object.defineProperty(User,'dateLastVisit',{
	get:function(){return this._dateLastVisit;},
	set:function(dateLastVisit){this._dateLastVisit = dateLastVisit;}
});

module.exports = User;