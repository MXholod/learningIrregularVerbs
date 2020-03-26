/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

//Panel slide up and down
(function(){
			var blocking = false;//For cancel event if this event in progress 
			var direction = false;
			window.onload = function(){
				var panel = document.querySelector(".settings__base__slidePanel");//Handled element 
				var cssTop = window.getComputedStyle(panel,null).getPropertyValue("top");
				var cssHeight = window.getComputedStyle(panel,null).getPropertyValue("height");
				var top = parseInt(cssTop);//Without px -40
				var height = parseInt(cssHeight);//Height panel without px
				var settings = {
					top:top,
					height:height,//panel height (look up in css file )
					stopPoint:[40,-110],//stop point from the top, stop point from the top
					reverse:[false,true]//false - down, true - up
				};
				var bt = document.getElementById("basePanelText");//Button test
				bt.addEventListener('click',function(){
					if(!blocking){//If "blocking" is true we can't move panel 
						blocking = true;
						start(panel,settings);
					}
					return false;//Cancel event, block to click by panel
				},false);
			};
			//Sets the direction
			function start(el,obj){//Choose movement direction
				if(!direction){ //\!false - true, !true - false
					goDown(el,obj);
				}
				else{
					goUp(el,obj);
				}
			}
			function goDown(el,obj){
				var req;
				loop();
					function loop(){
						if(!obj.reverse[0]){//go down
							if(obj.top >= obj.stopPoint[0]){
								window.cancelAnimationFrame(req);
								direction = true;
								blocking = false;//Remove cancel event
							}else{
								obj.top++;
								el.style.top = obj.top+"px";
								req = window.requestAnimationFrame(loop);
							}
						}
					}	
			}			
			function goUp(el,obj){
				var req;
				loop();
					function loop(){
						if(obj.reverse[1]){
							if(obj.top <= obj.stopPoint[1]){
								window.cancelAnimationFrame(req);
								direction = false;
								blocking = false;
							}else{
								obj.top--;
								el.style.top = obj.top+"px";
								req = window.requestAnimationFrame(loop);
							}
						}
					}
			}
})();

