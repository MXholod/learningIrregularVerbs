const express = require("express");
const dbs = require("../config/db");
let routes = express.Router();
routes.get("/method1",(request,response)=>{
	let arrIDs = [1,2,3,4,5,6,7,8,9,10];
	dbs.databases.verbs.find({ _id: { $in: arrIDs }}, function (err, docs) {
	// docs contains Earth and Jupiter
		if(docs.length > 0){
			response.render("method-1",{
				userLoginSession : request.session.login,
				title:"Method 1",
				randomRows:docs
			});
		}else{
			response.render("method-1",{
				userLoginSession : request.session.login,
				title:"Method 1"
			});
		}
	});
});
routes.get("/method2",(request,response)=>{
	response.render("method-2",{
		userLoginSession : request.session.login,
		title:"Method 2"
		});
});
routes.get("/method3",(request,response)=>{
	response.render("method-3",{
		userLoginSession : request.session.login,
		title:"Method 3"
		});
});
module.exports = routes;