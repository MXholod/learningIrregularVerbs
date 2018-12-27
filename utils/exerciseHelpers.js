function parseString(parsedStr = "",delimiter = ","){
	var resultStr;
	//var str = parsedStr || "";
	//Find first word before comma
	var comma = parsedStr.indexOf(delimiter);
	if(comma !== -1){//Comma exists
		resultStr = parsedStr.slice(0,comma);
	}else{//Single word
		resultStr = parsedStr;
	}
	return resultStr;
}
exports.exercises = {
	parseTranslatedString : parseString
};