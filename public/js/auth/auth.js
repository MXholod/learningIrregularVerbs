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
	function startPlay(){
		//Gets audio element
		var parentAU = document.getElementById("bgMusic");
		var audio = parentAU.getElementsByTagName("audio")[0];
		audio.volume = 0.7;
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
			if((this.value.length < 3) || !result){//			
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
			var template = "^[a-zA-Z0-9]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("auth__content__passWarn")[0];
			if((this.value.length < 5) || !result){// 
				warn.style.visibility = "visible";
				return false;
			}else{//Password is correct
				warn.style.visibility = "hidden";
				correctLoginAndPass[1] = this.value;//Remember correct value of Password input
				return true;
			}
		}
		//onkeyup
		check("log",login);//Check onkeyup event Login input
		check("pas",password);//Check onkeyup event Password input
		
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
				document.forms.authentication.elements.sub.disabled = false;//Hide submit button
			}
			else{
				document.forms.authentication.elements.sub.disabled = true;//Show submit button
				//document.forms.authentication.onsubmit = toSubmit;
			}
		});
		//Submit data to server side
		function toSubmit(){
			//console.log("Log ",correctLoginAndPass[0]," Pass ",correctLoginAndPass[1]);
			//return false;
		}
	},false);
	
})();