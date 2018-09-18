//Greeting panel (Starting program)
(function(){
	window.addEventListener('load',function(){
		//Remove greeting panel
		removeGreeting("closeGreeting","greeting");
	},false);
	function removeGreeting(idBtn,idCoverPanel){
		var btn = document.getElementById(idBtn);
		var coverPanel = document.getElementById(idCoverPanel);
		btn.addEventListener('click',function(){
			coverPanel.parentNode.removeChild(coverPanel);
			//First time to play background music
			startPlay();
		},false);
	}
	//Music starts playing
	function startPlay(){
		//Gets audio element
		var parentAU = document.getElementById("bgMusic");
		var audio = parentAU.getElementsByTagName("audio")[0];
		audio.volume = 0.1;
		audio.play();
	}
})();
//Check form fields Authorization and Authentication and 'Sign Up' - registration, 'Sign In' - enter to the system
(function(){
	function clearInput(id){
		var input = document.getElementById(id);
		input.addEventListener("focus",function(){
			this.value = "";
		},false);
	}
	function check(id,checkFunc){
		var input = document.getElementById(id);
		clearInput(id);//Make input clear
		//checkFunc.apply(input);
		input.addEventListener("keyup",checkFunc,false);
	}
	function checkWhenLeave(id,func){
		var element = document.getElementById(id);
		element.addEventListener("blur",func,false);
	}
	window.addEventListener("load",function(){
		var correctLoginAndPass = [];//Keep correct value of Login input
		function login(){//Check Login
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("auth__content__logWarn")[0];
			if((this.value.length < 3) || !result){//3			
				warn.style.visibility = "visible";
				return false;
			}else if((this.value.length > 7) || !result){//3			
				warn.style.visibility = "visible";
				return false;
			}else{//Login is correct
				warn.style.visibility = "hidden";
				correctLoginAndPass[0] = this.value;//Remember correct value of Login input
				return true;
			}
		}
		function password(){//Check Password
			//console.log("Pass ",this);
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("auth__content__passWarn")[0];
			if((this.value.length < 5) || !result){//5 
				warn.style.visibility = "visible";
				return false;
			}else if((this.value.length > 7) || !result){//5 
				warn.style.visibility = "visible";
				return false;
			}else{//Password is correct
				warn.style.visibility = "hidden";
				correctLoginAndPass[1] = this.value;//Remember correct value of Password input
				return true;
			}
		}
		function email(){
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			//var pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			var reg = new RegExp(pattern); //
			var result = reg.test(this.value);
			if(!result){//5 
				this.style.border = "3px solid #f72d2d";
				return false;
			}else{//Email is correct
				this.style.border = "3px solid #1ee33b";
				return true;
			}
		}
		//onkeyup
		check("log",login);//Check onkeyup event Login input
		check("pas",password);//Check onkeyup event Password input
		check("restoreEmail",email);//Check onkeyup event Email input
		
		var resultLog,resultPas;//They will keep a state of two inputs - both of them must be correct to show button Submit
		
		//onblur
		checkWhenLeave("log",function(){//console.log(this);
			//Call function login() again when leave input 
			resultLog = login.call(this);//Get correct context
			if(resultLog && resultPas){
				document.forms.authentication.elements.sub.disabled = false;//Show submit button
			}else{
				document.forms.authentication.elements.sub.disabled = true;//Hide submit button
				//document.forms.authentication.onsubmit = toSubmit;
			}
		});
		checkWhenLeave("pas",function(){
			//Call function password() again when leave input
			resultPas = password.call(this);//Get correct context
			if(resultLog && resultPas){
				document.forms.authentication.elements.sub.disabled = false;//Show submit button
			}
			else{
				document.forms.authentication.elements.sub.disabled = true;//Hide submit button
				//document.forms.authentication.onsubmit = toSubmit;
			}
		});
		checkWhenLeave("restoreEmail",function(){
			//Call function email() again when leave input
			var emailRes = email.call(this);//Get correct context
			var restoreSubmitEmail = document.getElementById("restoreSubmitEmail");
			if(!emailRes){
				restoreSubmitEmail.disabled = true;//Hide submit button
				restoreSubmitEmail.style.backgroundColor = "#f72d2d";
			}
			else{
				restoreSubmitEmail.disabled = false;//Show submit button
				restoreSubmitEmail.style.backgroundColor = "#1ee33b";
			}
		});
		//Submit data to server side
		function toSubmit(){
			//console.log("Log ",correctLoginAndPass[0]," Pass ",correctLoginAndPass[1]);
			//return false;
		}
	},false);
	
})();
//Move Authorization and Authentication panel on main page to forth and back
(()=>{
	window.addEventListener("load",function(){
		movePanelUpDown();
	},false);
	function bindEvent(element,makeMove){
		element.addEventListener("click",makeMove,false);
	}
	//Move panel auth down
	function movePanelUpDown(){
		var authMainPanel = document.getElementById("auth");
		var authPanel = document.getElementById("forgotten");
		bindEvent(authPanel,function(){
			if(this.checked){
				document.forms.authentication.elements.login.value = "";//Clear input value of Form above
				document.forms.authentication.elements.pass.value = "";//Clear input value of Form above
				document.forms.authentication.elements.sub.disabled = true;//Hide submit button of Form above
				window.setTimeout(()=>{
					movePanelUp(authMainPanel);
				},1000);
			}
		});
		var restorePanel = document.getElementById("hideRestore");
		bindEvent(restorePanel,function(e){
			if(e.type == "click"){
				movePanelDown(authMainPanel);
				authPanel.checked = false;
			}
		});
	}
	//Move panel auth up
	function movePanelUp(parentPanel){
		//Remove default class that appears only once
		if(parentPanel.classList.contains("auth__content_default-position")){
			parentPanel.classList.remove("auth__content_default-position");
		}
		if(parentPanel.classList.contains("auth__content_move-positionDown")){
			parentPanel.classList.remove("auth__content_move-positionDown");
		}
		parentPanel.classList.add("auth__content_move-positionUp");
	}
	function movePanelDown(parentPanel){
		if(parentPanel.classList.contains("auth__content_move-positionUp")){
			parentPanel.classList.remove("auth__content_move-positionUp");
		}
		parentPanel.classList.add("auth__content_move-positionDown");
	}
})();
//Prepare for sending email to restore password by AJAX
(()=>{
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
					//проверяем, поддерживает ли событие onload, то это старый XMLHttpRequest,
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
	//Checking out network connection, return Promise	
	function onlineCheck(xhr){  
        var randomNum = Math.round(Math.random() * 10000);
		var baseUrl = "/";
		var isOnline = false;
		return new Promise((resolve, reject)=>{ 
            xhr.onload = () => { 
                // Set online status 
                isOnline = true; 
                resolve(true); 
            }; 
            xhr.onerror = () => { 
                // Set online status 
                isOnline = false; 
                reject(false); 
            }; 
            xhr.open('GET', baseUrl+"?rand="+randomNum, true);
            xhr.send();  
		}); 
    }
	//Check connection
	function clickHandler(){
		//Get an XMLHttpRequest for checking network connection and AJAX.
        let XHR = getXmlHttp();
		onlineCheck(XHR).then(() => { 
            //Has an internet connection, carry on working with AJAX.  
			sendAjax(XHR);
        }).catch(()=> { 
            //Hasn't internet connection, let the user know about it. 
            //var element = document.querySelector(".auth__content_restore-shadow_networkConnectionError");
			//element.style.display = "block";
			clearAuthByTime(".auth__content_restore-shadow_networkConnectionError",3000); 
        }); 
	}
	//Move back state of elements by time (Different notifications - text which received as result from server).
	function clearAuthByTime(element,time){
		//Base elements 
		var shadow,loadingElem;
		//Timeout settings 
		var t1,t2,time1=300,time2= time || 2000,counter=0,limit=3;
		t1 = window.setTimeout(function start(){
			showHide();
			t2 = window.setTimeout(start,time2);
			if(counter >= limit){
				window.clearTimeout(t2);
				t2 = null;
			}
		},time1);
		function showHide(){
			if(t1){
				window.clearTimeout(t1);
				t1 = null;
			}
			counter++;//It becomes 1
			//DIV Black, half transparent 
			shadow = document.querySelector(".auth__content_restore-shadow");
			if(counter == 1){//Show loading (Step 1)
				//Loading... block, Show element
				loadingElem = document.querySelector(".auth__content_restore-shadow_loadingProcess");
				loadingElem.style.display = "block";
				//Main shadow block, Show element
				shadow.style.display = "block";
			}
			if(counter == 2){//Hide loading and Show given element (Step 2)
				if(loadingElem){loadingElem.style.display = "none";}
				element = document.querySelector(element);
				element.style.display = "block";
			}
			if(counter == 3){//Hide main shadow element and given element (Step 3)
				if(element){element.style.display = "none";}
				shadow.style.display = "none";
			}
		}
	}
	//Try to send email address by AJAX
	function callAjax(){
		//Submit button
		let submit = document.querySelector("#restoreSubmitEmail");
		//Main transparent black box 
		let shadow = document.querySelector(".auth__content_restore-shadow");
		submit.onclick = function(){
			//console.log(this);
			shadow.style.display = "block";
			clickHandler();
			return false;
		};
	}
	//AJAX function
	function sendAjax(XHR){
		var email = document.getElementById("restoreEmail");
			XHR.onreadystatechange = function(){
					if((XHR.readyState == 4) && (XHR.status == 200)){
							var result = JSON.parse(XHR.responseText);
							//console.log("Email doesn't exist ",result.code);
							//document.getElementById("ajaxTest").innerHTML = result.email+"\r\n "+result.text;
							var code = Number(result.code);
						switch(code){
							case 0 : clearAuthByTime(".auth__content_restore-shadow_absentUserByEmail",4000);
									//console.log("Hey ",code," ",result.email);
								break;
							case 1 : clearAuthByTime(".auth__content_restore-shadow_emailSuccessfullySent",4000);
								break;
						}
					}else{
						//Если код ответа сервера не 200, то это ошибка, обработать ошибку.
						//console.log("My error ", XHR.status + ': ' + XHR.statusText ); // пример вывода: 404: Not Found 
					}
			}
			//XHR.timeout = 4000;
			//XHR.ontimeout = function() {
				//Hide shadow block after long request	
				//console.log( 'Извините, запрос превысил максимальное время' );
			//}
			//XHR.onerror = function() {
			//	console.log( 'Извините,error' );
			//}
				XHR.open("POST", "/restore", true);
				XHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				var data = JSON.stringify({"email":email.value});	
				XHR.send(data);
	}
	window.addEventListener("load",()=>{
		callAjax();
	},false);
	
})(); 