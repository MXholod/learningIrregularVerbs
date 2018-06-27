const db = require("../config/db");
const express = require("express");
let routes = express.Router(); 
/*let language;
if(lang.ru !== "ru"){
	language = lang.ru;
}*/
routes.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	//var d1 = db();
	//global.d1 = d1[0];
	//response.render("index",{title:"Irregular verbs",lang:lang.ua});//,result:d1[1]
	response.render("index",{title:"Irregular verbs"});//,result:d1[1]
});
routes.post("/authorize",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	//var d1 = db();
	//global.d1 = d1[0];
	//response.render("index",{title:"Irregular verbs",lang:lang.ua});//,result:d1[1]
	//var l = request.body.login;
	//var p = request.body.pass;
	var d = JSON.stringify(request.body);
	response.render("profile",{data:d});//,result:d1[1]
	//response.render("profile",{login:l,pass:p});//,result:d1[1]
});
routes.get("/account",(request,response)=>{
	//var d2 = db("second","info");
	//d2[0].insert({name : "Boris the Blade", year: 1946});
	response.render("account",{title:"My account"});//,result:d2[1]+" "+(global.d1===d2[0])
});

module.exports = routes; 