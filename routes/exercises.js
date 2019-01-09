const express = require("express");
const dbs = require("../config/db");
const helpers = require("../utils/exerciseHelpers");
let routes = express.Router();
//Range of word rows on each page
const rowsAmount = 20;//Must be 50
routes.get("/method1",(request,response)=>{
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//Ten rows each time
	let tenRows;
	//First time visit
	if(Number(request.query.currentPageAmount) == 1 && !request.session.numbers){//&& !request.session.numbers
		//Get unique numbers from given range - 50
		let arrUniqueNums = helpers.exercises.uniqueNumbers(rowsAmount,25);//Get 10 from 25
		//First parameter: get first 10 from all random IDs 50
		tenRows = helpers.exercises.getPortionIDs(arrUniqueNums);
		//Serialize data, last 40 rows
		let serializedArray = JSON.stringify(arrUniqueNums);
		//Save to Session 40 rows
		request.session.numbers = serializedArray;
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:tenRows}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language);
				//Elements of Data Array are equal to random numbers Array. Objects in random order. 
				let mixedWords = helpers.exercises.changePositions(tenRows,templateData);
				response.render("method-1",{
					userLoginSession : request.session.login,
					title:"Method 1",
					randomRows:mixedWords //Array of objects {rusWord:"Ѓыть",engArray:["be","was, were","been"]}
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}else{//Each other time
		//If Session exists
		if(request.session.numbers){
			//Unique numbers from Session 40,30,20,10
			let sessionArrUniqueNums = JSON.parse(request.session.numbers);
			//Get ten
			tenRows = helpers.exercises.getPortionIDs(sessionArrUniqueNums);
			//Serialize data, last 40 rows
			let serializedArray = JSON.stringify(sessionArrUniqueNums);
			//Save to Session
			request.session.numbers = serializedArray;
			//Request to DB
		dbs.databases.verbs.find({_id:{$in:tenRows}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language);
				//Elements of Data Array are equal to random numbers Array. Objects in random order. 
				let mixedWords = helpers.exercises.changePositions(tenRows,templateData);
				response.render("method-1-walk-through",{
					userLoginSession : request.session.login,
					title:"Method 1",
					randomRows:mixedWords //Array of objects {rusWord:"Ѓыть",engArray:["be","was, were","been"]}
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
		}
	}
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