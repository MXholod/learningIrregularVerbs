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
				var JSONsettingsObj = sessionStorage.getItem("settings");
				var settingsObj = JSON.parse(JSONsettingsObj);
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
	window.addEventListener("load",()=>{
		//User profile button
		var userBtn = saveUserProfileButton(".settings__base_userPage_profile");
		onceSaveToSessionStorage(userBtn);
		//Rewrite attribute checked
		setCheckedInputs();
	},false);
})();

//Music control
(function(){
	window.addEventListener('load',function(){
		//Detect radio buttons changing
		function changeMusicState(id,func){
			var radio = document.getElementById(id);
			//Gets audio element
			var parentAU = document.getElementById("bgMusic");
			var audio = parentAU.getElementsByTagName("audio")[0];
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
		//Turn on the music
		turnOnTheMusic("onMusic",function(au,event){
			//Save data to SessionStorage
			saveDataToSessionStorage(this,"music");//this - "onMusic"
			//console.log("Turned on ",event.target);
			au.volume = 0.1;
			au.play();
		});
		//Turn off the music
		turnOffTheMusic("offMusic",function(au){
			//Save data to SessionStorage
			saveDataToSessionStorage(this,"music");//this - "offMusic"
			//console.log("Turned off ",this,au);
			au.pause();
			au.currentTime = 0.0;
		});
		
	});
})();