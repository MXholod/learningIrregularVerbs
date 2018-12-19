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

module.exports = routes;