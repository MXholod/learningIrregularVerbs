const express = require("express");
const dbs = require("../config/db");
const helpers = require("../utils/exerciseHelpers");
const method_1 = require("../models/exercises_methods/Method_1");
const method_2 = require("../models/exercises_methods/Method_2");
const method_3 = require("../models/exercises_methods/Method_3");
const infoLog = require("../utils/infoLogger");
const errLog = require("../utils/errorLogger");
let routes = express.Router();
//First method route
routes.get("/method1",(request,response)=>{
	//Range of word rows on each page
	const rowsAmount = 75;//Must be 75
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//First time visit http://localhost:3000/method1?currentPageAmount=1
	if(Number(request.query.currentPageAmount) == 1 && !request.session.numbers){//&& !request.session.numbers
		//Get unique ID numbers from given range - 75
			let arrUniqueNums = helpers.exercises.uniqueNumbers(rowsAmount,150);//Get 75 from 150
			//Create object with IDs and spoiled IDs: {IDs:[...],spoiledPortionsIDs:[[...],[...],[...],[...],[...]]}
		//Call this Method only once. 50 and 25. Divide to spoiled and normals IDs for all 5 pages.
			let objectIDs = method_1.cutForSpoiledIDs(arrUniqueNums);
		//The first parameter is an Object with all IDs and the second is GET parameter.
		//Return Array with [['Normal with spoiled'],[only normal],[only spoiled]]
			let threeArrays = method_1.getPortionIDs(objectIDs,request.query.currentPageAmount);	
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
					randomRows: mixedWords,
					//Query string argument for next page
					currentNum: (Number(request.query.currentPageAmount)+1)
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}
});
routes.post("/method1",(request,response)=>{
	const dataMethod = {numbers:[],pageNumber:0,randomRows:[]};
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//If Session exists
	if(request.session.numbers && (Number(request.body.page) <= 5)){
		//Array with [['Normal with spoiled'],[only normal],[only spoiled]] 
		//Unique numbers from Session 40,30,20,10
		let sessionObjectIDs = JSON.parse(request.session.numbers);
		//The first parameter is an Object with all IDs and the second is GET parameter.
			//Return Array with [['Normal with spoiled'],[only normal],[only spoiled]]
			let threeArrays = method_1.getPortionIDs(sessionObjectIDs,(Number(request.body.page) + 1));	
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
				//
				dataMethod.pageNumber = (Number(request.body.page) + 1);
				dataMethod.randomRows =  mixedWords;
				//Send headers
				response.setHeader('Content-type', 'application/json; charset=utf-8');
				response.send(JSON.stringify(dataMethod));
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});	
	}else{
		//Method is finished
		dataMethod.pageNumber = 6;
		dataMethod.randomRows = [];//mixedWords;
		//Send headers
		response.setHeader('Content-type', 'application/json; charset=utf-8');
		response.send(JSON.stringify(dataMethod));
	}
});
routes.get("/method2",(request,response)=>{
	//Range of word rows on each page
	const rowsAmount = 50;//Must be 50
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//First time visit http://localhost:3000/method2?currentPageAmount=1
	if(Number(request.query.currentPageAmount) == 1 && !request.session.numbers){//&& !request.session.numbers
		//Get unique ID numbers from given range - 50
			let arrUniqueNums = helpers.exercises.uniqueNumbers(rowsAmount,150);//Get 50 from 150
		//Get array [[The first is: 10 ],[The remainder is: 40]]
		let twoArraysIDs = method_2.getPortionIDs(arrUniqueNums);
		//Serialize the rest of IDs.
		let serializedArray = JSON.stringify(twoArraysIDs[1]);
		//Save the rest of IDs to the Session.
		request.session.numbers = serializedArray;
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:twoArraysIDs[0]}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
				//Set an empty field to each row. Get two arrays.[[all objects],[missing words]]
				let twoArray = method_2.setEmptyFieldInRow(templateData);
				//Elements of Data Array are equal to random numbers Array. Objects in random order.
				let mixedWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[0]);
				//Render template with data
				response.render("method-2",{
					userLoginSession : request.session.login,
					title:"Method 2",
					//Query string argument for next page
					currentNum: (Number(request.query.currentPageAmount)+1),
					dropableRows: mixedWords,
					singleWords: twoArray[1]
				//lastLength: `${twoArray[1][0].word} - ${twoArray[1][1].word} - ${twoArray[1][2].word} - ${twoArray[1][3].word} - ${twoArray[1][4].word} - ${twoArray[1][5].word} - ${twoArray[1][6].word} - ${twoArray[1][7].word} - ${twoArray[1][8].word} - ${twoArray[1][9].word}`
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}
});
routes.post("/method2",(request,response)=>{
	let dataMethod = {pageNumber:0,dropableRows:[],singleWords:[]};
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//If Session exists
	if(request.session.numbers && (Number(request.body.page) <= 5)){
		//Each other time
			let arrUniqueNums = JSON.parse(request.session.numbers);
		//Get array [[...],[...]]
			let twoArraysIDs = method_2.getPortionIDs(arrUniqueNums);
		//Serialize the rest of IDs.
			let serializedArray = JSON.stringify(twoArraysIDs[1]);
		//Save the rest of IDs to the Session.
			request.session.numbers = serializedArray;
		
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:twoArraysIDs[0]}},function(err, docs){
			if(docs.length > 0){
				//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
				//Set an empty field to each row. Get two arrays.[[all objects],[missing words]]
				let twoArray = method_2.setEmptyFieldInRow(templateData);
				//Elements of Data Array are equal to random numbers Array. Objects in random order.
				let mixedWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[0]);
				//userLoginSession : request.session.login,
				//title:"Method 2",
				//Prepare data for the response
					dataMethod.pageNumber = (Number(request.body.page) + 1);
					dataMethod.dropableRows = mixedWords;
					dataMethod.singleWords = twoArray[1];
				//Send headers
				response.setHeader('Content-type', 'application/json; charset=utf-8');
				response.send(JSON.stringify(dataMethod));
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});	
	}else{
		//Method is finished
		dataMethod.pageNumber = 6;
		dataMethod.dropableRows = [];
		dataMethod.singleWords = [];
		//Send headers
		response.setHeader('Content-type','application/json; charset=utf-8');
		response.send(JSON.stringify(dataMethod));
	}
});
routes.get("/method3",(request,response)=>{
	//Range of word rows on each page
	const rowsAmount = 50;//Must be 50
	//Get current language rus|ukr
	let language = response.locals.lang.identifier;
	//First time visit http://localhost:3000/method2?currentPageAmount=1
	if(Number(request.query.currentPageAmount) == 1 && !request.session.numbers){//&& !request.session.numbers
		//Get unique ID numbers from given range - 50
			let arrUniqueNums = helpers.exercises.uniqueNumbers(rowsAmount,150);//Get 50 from 150
		//Get array [[The first is: 10 ],[The remainder is: 40]]
		let twoArraysIDs = method_3.getPortionIDs(arrUniqueNums);
		//Serialize the rest of IDs.
		let serializedArray = JSON.stringify(twoArraysIDs[1]);
		//Save the rest of IDs to the Session.
		request.session.numbers = serializedArray;
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:twoArraysIDs[0]}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
				//Set an empty field to each row. Get two arrays.[[all objects],[missing words]]
				let twoArray = method_3.setEmptyFieldInRow(templateData);
				//Elements of Data Array are equal to random numbers Array. Objects in random order.
				let mixedWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[0]);
				//Elements of Single words data Array are equal to random numbers Array.
				let mixedSingleWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[1]);
				//Render template with data
				response.render("method-3",{
					userLoginSession : request.session.login,
					title:"Method 3",
					//Query string argument for next page
					currentNum: (Number(request.query.currentPageAmount)+1),
					dropableRows: mixedWords,
					singleWords: mixedSingleWords,
				//lastLength: `${mixedSingleWords[0].word} - ${mixedSingleWords[1].word} - ${mixedSingleWords[2].word} - ${mixedSingleWords[3].word} - ${mixedSingleWords[4].word} - ${mixedSingleWords[5].word} - ${mixedSingleWords[6].word} - ${mixedSingleWords[7].word} - ${mixedSingleWords[8].word} - ${mixedSingleWords[9].word}`
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}else{//Each other time
		let arrUniqueNums = JSON.parse(request.session.numbers);
		//Get array [[...],[...]]
		let twoArraysIDs = method_3.getPortionIDs(arrUniqueNums);
		//Serialize the rest of IDs.
		let serializedArray = JSON.stringify(twoArraysIDs[1]);
		//Save the rest of IDs to the Session.
		request.session.numbers = serializedArray;
		//Request to DB
		dbs.databases.verbs.find({_id:{$in:twoArraysIDs[0]}},function(err, docs){
			if(docs.length > 0){
			//Create an Array of data objects [{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..]
				let templateData = helpers.exercises.arrayOfTasks(docs,language,true);
				//Set an empty field to each row. Get two arrays.[[all objects],[missing words]]
				let twoArray = method_3.setEmptyFieldInRow(templateData);
				//Elements of Data Array are equal to random numbers Array. Objects in random order.
				let mixedWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[0]);
				//Elements of Single words data Array are equal to random numbers Array.
				let mixedSingleWords = helpers.exercises.changePositions(twoArraysIDs[0],twoArray[1]);
				//Render template with data
				response.render("method-3-walk-through",{
					userLoginSession : request.session.login,
					title:"Method 3",
					//Query string argument for next page
					currentNum: (Number(request.query.currentPageAmount)+1),
					dropableRows:mixedWords,
					singleWords: mixedSingleWords,
					//lastLength: `${mixedSingleWords[0].word} - ${mixedSingleWords[1].word} - ${mixedSingleWords[2].word} - ${mixedSingleWords[3].word} - ${mixedSingleWords[4].word} - ${mixedSingleWords[5].word} - ${mixedSingleWords[6].word} - ${mixedSingleWords[7].word} - ${mixedSingleWords[8].word} - ${mixedSingleWords[9].word}`
				});
			}else{
				request.session.numbers = "";
				redirect(301,'/exercises');
			}
		});
	}
});
module.exports = routes;