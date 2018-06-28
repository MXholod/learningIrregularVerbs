const db = require("../config/db");
const express = require("express");
let routes = express.Router();
	function validateData(log,pass){
		var leng=true,textCorrect=true;
		if((log.length < 3) || (pass.length < 5)){
			leng = false;
		}
			var template = "^[à-ÿÀ-ßa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var resultLog = reg.test(log);
			var resultPass = reg.test(pass);
		if(!resultLog || !resultPass){
			textCorrect = false;
		}
		if(leng && textCorrect){
			return false;
		}else{
			return true;
		}
	} 
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
	//if((l.length < 3) || (p.length < 5)){
	if(validateData(l,p)){
		response.redirect(302, '/');
	}else{
		var user = {"login":l,"password":p};
		var jsonUser = JSON.stringify(user);
		//var d = JSON.parse(z);
		//response.writeHead(200,{'Content-Type':'text/html'});
		response.render("profile",{data:user.login+" "+user.password+" "+user.login.length});
	}
});

routes.get("/account",(request,response)=>{
	//var d2 = db("second","info");
	//d2[0].insert({name : "Boris the Blade", year: 1946});
	response.render("account",{title:"My account"});//,result:d2[1]+" "+(global.d1===d2[0])
});

module.exports = routes; 