//Session Storage
(()=>{
	//Session Storage preserves object:
	//var settingsObj = {language:"ru",music:"turnOn",userButton:false}; it keeps PanelSettings states
	//Function onceSaveToSessionStorage() creates an object by default, which will be preserved in //SessionStorage when window.onload event will be fired
	function onceSaveToSessionStorage(userBtn){
		//Code for SessionStorage
		if(typeof(Storage) !== "undefined"){
			//Try to get SessionStorage key
			var result = sessionStorage.getItem("settings");
			if(result){//If object has already been written to the SessionStorage (avoid rewriting an object)
				//var JSONsettingsObj = sessionStorage.getItem("settings");
				//var settingsObj = JSON.parse(JSONsettingsObj);
				var settingsObj = JSON.parse(result);
					//Write user profile button state
					settingsObj.userButton = userBtn;
					var newSettingsPanel = JSON.stringify(settingsObj);
					//Set data to the SessionStorage as a JSON String
					sessionStorage.setItem("settings",newSettingsPanel);
				return false;
			}
			//Default values
			var settingsObj = {language:"ru",music:"turnOn",userButton:userBtn};
			//Convert object to JSON format
			var newSettingsPanel = JSON.stringify(settingsObj);
			//Set data to the SessionStorage as a JSON String
			sessionStorage.setItem("settings",newSettingsPanel);
		}else{//Sorry! No Web Storage support
			return false;
		}
	}
	//Set function to window object to have an access in other parts of scripts,
	//write inputs values music and language saveDataToSessionStorage("id",["music | language"])
	//We use this function 'saveDataToSessionStorage' in io.laguage.js file.
	window.saveDataToSessionStorage = function(id,objectProp){
		//Check, is it String?
		function isString(s) {
			return typeof s == "string" || (typeof s == "object" && s.constructor === String);
		}
		var dataInput;
		//id is given as a string
		if(isString(id) && isString(objectProp)){
			if(document.getElementById(id)){
				dataInput = document.getElementById(id);
			}
		}
		//id is given as object html
		else if((typeof id == "object") && isString(objectProp)){
			dataInput = id;//id - incoming this(element)
		}else{
			return false;
		}
		//Code for SessionStorage.
		if(typeof(Storage) !== "undefined"){
			var JSONsettingsObj = sessionStorage.getItem("settings");
			var settingsObj = JSON.parse(JSONsettingsObj);
			//Set changed music state
			settingsObj[objectProp] = dataInput.value;
			var newSettingsPanel = JSON.stringify(settingsObj);
			//Set data to the SessionStorage as a JSON String
			sessionStorage.setItem("settings",newSettingsPanel);
		}else{// Sorry! No Web Storage support..
			return false;
		}
	};
	//Check user profile button, is it appeared or not it depends on Server Session which influence on Pug template where button is. If Session exists then button shows too.
	function saveUserProfileButton(className){
		//Take only one template which Pug was compiled
		var userSettingsPage = document.querySelector(className);
		var cssDisplay = window.getComputedStyle(userSettingsPage,null).getPropertyValue("display");
		if(cssDisplay === "block"){
			return true;
		}else{
			return false;
		}
	}
	//Set again inputs with attribute checked from SessionStorage 
	function setCheckedInputs(){
		if(typeof(Storage) !== "undefined"){
			var JSONsettingsObj = sessionStorage.getItem("settings");
			var settingsObj = JSON.parse(JSONsettingsObj);
			let input = (id)=>{
				if(id){
					let inp = document.getElementById(id);
					inp.checked = true;
				}
			};
			//Check properties of SessionStorage object if it equals to given string we set attribute checked as true.
			if(settingsObj.music == "turnOn"){
				input("onMusic");
			}else if(settingsObj.music == "turnOff"){
				input("offMusic");
			}
			if(settingsObj.language == "rus"){
				input("rus");
			}else if(settingsObj.language == "ukr"){
				input("ukr");
			}
		}else{// Sorry! No Web Storage support..
			return false;
		}
	}
	//Clear SessionStorage data Method1, Method2, Method3
	function clearSessionStorageMethods(){
		var btnProfile = document.getElementById("userSettingsPage");
		btnProfile.addEventListener("click",function(){
			if(typeof(Storage) !== "undefined"){
				if(sessionStorage.getItem("method1")){
					sessionStorage.removeItem("method1");
				}
				if(sessionStorage.getItem("method2")){
					sessionStorage.removeItem("method2");
				}
				if(sessionStorage.getItem("method3")){
					sessionStorage.removeItem("method3");
				}
			}
		},false);
	}
	window.addEventListener("load",()=>{
		//User profile button
		var userBtn = saveUserProfileButton(".settings__base_userPage_profile");
		onceSaveToSessionStorage(userBtn);
		//Rewrite attribute checked
		setCheckedInputs();
		//Clear SessionStorage data Method1, Method2, Method3
		clearSessionStorageMethods();
	},false);
})();

