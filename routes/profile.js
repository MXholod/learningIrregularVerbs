const express = require("express");
const dbs = require("../config/db");
const User = require("../models/UserModel");
const date = require("../utils/date");
const validateForm = require("../utils/validateForm");
let routes = express.Router();

//AJAX
routes.post("/resave",(request,response)=>{
	//NEW Login, Password, Email.
	var log = request.body.login;
	var pass = request.body.password;
	var email = request.body.email || "";
	//Validate Login,Password,Email
	if(validateForm.validateData(log,pass)){//If bad data
		//Validate incoming login and password
		var logPass = validateForm.validateData(log,pass);
		
		if(logPass){//true
			response.setHeader('Content-type', 'application/json; charset=utf-8');
			//Send code error 0 to user
			var data = JSON.stringify({"code":0});
			response.send(data);
		}
	}else{
		//Validate incoming email address
		if(email != ""){
			var validEmail = validateForm.validateEmail(email);
			if(!validEmail){//If wrong email was detected
				response.setHeader('Content-type', 'application/json; charset=utf-8');
				//Send code error 0 to user
				var data = JSON.stringify({"code":0});
				response.send(data);
			}
		}
		//Get session hash to identify the User in DB
			var hash = request.session.hash;
			//Get current time
			var now = date.preserveTimeToDb();
				//Find User in DB by hash from Session
				dbs.databases.users.find({'hash':hash},function(err, docs){
					//User exists and create data according to the Model User
					User.login = log;
					User.pass = pass;
					User.email = email;
					if(docs.length > 0){
							//Update data to database
							dbs.databases.users.update({'hash':hash},{
								login : User.login, 
								password : User.pass,
								email : User.email,
								hash : User.setHash(),
								dateBegin:docs[0].dateBegin,
								dateLastVisit:now
							},{},function(err,numReplaced){
								if(numReplaced == 1){
									//Change Session hash to new
									request.session.hash = User.setHash();
									//Set header
									response.setHeader('Content-type', 'application/json; charset=utf-8');
									//Send this object information back to User, 1 (is good)
									var data = JSON.stringify({"code":2});
									response.send(data);
								}
							});
					}else{//User is absent in DB - never happens, if user might came in profile he is present in DB
						//Set header
						response.setHeader('Content-type', 'application/json; charset=utf-8');
						//Send this object information back to User, 0 (is bad)
						var data = JSON.stringify({"code":1});
						response.send(data);
					}
				});
	}
});
//Go to the list of Irregular Verbs
routes.get("/listVerbs",(request,response)=>{
	//Array of list Verbs
	dbs.databases.verbs.find({}, function (err, docs) {
		//User found according to the Session
		if(docs.length > 0){
			//var verbsList = response.locals.lang.verbsList;
			var verbsList = response.locals.lang.translation.verbsList;
			response.render("listVerbs",{userLoginSession : request.session.login,verbs : docs});
		}else{
			//
			var verbsList = response.locals.lang.translation.verbsList;
			response.render("listVerbs",{userLoginSession : request.session.login,verbs : verbsList});
		}
	});
});
//Route to profile when button was clicked in 'slidePanel'
routes.get("/profile",(request,response)=>{
	var sessionHash = request.session.hash;
	dbs.databases.users.find({'hash':sessionHash}, function (err, docs) {
		//User found according to the Session
		if(docs.length > 0){
			//Get saved previous date from Session to show User last visit
			var lastVisit = date.retrieveTimeFromDb(request.session.dateBeforeNow,'default');
			response.render("profile",{//Send to user profile
				userLoginSession : request.session.login,
				userHashSession : sessionHash,
				uLogin : docs[0].login,
				uPassword : docs[0].password,
				uEmail : docs[0].email,
				absentTime : lastVisit
			});
		}else{//If Session is absent go to the main page
			response.render("index",{title:"Irregular verbs"});//
		}
	});
});
routes.get("/exercises",(request,response)=>{
	if(request.session.numbers){
		request.session.numbers = "";
	}
	response.render("exercises",{//Go to exercises
		userLoginSession : request.session.login
	});
});
//Get the list of Irregular Verbs by AJAX
/*routes.post("/getListVerbs",(request,response)=>{
	//Array of list Verbs
	var verbsList = response.locals.lang.verbsList;
	//Set header
	response.setHeader('Content-type', 'application/json; charset=utf-8');
	//Send this object information back to User, 1 (is good)
	var data = JSON.stringify({"verbs":verbsList});
	response.send(data);
});*/
//AJAX processing
routes.post("/user_results",(request,response)=>{
	//Send code error 0 to user
	/*var obj = {
			"methodNumber": request.body.methNum,
			"hashUser": request.body.userHash
		};*/
	dbs.databases["method"+request.body.methNum].find({ hash: request.body.userHash }, function (err, docs) {
		// docs is an array containing documents, If no document is found, docs is equal to []
			//Sort the Array
			function makeSort(a,b){
				return a.dateTime - b.dateTime;
			}
			//Sort and rotate 'docs' in reverse order
			let sorted = docs.sort(makeSort).reverse();
		//Prepare the data
		let data = JSON.stringify([request.body.methNum,sorted]);
		response.setHeader('Content-type', 'application/json; charset=utf-8');
		response.send(data);
	});
});
//Get User's failed result
routes.post("/user-failed-results",(request,response)=>{
	let db = "m"+request.body.method+"_failed";//m1_failed
	//"uid":"EOXhq4OocCN4afEF","login":"Maximus","failedAsString":"87,33,64,16","dateTime":1572020667139,"
	dbs.databases[db].find({"uid":request.body.id,"dateTime": Number(request.body.dt) }, function (err, docs){
		//let data = {"login": docs[0].login, "ids": docs[0].failedAsString,"date":request.body.dt};
		//dbs.databases.verbs.find( {"_id": docs[0].failedAsString},function(err, docs){
			//Prepare the data
			let arrOfStringNumbers = docs[0].failedAsString.split(",");//"22,1,45,3" -> ["22","1","45","3"]
			let arrOfNumbers = arrOfStringNumbers.map((item,ind,arr)=>{//[22,1,45,3]
				//return { "_id" : Number(item) };
				return  Number(item);
			});
			dbs.databases.verbs.find( { "_id": { $in : arrOfNumbers } },function(err, docs){
				let result = {
					"incomingData" : docs,//arrOfNumbers,
					"currentLanguage": request.body.language
				};
				//let dataToSearch = JSON.stringify(docs[0].failedAsString);
				let dataToSearch = JSON.stringify(result);
				response.setHeader('Content-type', 'application/json; charset=utf-8');
				response.send(dataToSearch);
			});
	});
});
//Deleting user's data results
routes.delete("/delete-user-result",(request,response)=>{
	let hash = request.body.hash;
	let db_method = "method"+request.body.method;//"method1"
	let m_method_db = "m"+request.body.method+"_failed";//m1_failed
		//First DB to select
		dbs.databases[db_method].find({"hash":hash }, function (err, docs){
			if(docs.length > 0){
				//First DB to delete
				dbs.databases[m_method_db].remove({ "uid":docs[0].uid }, { multi: true }, function (err, numRemoved) {
					//Second DB delete
					dbs.databases[db_method].remove({ "uid":docs[0].uid }, { multi: true }, function (err, numRemoved2) {
						//Send object with success status to the client
						const responseToClient = {status:false};
						if(numRemoved == numRemoved2){//The number of deleted rows is the same in both databases
							responseToClient.status = true;
						}else{
							responseToClient.status = false;
						}
						let methodDeleted = JSON.stringify(responseToClient);
						response.setHeader('Content-type', 'application/json; charset=utf-8');
						response.send(methodDeleted);
						
					});
				});
			}
		});
});
module.exports = routes;