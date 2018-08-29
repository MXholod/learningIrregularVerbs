const express = require("express");
const dbs = require("../config/db");
const User = require("../models/UserModel");
const date = require("../utils/date");
const validateForm = require("../utils/validateForm");
const emailRestoreSend = require("../utils/emailRestore");
let routes = express.Router();
//Main page 
routes.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	//var d1 = db();
	//global.d1 = d1[0];
	response.render("index",{title:"Irregular verbs"});//,result:d1[1]
});
//Send data by POST method to authenticate
routes.post("/authorize",(request,response)=>{
	//if (!request.body) return res.sendStatus(400);
	var l = request.body.login;
	var p = request.body.pass;
	if(validateForm.validateData(l,p)){//If bad request
		response.redirect(302, '/');
	}else{//If good request
		//Write login to Session
		request.session.login = l;
		//Set data according to the Model UserModel to create structure for DB
		User.login = l;
		User.pass = p;
		//User.email = "alenka78901234@gmail.com";
		User.email = "liksema@i.ua";
			
		//var now_utc = date(response.locals.language);	
		var now = date.preserveTimeToDb();
		//Check User in DB	
		dbs.databases.users.find({"login":User.login,'hash':User.setHash()}, function (err, docs) {
			// docs contains 
			if(docs.length > 0){//User already exists
				//dbs.databases.users.find({"login":User.login,'hash':User.setHash()}, function (err, docs) {
					//Exact user
					//Update data to database
						dbs.databases.users.update({'hash':User.setHash()},{
							login : User.login, 
							password : User.pass,
							email : User.email,
							hash : User.setHash(),
							dateBegin:docs[0].dateBegin,
							dateLastVisit:now
						});
				//});
			}else{
				//User came in the first time
				//Insert data to database
				dbs.databases.users.insert({
					login : User.login, 
					password : User.pass,
					email : User.email,
					hash : User.setHash(),
					dateBegin:now,
					dateLastVisit:now
				});
			}
		});
			//"lan "+response.locals.language - uses in io.js file.
		response.render("profile",{//Send to user profile
			userLoginSession : request.session.login,
			uLogin : User.login,
			//uPassword : User.pass,
			uEmail : User.email, //"masik@i.ua", //User.email //for test
		});
	}
});
//Send data by POST method to restore password and send it to an email
routes.post("/restore",(request,response)=>{
		var email = request.body.email;
		//Validate incoming email address
		var validEmail = validateForm.validateEmail(email);
		if(!validEmail){//If email is incorrect
			response.setHeader('Content-type', 'application/json; charset=utf-8');
			//Send code error 0 to user
			var data = JSON.stringify({"code":0});
			response.send(data);
		}
			//Create request to DB if User exists according to this email
			dbs.databases.users.find({"email":email}, function (err, docs) {
				//If email was found
				if(docs.length > 0){
					//Set values to the object Model User
					User.login = docs[0].login;
					User.pass = User.generatePass();//Create temporary password for user
					//User.email = request.body.emailRestore;
					User.email = email;
					//Set current time
					var now = date.preserveTimeToDb();
						//Update data to database
						dbs.databases.users.update({'email':User.email},{
							login : User.login, 
							password : User.pass,
							email : User.email,
							hash : User.setHash(),
							dateBegin:docs[0].dateBegin,
							dateLastVisit:now
						},{},function(err,numReplaced){
							if(numReplaced == 1){
								//Send an email
								emailRestoreSend(User.email,User.pass);
								response.setHeader('Content-type', 'application/json; charset=utf-8');
								//Send code success 1 to user
								var data = JSON.stringify({"code":1});
								response.send(data);
							}else{
								response.setHeader('Content-type', 'application/json; charset=utf-8');
								//Send code success 0 to user
								var data = JSON.stringify({"code":0});
								response.send(data);
							}
						});
					//Render template
					//response.render("restore",{log:docs[0].login,"URIpart":User.hashURI(),"dataTest":"User login "+User.login+" User pass "+User.pass+" User email "+User.email+" hash "+User.setHash()});
				}else{//If email wasn't found
					response.setHeader('Content-type', 'application/json; charset=utf-8');
					//Send code error 0 to user
					var data = JSON.stringify({"code":0});
					response.send(data);
				}
			});
});

module.exports = routes; 