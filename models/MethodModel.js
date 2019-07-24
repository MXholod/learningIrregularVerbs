//Pack data to Method object before save them into DB
const Method = {
	"_uid":'User\'s id',get uid(){return this._uid;},set uid(uid){this._uid = uid;},
	"_login":'User\'s login',get login(){return this._login;},set login(login){this._login = login;},
	"_hash":'User\'s hash',get hash(){return this._hash;},set hash(hash){this._hash = hash;},
	"methodNum":"",
	"gameTime":"",
	"successResult":0,
	"failureResult":0,
	"totalAnswers":0,
	"successPercentage":0,
	"dateTime":0
};

module.exports = Method;