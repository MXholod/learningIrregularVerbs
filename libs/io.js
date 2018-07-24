module.exports = function(app){
	const server = require('http').Server(app);
	const io = require('socket.io')(server);
	const lang = require("./../config/language");
	var langs = [lang.ru,lang.ua];
	var setLangInd = 0;
	//var language = "ru";
	function parseObjectToArray(object,startProperty,compareIDs){
		if(!(Array.isArray(compareIDs)) || (compareIDs.length == 0)){return false;}
		var mainProp, array = [];
		if(object.hasOwnProperty(startProperty)){
			mainProp = object[startProperty];//"ua","ru" - object property
		}else{
			//console.log("Property doesn't exist in object");
			return false;
		}
		var complitedObject = {};//obj - is an object of arrays
		//This function find properties in Objects and Arrays according to 
		//given Array of property names and return an Object of Arrays compared properties.
		//It calls inside of function - parse() that do the same thing but returns only an Array
		function packArraysToObject(currentProp,arrayData){
				function checkNestsd(prop){
					if(typeof currentProp[prop] === "object" || Array.isArray(currentProp[prop])){
						packArraysToObject(currentProp[prop],arrayData);//Recursion
					}
					else{
						arrayData.push(currentProp[prop]);//If property
					}
				}
				if(Array.isArray(currentProp)){//If Array
					for(var i = 0;i < currentProp.length;i++){
						checkNestsd(i);
					}	
				}
				else if(typeof currentProp === "object"){//If object
					for(var j in currentProp){
						checkNestsd(j);
					}
				}
				else{//If property
					arrayData.push(currentProp);
				}
			}
			//This function parse() is going through Objects and Arrays 
			//getting their values and to packs into a common Array. 
			function parse(prop){
				function checkAndAdd(iter){
					if(typeof prop[iter] === "object" || Array.isArray(prop[iter])){
						parse(prop[iter]);//Recursion
					}
					else{
						array.push(prop[iter]);//If property
					}
				}
				if(Array.isArray(prop)){//If Array
					for(var i = 0;i < prop.length;i++){
						checkAndAdd(i);
					}	
				}
				else if(typeof prop === "object"){//If object
					for(var j in prop){
						for(var ind = 0;ind < compareIDs.length;ind++){
							if(compareIDs[ind] == j){//Compare Object's property with array of IDs
								//console.log(j," - ",prop[j]);
								var arr = new Array();
								packArraysToObject(prop[j],arr);
								complitedObject[compareIDs[ind]] = arr;
							}
						}
						checkAndAdd(j);
					}
				}
				else{//If property
					array.push(prop);
				}
			}
			for(var prop in mainProp){
				parse(mainProp[prop]);
			}
		return complitedObject;//Return object
	}
	//Middleware for
	app.use("/",function(request,response,next){
		//Local variable - language has access in all templates of application, get current language after redirect
		//in base.js file in render('profile') template.
			//response.locals.language = language; 
		//Local variable - lang has access in all templates of application, for language.js file
		response.locals.lang = langs[setLangInd];
		next();
	});
	//Use Socket.I.O
	io.on('connection', function (socket) {
		//console.log("'User connected'");
			socket.on('setLanguage', function (data){
				setLangInd = data.ind;//0 || 1
				//language = data.language;//language - ru || ua,
				var languageObject = parseObjectToArray(lang,data.language,data.ids);
				socket.emit('getLanguage', 
					{  
						language : languageObject,
						ids : data.ids
					});
			});
	});
	return server;
};