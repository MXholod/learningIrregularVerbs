const path = require("path");
const dbs = require("./config/db");
dbs.createDataBases("users");
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const baseRouts = require("./routes/base");
const server = require("./libs/io")(app);

//Set template engine
app.set('view engine','pug');
//Set folder storage of Views
app.set('views',[__dirname+'/views',__dirname+'/views/main-page']);
//Static files storage: 1.URL segment, 2.Folder name.
app.use('/public',express.static(path.join(__dirname,'public')));

//Middleware for Body-Parser //POST and other requests
	//app.use(bodyParser());//First way
//support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended:false}));

//Middleware for Session
app.use(session({secret:"irregularVerbs"}));

//Middleware for Base routing registration
app.use("/",baseRouts);

//const port = Number(process.env.PORT || 3000);
server.listen(3000,()=>{//"127.0.0.1",
	console.log("Listening on port 3000.");
});