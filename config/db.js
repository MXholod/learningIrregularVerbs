const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');
const verbsModel = require('./../models/VerbsModel.json');


// Of course you can create multiple datastores if you need several
// collections. In this case it's usually a good idea to use autoload for all collections.
//Create databases from parameters
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
function insertVerbsToDB(dbName){
	//Create path to file
	var pathFileDB = path.resolve(__dirname,'../db/'+dbName+".db");
	//Check file DB for Irregular Verbs to write data in it
	fs.lstat(pathFileDB,(err,stats)=>{
		//If file verbs.db is absent, err object is exists
		if(err){
			//process.exit(1);
			//db[dbName].insert({error:"File is absent"},function(err,newDocs){});
			//{"errno":-4058,"code":"ENOENT","syscall":"lstat"}
			return;
		}
		//If file exists
		if(stats.isFile()){
			db[dbName].count({},function(err,count){
				if(count <= 0){//First insert, only once add an Array of Objects
					db[dbName].insert(verbsModel,function(err,newDocs){
						
					});
				}else{//Each time insert
					//db[dbName].insert({eachTime:""},function(err,newDocs){});
				}
			});
		}else{//File doesn't exist
			//db[dbName].insert([{ file: "File doesn't exists" }],function(err,newDocs){});
		}					
	});
}
exports.createDataBases = createDataBases;
exports.databases = db;
exports.insertVerbsToDB = insertVerbsToDB;