//Music control
(function(){
	window.addEventListener('load',function(){
		//profile - '/authorize' or '/profile'
		//exercises - '/exercises'
		//result - '/show-result'		class="scoreboard__correct-choosen" - here is result 0-50 if 50 Good! less Bad!
		//developers - '/information'
		//methods - '/method1' '/method2' '/method3'
		//Current path of the page 
		var pathName = window.location.pathname;
		//Get Method number
		let methodNum = pathName.indexOf("/method");
			if(methodNum !== -1){
				pathName = "/method";
			}
		//console.log("pathname ",window.location.pathname);
		//Gets audio element
		var parentAU = document.getElementById("bgMusic");
		var audio;
		//If it's not a main page
		if(pathName !== "/"){
			//If Storage exists
			if(typeof(Storage) !== "undefined"){
				var settingsObj = JSON.parse(sessionStorage.getItem("settings"));
				if(settingsObj.music == "turnOn"){
					//Check URL path
					switch(pathName){
						case '/authorize' : audio = parentAU.getElementsByTagName("audio")[1];
							break;
						case '/profile' : audio = parentAU.getElementsByTagName("audio")[1];
							break;
						case '/exercises' : audio = parentAU.getElementsByTagName("audio")[2];
							break;
						case '/method' : audio = parentAU.getElementsByTagName("audio")[3];
							break;
						case '/information' : audio = parentAU.getElementsByTagName("audio")[4];
							break;
						case '/show-result' : 
									//"method1","method2","method3"
									let successResult = getResultFromStorage();
									if(!successResult){
										audio = parentAU.getElementsByTagName("audio")[5];
									}else{
										audio = parentAU.getElementsByTagName("audio")[6];
									}
									if(typeof(audio) !== 'undefined'){
										audio.volume = 0.1;
										audio.loop = false;
										audio.play();
										return;
									}
					}
					if(typeof(audio) !== 'undefined'){
						audio.volume = 0.1;
						audio.loop = true;
						audio.play();
					}
				}else{
					//Check URL path
					switch(pathName){
						case '/authorize' : audio = parentAU.getElementsByTagName("audio")[1];
							break;
						case '/profile' : audio = parentAU.getElementsByTagName("audio")[1];
							break;
						case '/exercises' : audio = parentAU.getElementsByTagName("audio")[2];
							break;
						case '/method' : audio = parentAU.getElementsByTagName("audio")[3];
							break;
						case '/information' : audio = parentAU.getElementsByTagName("audio")[4];
							break;
						case '/show-result' : 
									let successResult = getResultFromStorage();
									if(!successResult){
										audio = parentAU.getElementsByTagName("audio")[5];
									}else{
										audio = parentAU.getElementsByTagName("audio")[6];
									}
									if(typeof(audio) !== 'undefined'){
										audio.loop = false;
										audio.pause();
										audio.currentTime = 0.0;
										return;
									}
					}
					if(typeof(audio) !== 'undefined'){
						audio.pause();
						audio.currentTime = 0.0;
					}
				}
			}
		}
		//Evaluates success result number
		function getResultFromStorage(){
			let storageData;
			let successNum = 0;
			let i = 1;
			//// !sessionStorage.getItem(`method${i}`)
			while(i <= 3){
				if(sessionStorage.getItem(`method${i}`)){
					storageData = sessionStorage.getItem(`method${i}`);
				}
				i++;
			}
			//{"firstPage":[{id:23,result:0},{id:45,result:1}], "gCounter":90, "pageAmount":2}
			storageData = JSON.parse(storageData);
			Object.keys(storageData).forEach(function(key) {
				if(successNum === 1) return;
				//Exclude - pageAmount gCounter
				if((key !== "pageAmount") && (key !== "gCounter")){
					this[key].forEach((el)=>{
						if(parseInt(el.result) !== 0){
							successNum = 1;
							return;
						}
					});
					//console.log(key, ':', this[key]);
				}
			}, storageData);
			return successNum === 0 ? false : true; 
		}
		//Detect radio buttons changing
		function changeMusicState(id,func){
			var radio = document.getElementById(id);
			radio.onchange = function(e){//Input radio is context
				func.call(this,audio,event);
			};
		}
		function turnOnTheMusic(id,func){
			changeMusicState(id,func);
		}
		function turnOffTheMusic(id,func){
			changeMusicState(id,func);
		}
		if(typeof(audio) !== 'undefined'){
			//Turn on the music
			turnOnTheMusic("onMusic",function(au,event){
				//Save data to SessionStorage
				saveDataToSessionStorage(this,"music");//this - "onMusic" - radio button context
				//console.log("Turned on ",event.target);
				au.volume = 0.1;
				au.play();
			});
			//Turn off the music
			turnOffTheMusic("offMusic",function(au){
				//Save data to SessionStorage
				saveDataToSessionStorage(this,"music");//this - "offMusic" - radio button context
				//console.log("Turned off ",this,au);
				au.pause();
				au.currentTime = 0.0;
			});
		}
	});
})();

/***/ })
/******/ ]);