const express = require("express");
const dbs = require("../config/db");
const User = require("../models/UserModel");
const date = require("../utils/date");
const validateForm = require("../utils/validateForm");

let routes = express.Router();
	 
routes.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	//var d1 = db();
	//global.d1 = d1[0];
	response.render("index",{title:"Irregular verbs"});//,result:d1[1]
});
routes.post("/authorize",(request,response)=>{
	//if (!request.body) return res.sendStatus(400);
	var l = request.body.login;
	var p = request.body.pass;
	if(validateForm(l,p)){//If bad request
		response.redirect(302, '/');
	}else{//If good request
		request.session.login = l;
		//Set data according to the Model UserModel
		User.login = l;
		User.pass = p;
		User.email = "";
			
		//var now_utc = date(response.locals.language);	
		var now = date.preserveTimeToDb();
		//Check User in DB	
		dbs.databases.users.find({"login":User.login}, function (err, docs) {
			// docs contains 
			if(docs.length > 0){//User already exists
				dbs.databases.users.find({"login":User.login,'hash':User.getHash()}, function (err, docs) {
					//Exact user
					//Insert data to database
						dbs.databases.users.update({'hash':User.getHash()},{
							login : User.login, 
							password : User.pass,
							email : User.email,
							hash : User.getHash(),
							dateBegin:docs[0].dateBegin,
							dateLastVisit:now
						});
				});
			}else{
				//User came in the first time
				//Insert data to database
				dbs.databases.users.insert({
					login : User.login, 
					password : User.pass,
					email : User.email,
					hash : User.getHash(),
					dateBegin:now,
					dateLastVisit:now
				});
			}
		});
		//"lan "+response.locals.language - uses in io.js file.
		response.render("profile",{
			userLoginSession : request.session.login,
			uLogin : User.login,
			//uPassword : User.pass,
			uEmail : User.email //"masik@i.ua"
		});
	}
});

routes.get("/account",(request,response)=>{
	//var d2 = db("second","info");
	//d2[0].insert({name : "Boris the Blade", year: 1946});
	response.render("account",{title:"My account"});//,result:d2[1]+" "+(global.d1===d2[0])
});

module.exports = routes; 