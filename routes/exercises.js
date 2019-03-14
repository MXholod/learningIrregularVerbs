const express = require("express");
const dbs = require("../config/db");
const helpers = require("../utils/exerciseHelpers");
const method_1 = require("../models/exercises_methods/Method_1");

let routes = express.Router();
//Range of word rows on each page
const rowsAmount = 30;//Must be 50
routes.get("/method1",(request,response)=>{
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//Ten rows each time
	let tenRows;
	//First time visit http://localhost:3000/method1?currentPageAmount=1
	if(Number(request.query.currentPageAmount) == 1 && !request.session.numbers){//&& !request.session.numbers
		//Get unique numbers from given range - 50
			let arrUniqueNums = helpers.exercises.uniqueNumbers(rowsAmount,70);//Get 30 from 70
		//Create object with IDs and spoiled IDs: {IDs:[...],spoiledPortionsIDs:[[...],[...],[...],[...],[...]]}
		//Call this Method only once. 50 and 25. Divide to spoiled and normals IDs for all 5 pages.
			let objectIDs = method_1.cutForSpoiledIDs(arrUniqueNums);

		let t1 = objectIDs.IDs.length;
		//The first parameter is an Object with all IDs and the second is GET parameter.
		//Return Array with [['Normal with spoiled'],[only normal],[only spoiled]]
			let threeArrays = method_1.getPortionIDs(objectIDs,request.query.currentPageAmount);	
		
		let t2 = objectIDs.IDs.length;
		//Serialize data, last 40 rows and spoiled
			let serializedArray = JSON.stringify(objectIDs);
		//Save to Session 40 rows
			request.session.numbers = serializedArray;
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:threeArrays[0]}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
				
				//Set specific property 'spoiled' for each object.
				let templateDataSpoiled = method_1.preparedVerbs(templateData,threeArrays);		
				//Elements of Data Array are equal to random numbers Array. Objects in random order.
				//threeArrays[1],templateDataSpoiled
				let mixedWords = helpers.exercises.changePositions(threeArrays[1],templateDataSpoiled);
				
				response.render("method-1",{
					userLoginSession : request.session.login,
					title:"Method 1",
					randomRows: mixedWords,//
					currentNum: (Number(request.query.currentPageAmount)+1),//Query string argument for next page
					test : threeArrays[0].join(",")+" - "+threeArrays[0].length,
					test2 : threeArrays[1].join(",")+" - "+threeArrays[1].length,
					test3 : threeArrays[2].join(",")+" - "+threeArrays[2].length,
					test4 : "Result: t1 "+t1+" t2 "+t2
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}else{//Each other time
		//If Session exists
		if(request.session.numbers){
			//Array with [['Normal with spoiled'],[only normal],[only spoiled]] 
			//Unique numbers from Session 40,30,20,10
			let sessionObjectIDs = JSON.parse(request.session.numbers);
			
			let t1 = sessionObjectIDs.IDs.length;
				//The first parameter is an Object with all IDs and the second is GET parameter.
				//Return Array with [['Normal with spoiled'],[only normal],[only spoiled]]
				let threeArrays = method_1.getPortionIDs(sessionObjectIDs,request.query.currentPageAmount);
				
			let t2 = sessionObjectIDs.IDs.length;	
				//Serialize data, last 40 rows and spoiled
				let serializedArray = JSON.stringify(sessionObjectIDs);
				//Save to Session 30 rows
				request.session.numbers = serializedArray;
				//Request to DB
			dbs.databases.verbs.find({_id:{$in:threeArrays[0]}},function(err, docs){
				if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
					let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
					//Set specific property 'spoiled' for each object.
					let templateDataSpoiled = method_1.preparedVerbs(templateData,threeArrays);
					//Elements of Data Array are equal to random numbers Array. Objects in random order. 
					let mixedWords = helpers.exercises.changePositions(threeArrays[1],templateDataSpoiled);
					response.render("method-1-walk-through",{
						userLoginSession : request.session.login,
						title:"Method 1",
						randomRows: mixedWords,//
						//Query string argument for next page
						currentNum: (Number(request.query.currentPageAmount)+1),
						test : threeArrays[0].join(",")+" - "+threeArrays[0].length,
						test2 : threeArrays[1].join(",")+" - "+threeArrays[1].length,
						test3 : threeArrays[2].join(",")+" - "+threeArrays[2].length,
						test4 : "Result: t1 "+t1+" t2 "+t2
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