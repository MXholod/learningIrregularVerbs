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
	//global.d1 = d1[0];
	//Find Russian and Ukrainian verbs and add them to language.js file
	dbs.databases.verbs.find({},function(err, docs){
		if(Array.isArray(docs)){
			let russian = [], ukraine = [];
			docs.forEach((currentValue, index, array)=>{
				//russian[index] = ukraine[index] = currentValue.id_verb;
				russian[index] = currentValue.rus;
				ukraine[index] = currentValue.ukr;
			});
			//Add new properties (Array as a value) for Object from language.js file in memory
			response.locals.languages[0]["translation"] = {
				"verbsList":russian,
				"verbsListPortion":russian
				};//Russian 'verbsList' property; 
			response.locals.languages[1]["translation"] = {
				"verbsList":ukraine,
				"verbsListPortion":ukraine
				};//Ukrainian 'verbsList' property;
			//Load View
			response.render("index",{title:"Irregular verbs"});//
		}else{
			response.render("index",{title:"Irregular verbs"});//
		}
	});
	//response.render("index",{title:"Irregular verbs"});//,result:d1[1]
});
//Send data by POST method to authenticate
routes.post("/authorize",(request,response)=>{
	//if (!request.body) return res.sendStatus(400);
	var l = request.body.login;
	var p = request.body.pass;
	if(validateForm.validateData(l,p)){//If bad request
		response.redirect(302, '/');
	}else{//If good request
		//Set data according to the Model UserModel to create structure for DB
		User.login = l;
		User.pass = p;
		User.email = "";
		//Write login to the Session
		request.session.login = User.login;
		//Write hash to the Session
		request.session.hash = User.setHash();
		//var now_utc = date(response.locals.language);	
		var now = date.preserveTimeToDb();
		//Check User in DB	
		dbs.databases.users.find({'hash':User.setHash()}, function (err, docs) {
			// docs contains 
			if(docs.length > 0){//User already exists
					//Exact user
					//Update data to database
						dbs.databases.users.update({'hash':User.setHash()},{
								login : docs[0].login, 
								password : docs[0].password,
								email : docs[0].email,
								hash : docs[0].hash,
								dateBegin:docs[0].dateBegin,
								dateLastVisit:now
							},{},function(err,numReplaced,affectedDocuments,upsert){
								if(numReplaced == 1){
									var lastVisit = date.retrieveTimeFromDb(docs[0].dateLastVisit,'default');
									response.render("profile",{//Send to user profile
										userLoginSession : request.session.login,
										uLogin : User.login,
										uPassword : User.pass,
										uEmail : docs[0].email, //"masik@i.ua", //User.email //for test
										absentTime : lastVisit
									});
								}
							}
						);
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
				},function(err,newDocs){
					var lastVisit = date.retrieveTimeFromDb(now,'empty');
					response.render("profile",{//Send to user profile
						userLoginSession : request.session.login,
						uLogin : User.login,
						uPassword : User.pass,
						uEmail : User.email, //"masik@i.ua", //User.email //for test
						absentTime : lastVisit
					});
				});
			}
		});
			//"lan "+response.locals.language - uses in io.js file.
		
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
								//Get data from language.js file, to create text for an email.
								var topic = response.locals.lang.serverSisdeOnly.emailRestoring.topic;
								var greeting = response.locals.lang.serverSisdeOnly.emailRestoring.greeting;
								var firstText = response.locals.lang.serverSisdeOnly.emailRestoring.textBeforePassword;
								var secondtText = response.locals.lang.serverSisdeOnly.emailRestoring.textAfterPassword;
//Make body email text
var text = `${greeting} ${User.login}! 
	${User.login}, ${firstText} ${User.pass}
	${User.login}, ${secondtText}`;
								//Send an email
								emailRestoreSend(User.email,topic,text);
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