const express = require("express");
let routes = express.Router();

routes.get("/show-result",(request,response)=>{
	response.render("result-show",{
		userLoginSession : request.session.login,
		title:"Show results",
		hash: request.session.hash
	});
});

module.exports = routes;