const express = require("express");
const dbs = require("../config/db");
const helpers = require("../utils/exerciseHelpers");
let routes = express.Router();
routes.get("/method1",(request,response)=>{
	let arrIDs = [1,2,3,4,5,6,7,8,9,10];
	dbs.databases.verbs.find({ _id: { $in: arrIDs }}, function (err, docs) {
	//
		if(docs.length > 0){
			//Array of data
			let templateData = [];
			//
			//helpers.parseTranslatedString();
			if("rus" == "rus"){
				let i = 0;
				while(arrIDs.length > i){
					var objectData = {};
					objectData.rusWord = helpers.exercises.parseTranslatedString(docs[i].rus[0]);
					objectData.engArray = docs[i].eng;
					templateData.push(objectData);
					i++;
				}
			}
			response.render("method-1",{
				userLoginSession : request.session.login,
				title:"Method 1",
				randomRows:templateData	//Array of objects {rusWord:"Быть",engArray:["be","was, were","been"]}
			});
		}else{
			response.render("method-1",{
				userLoginSession : request.session.login,
				title:"Method 1"
			});
		}
	});
});
routes.get("/method2",(request,response)=>{
	response.render("method-2",{
		userLoginSession : request.session.login,
		title:"Method 2"
		});
});
routes.get("/method3",(request,response)=>{
	response.render("method-3",{
		userLoginSession : request.session.login,
		title:"Method 3"
		});
});
module.exports = routes;