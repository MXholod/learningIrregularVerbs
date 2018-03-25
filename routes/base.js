const db = require("../config/db");
const express = require("express");
let routes = express.Router(); 

routes.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	var d1 = db();
	global.d1 = d1[0];
	response.render("index",{title:"My Index",result:d1[1]});
});
routes.get("/account",(request,response)=>{
	var d2 = db("second","info");
	d2[0].insert({name : "Boris the Blade", year: 1946});
	response.render("account",{title:"My account",result:d2[1]+" "+(global.d1===d2[0])});
});

module.exports = routes; 