const express = require("express");
const app = express();

app.set('view engine','pug');
app.set('views',__dirname+'/views');

app.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	response.render("index",{title:"My Index"});
});
app.get("/account",(request,response)=>{
	response.render("account",{title:"My Account"});
});
//const port = Number(process.env.PORT || 3000);
app.listen(3000,()=>{
	console.log("Listening on port 3000.");
});