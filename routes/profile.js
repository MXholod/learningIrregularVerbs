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
	response.render("listVerbs",{userLoginSession : request.session.login});
});

module.exports = routes;