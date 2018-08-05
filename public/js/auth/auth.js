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
			var template = "^[а-яА-Яa-zA-Z0-9]*$";
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
			resultLog = login.call(this);//Get correct context
			if(resultLog && resultPas){
				document.forms.authentication.elements.sub.disabled = false;//Hide submit button
			}else{
				document.forms.authentication.elements.sub.disabled = true;//Show submit button
				//document.forms.authentication.onsubmit = toSubmit;
			}
		});
		checkWhenLeave("pas",function(){
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
			var emailRes = email.call(this);//Get correct context
			var restoreSubmitEmail = document.getElementById("restoreSubmitEmail");
			if(!emailRes){
				restoreSubmitEmail.disabled = false;//Hide submit button
				restoreSubmitEmail.style.backgroundColor = "#f72d2d";
			}
			else{
				restoreSubmitEmail.disabled = true;//Show submit button
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