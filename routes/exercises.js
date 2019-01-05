const express = require("express");
const dbs = require("../config/db");
const helpers = require("../utils/exerciseHelpers");
let routes = express.Router();
routes.get("/method1",(request,response)=>{
	//let arrIDs = [1,2,3,4,5,6,7,8,9,10];
	let arrUniqueNums = helpers.exercises.uniqueNumbers(10,25);
	dbs.databases.verbs.find({ _id:{ $in: arrUniqueNums }},function(err, docs){
		if(docs.length > 0){
			//Get current language rus|ukr
			let language = response.locals.lang.identifier;
			//Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
			let templateData = helpers.exercises.arrayOfTasks(docs,language);
			//Elements of Data Array are equal to random numbers Array. Objects in random order. 
			let mixedWords = helpers.exercises.changePositions(arrUniqueNums,templateData);
			response.render("method-1",{
				userLoginSession : request.session.login,
				title:"Method 1",
				randomRows:mixedWords //Array of objects {rusWord:"Ѓыть",engArray:["be","was, were","been"]}
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