const path = require("path");
const express = require("express");
const app = express();
const baseRouts = require("./routes/base");

//Set template engine
app.set('view engine','pug');
//Set folder storage of Views
app.set('views',[__dirname+'/views',__dirname+'/views/main-page']);
//Static files storage: 1.URL segment, 2.Folder name.
app.use('/public',express.static(path.join(__dirname,'public')));

//Middleware for Base routing registration
app.use("/",baseRouts);

//const port = Number(process.env.PORT || 3000);
app.listen(3000,()=>{
	console.log("Listening on port 3000.");
});