var Datastore = require('nedb');
var path = require('path');
var Singleton = (function(){
	/*var instance;
	
	function Singleton(){
		if(!instance){
			instance = this;
		}else{
			return instance;
		}
	}
	return Singleton;*/
	//Array of Datastores objects
	var db;
	function Singleton(folder,filename){
		var folder = folder || 'storage',filename = filename || 'main_users_data';//Default DB
		if(!db){//We have started program first time and had created main Datastore by default
			db = new Datastore({ filename:path.resolve(__dirname,'../models/'+folder+'/'+filename)});
			db.loadDatabase();
			//return [db,"Mutual Database"];
			return [db,"Database created"];
		}else{
			//Loop for checking out existing Datastore
			return [db,"Database has already existed"];
		}
	}
	return Singleton;
})();
module.exports = Singleton;