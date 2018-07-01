var Datastore = require('nedb');
var path = require('path');

// Of course you can create multiple datastores if you need several
// collections. In this case it's usually a good idea to use autoload for all collections.

const db = {};//Main object of Databases
function createDataBases(...databases){//Array from parameters ES6 -Rest parameters
	if(Array.isArray(databases)){
		let len = databases.length;
		for(let i = 0;i < len;i++){
			db[databases[i]] = new Datastore({ filename:path.resolve(__dirname,'../db/'+[databases[i]]+'.db')});
			db[databases[i]].loadDatabase();
		}
	}
}

exports.createDataBases = createDataBases;
exports.databases = db;