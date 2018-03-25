const express = require("express");
const app = express();
const db = require("./config/db");

//Set template engine
app.set('view engine','pug');
//Set folder storage of Views
app.set('views',__dirname+'/views');
//Static files storage: 1.URL segment, 2.Folder name.
app.use('/public',express.static('public'));

app.get("/",(request,response)=>{
	//response.send("<h1>Hello</h1>");
	var d1 = db();
	global.d1 = d1[0];
	response.render("index",{title:"My Index",result:d1[1]});
});
app.get("/account",(request,response)=>{
	var d2 = db("second","info");
	d2[0].insert({name : "Boris the Blade", year: 1946});
	response.render("account",{title:"My account",result:d2[1]+" "+(global.d1===d2[0])});
});
//const port = Number(process.env.PORT || 3000);
app.listen(3000,()=>{
	console.log("Listening on port 3000.");
});