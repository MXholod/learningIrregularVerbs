function validateData(log,pass){
	var leng=true,textCorrect=true;
		if((log.length < 3) || (pass.length < 5)){
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
module.exports = validateData;