//Pack data to MethodFailed object before save them into DB
const MethodFailed = {
	"_uid":'User\'s id',get uid(){return this._uid;},set uid(uid){this._uid = uid;},
	"_login":'User\'s login',get login(){return this._login;},set login(login){this._login = login;},
	"failedAsString":"",
	"dateTime":0
};

module.exports = MethodFailed;