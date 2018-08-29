function validateData(log,pass){
	var leng=true,textCorrect=true;
		if((log.length < 3) || (pass.length < 5)){
			leng = false;
		}
		if((log.length > 7) || (pass.length > 7)){
			leng = false;
		}
			var template = "^[à-ÿÀ-ßa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var resultLog = reg.test(log);
			var resultPass = reg.test(pass);
		if(!resultLog || !resultPass){
			textCorrect = false;
		}
		if(leng && textCorrect){
			return false;
		}else{
			return true;
		}
}
function validateEmail(email){
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	//var pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var reg = new RegExp(pattern); //
	var result = reg.test(email);
	if(!result){//Email is incorrect
		return false;
	}else{//Email is correct
		return true;
	}
}
module.exports = {validateData,validateEmail};