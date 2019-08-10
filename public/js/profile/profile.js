//Function creates cross-browser object XMLHttpRequest 
	function getXmlHttp(){
		var xmlhttp;
		try{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");//newer versions of IE5+
		}catch(e){
			try{
				//Old versions of Internet Explorer (IE5 and IE6) use an ActiveX object 
				//instead of the XMLHttpRequest object
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//older versions of IE5+, 
			}catch(E){
				try{
					//проверяем, поддерживает ли событие onload, это старый XMLHttpRequest,
					//значит это IE8,9, и используем XDomainRequest
					if("onload" in new XMLHttpRequest()){
						xmlhttp = new XDomainRequest;
					}else{
						throw new Error("Not IE");
					}
				}catch(Ex){
					xmlhttp = false;
				}
			}
		}
		if(!xmlhttp && typeof(XMLHttpRequest) != 'undefined'){
			xmlhttp = new XMLHttpRequest();//IE7, Firefox, Safari etc
		}
		return xmlhttp;
	}
//Clicking on menu button panels are changing
(function(){
	window.addEventListener("load",function(){
		clearAndSetClassMenu();
	},false);
	var classesArray = [
		"a-profile__menu__settings_active",
		"a-profile__menu__methodOne_active",
		"a-profile__menu__methodTwo_active",
		"a-profile__menu__methodThree_active"
		];
	var pastIndex = 0;	
	var classesArrayMovePanel = [
		"wrapper__profile__move-forward-content",
		"wrapper__profile__move-back-content"
	];	
	function clearAndSetClassMenu(){
		var ul = document.getElementById("profileMenu");
		var LIs = ul.getElementsByTagName("LI");
		for(var i = 0;i<LIs.length;i++){
			(function(j){//Save local variable value
				LIs[j].addEventListener("click",function(){
					//If it is A element
					if(this.firstChild.nodeType === 1){
						//console.log("Element",this.firstChild);
						//If class doesn't exist !false
							removeUnusedClassesMenu(LIs);
							this.firstChild.classList.add(classesArray[j]);
							//Draw the data result, LI element as parameter
							drawData(this);
							movePanels(j);
					}else{
						//console.log("This node type is not an element",this.firstChild.nodeValue);
					}
				},false);
			})(i);
		}
	}
	function removeUnusedClassesMenu(elementsArray){
		var len1 = elementsArray.length;//Array of LI
		var len2 = classesArray.length;//Array of classes
		if(len1 >= 0){
			for(var i = (len1-1); i >= 0;i--){
				for(var j = 0;len2 > j;j++){
					//Check all A elements, do they contain classes
					if(elementsArray[i].firstChild.classList.contains(classesArray[j])){
						elementsArray[i].firstChild.classList.remove(classesArray[j]);
					}
				}
			}
		}else{
			return false;
		}
	}
	function movePanels(idexPanel){
		var parentSection = document.getElementsByClassName('wrapper__profile__content')[0];
		//var panel = parentSection.firstChild;
		var panels = parentSection.getElementsByTagName("SECTION");
		//Click twice on menu button
		if(idexPanel === pastIndex){
			//console.log("Indexes are equal!");
			//It is no need to do nothing if clicking by the same button twice
		}else{
			if(panels[0].classList.contains("wrapper__profile__move-default-content")){
				panels[0].classList.remove("wrapper__profile__move-default-content");
			}
			//Ex panel (disappear)
			if(panels[0].classList.contains(classesArrayMovePanel[0])){
				panels[pastIndex].classList.remove(classesArrayMovePanel[0]);
			}
			panels[pastIndex].classList.add(classesArrayMovePanel[1]);
			//New panel (appear)
			if(panels[0].classList.contains(classesArrayMovePanel[1])){
				panels[idexPanel].classList.remove(classesArrayMovePanel[1]);
			}
			panels[idexPanel].classList.add(classesArrayMovePanel[0]);
			//Save current index to check for the next time
			pastIndex = idexPanel;
			//console.log("Past index is ",pastIndex);
		}
	}
	//Draw data result incoming from server
	function drawData(elLi){
		var methodNum = Number(elLi.dataset.orderexercise);
		//Check a number of a method to detect a panel
		switch(methodNum){
			case 1: requestToServer(1,true).then(function(serverData){
					console.log(serverData);
				}).catch(function(error) {
					console.log("Error!!!");
					console.log(error);
				});
			break;
			case 2: requestToServer(2,true).then(function(serverData){
					console.log(serverData);
				}).catch(function(error) {
					console.log("Error!!!");
					console.log(error);
				});
			break;
			case 3: requestToServer(3,true).then(function(serverData){
					console.log(serverData);
				}).catch(function(error) {
					console.log("Error!!!");
					console.log(error);
				});
			break;
		}
		
	}
	//
	function requestToServer(methodNumber,jsonParse){
		//Get User hash from hidden HTML element
		var hiddenUserHash = document.getElementById("hiddenHash").textContent;
		//Use Promise to get the data
		return new Promise(function(resolve, reject){
			var xmlHttp = getXmlHttp();
			xmlHttp.onload = function(){
				if(jsonParse){
					try{
						resolve(JSON.parse(this.responseText));
					}catch(e){
						reject(e);
					}
				}else{
					resolve(this.responseText);
				}
			};
			xmlHttp.addEventListener("error", function() {
				reject(new Error("Network error"));
			});
			xmlHttp.open('POST','/user_results',true);
			xmlHttp.setRequestHeader('Content-Type','application/json; charset=utf-8');
			//Object to JSON	
			var methodNum = JSON.stringify({methNum:methodNumber,userHash:hiddenUserHash});
			//Send object of data
			xmlHttp.send(methodNum);
		});
	}
})();
//AJAX for adding user's data to rewrite his Login, Password and Email(if exists)
(function(){
	//Keep correct value of Login,Password,Email inputs
	var correctLogPassEmail = [];
	//Show dialogue window before User save his own data
		window.addEventListener('load',function(){
				//Check onkeyup event Login input, Params: id,callback
				check(["login"],login);
				//Check onkeyup event Password input, Params: id,callback
				check(["password"],password);
				//Check onkeyup event Email input, Params: id,callback
				check(["emailWarn","emailNotify"],email);
				//They will keep a state of two inputs - both of them must be correct to show button Submit
					var resultLog = true,resultPas = true;
				//Login onblur event
				checkWhenLeave(["login"],function(){//console.log(this);
					//Call function login() again when leave input 
					resultLog = login.call(this);//Get correct context
					//if(resultLog && resultPas){
					var userSubmit = document.getElementById("userSubmit");
					if(resultLog && resultPas){//Good
						document.forms.resaveUserData.elements.subResaveData.disabled = false;//Show submit button
						userSubmit.style.backgroundColor = "#55e083";
					}else{
						document.forms.resaveUserData.elements.subResaveData.disabled = true;//Hide submit button
						userSubmit.style.backgroundColor = "#ff7266";
						//document.forms.resaveUserData.onsubmit = toSubmit;
					}
				});
				//Password onblur event
				checkWhenLeave(["password"],function(){
					//Call function password() again when leave input
					resultPas = password.call(this);//Get correct context
					var userSubmit = document.getElementById("userSubmit");
					if(resultLog && resultPas){//Good
						document.forms.resaveUserData.elements.subResaveData.disabled = false;//Show submit button
						userSubmit.style.backgroundColor = "#55e083";
					}
					else{
						document.forms.resaveUserData.elements.subResaveData.disabled = true;//Hide submit button
						userSubmit.style.backgroundColor = "#ff7266";
					}
				});
				checkWhenLeave(["emailWarn","emailNotify"],function(){
					//Call function email() again when leave input
					var emailRes = email.call(this);//Get correct context
					if(!emailRes){//"Incorrect"
						//userSubmit.disabled = true;//Hide submit button
					}
					else{//"Correct"
						//userSubmit.disabled = false;//Show submit button
					}
				});
				//Set click event to show dialogue window
				dialogueWin();
				
		});
		//Show dialogue window
		function dialogueWin(){
			//Submit button
			var userSubmit = document.querySelector("#userSubmit");
			//Element smokeBlock
			var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_hide");
			//Add elements by click
			userSubmit.onclick = function(){
				smokeBlock.className = "wrapper__profile__smokeBlock_show";
				//Set click event to hide dialogue window
				removeDialogueWin();
				return false;
			};
		}
		//Hide dialogue window, display sets none.
		function removeDialogueWin(){
			//Button for refusing data save
			var refuseDataToSave = document.querySelector("#refuseDataToSave");
			//Button for accepting data save
			var acceptDataToSave = document.querySelector("#acceptDataToSave");
			//Remove dialogue window and refuse to save user's data
			refuseDataToSave.onclick = function(){
				var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_show");
				smokeBlock.className = "wrapper__profile__smokeBlock_hide";
			};
			//Save user's data through AJAX
			acceptDataToSave.onclick = function(){
				var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_show");
				//Start showing preloader
				var loader = document.querySelector(".wrapper__profile__smokeBlock__loader");
				loader.style.display = "block";
				//Disable the buttons
				var bt = this;
				this.disabled = true;
				refuseDataToSave.disabled = true;
				//Get AJAX object
				var XHR = getXmlHttp();
				XHR.onreadystatechange = function(){
					if((this.readyState == 4) && (this.status == 200)){
						var data = JSON.parse(this.responseText);
						var infoP = document.getElementsByClassName("wrapper__profile__smokeBlock__child-info")[0];
						var paragraphs = infoP.getElementsByTagName("P");
						var tempElLink;
						var t1=null,t2=null;
						t1 = window.setTimeout(function showText(){
							//Hide loader processing...
							loader.style.display = "none";
							switch(data.code){
								case 0 : tempElLink = paragraphs[0];
									infoP.style.display = "block";
									tempElLink.style.zIndex = "2";
									t2 = window.setTimeout(function(){
										hideText();
										if(t1){
											window.clearTimeout(t1);
											t1 = null;
										}
									},3000);
								break;
								case 2 : tempElLink = paragraphs[1];
									infoP.style.display = "block";
									tempElLink.style.zIndex = "2";
									t2 = window.setTimeout(function(){
										hideText();
										if(t1){
											window.clearTimeout(t1);
											t1 = null;
										}
									},3000);
								break;
							}
							function hideText(){
								//console.log("Success ",data.code);
								if(t2){
									window.clearTimeout(t2);
									t2 = null;
								}
								//Hide Text block
								infoP.style.display = "none";
								//Reset z-index text message
								tempElLink.style.zIndex = "auto";
								//Buttons enabled again
								bt.disabled = false;
								refuseDataToSave.disabled = false;
								//Hide smoke block
								smokeBlock.className = "wrapper__profile__smokeBlock_hide";
							}
						},1500);
					}
				};
				XHR.open('POST','/resave',true);
				XHR.setRequestHeader('Content-Type','application/json; charset=utf-8');
				//Prepare object
				var userData;
				if(typeof(correctLogPassEmail[0]) !== "undefined" && typeof(correctLogPassEmail[1]) !== "undefined" && typeof(correctLogPassEmail[2]) !== "undefined"){
					//Set values from validate functions: login(), password() and email(), If user interact with fields
					userData = {
						"login":correctLogPassEmail[0],
						"password":correctLogPassEmail[1],
						"email":correctLogPassEmail[2]
					};
				}else{
					//Take values by default
					var login = document.forms.resaveUserData.elements.login.value;
					var password = document.forms.resaveUserData.elements.password.value;
					var emailW = document.forms.resaveUserData.elements.emailW.value;
					var emailN = document.forms.resaveUserData.elements.emailN.value;
					var emailField = emailW != "" ? emailW : emailN != "" ? emailN : "";
					userData = {
						"login":login,
						"password":password,
						"email":emailField
					};
				}
				//console.log("Before sending: ",userData.login," ",userData.password," ",userData.email);
				//Object to JSON	
				userData = JSON.stringify(userData);
				//Send object of data
				XHR.send(userData);
			};
		}
		//Clear input element when clicked by it
		function clearInput(id){
			var input = document.getElementById(id);
			input.addEventListener("focus",function(){
				this.value = "";
			},false);
		}
		//Call given function each time when type a character
		function check(ids,checkFunc){
			var input;
			for(var i = 0;i<ids.length;i++){
				input = document.getElementById(ids[i]);
				//Make input clear
				clearInput(ids[i]);
				//checkFunc.apply(input);
				input.addEventListener("keyup",checkFunc,false);
			}
		}
		//Call given function when leave an input element
		function checkWhenLeave(ids,func){
			var element;
			for(var i = 0;i<ids.length;i++){
				element = document.getElementById(ids[i]);
			}
			element.addEventListener("blur",func,false);
		}
		//Functions login,password,email are subscribed on events: onkeyup, onfocus, onblur
		function login(){//Check Login
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("wrapper__profile__content_settings-log")[0];
			if((this.value.length < 3) || !result){//"Wrong!"			
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else if((this.value.length > 7) || !result){//"Wrong!"			
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Login is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[0] = this.value;//Remember correct value of Login input
				return true;
			}
		}
		function password(){//Check Password
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("wrapper__profile__content_settings-pass")[0];
			if((this.value.length < 5) || !result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else if((this.value.length > 7) || !result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Password is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[1] = this.value;//Remember correct value of Password input
				return true;
			}
		}
		function email(){
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			//var pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			var reg = new RegExp(pattern);
			var result = reg.test(this.value);
			var warn = this.parentNode;//Get parent Label Element
			if(!result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Email is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[2] = this.value;//Remember correct value of Email input
				return true;
			}
		}
		
})(); 