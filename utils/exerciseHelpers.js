//This method is for getting first chunk of a string by comma
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
//Check is number
function isNumeric(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function proveNum(dimension){
	//Number greater than 0
	if(isNumeric(dimension) && dimension > 0){
		return true;
	}
	return false;
}
//Create an Array of unique numbers
function createNumbersArray(elements,totalSize){//10,10
	var arrUnique = [],arrTemp = [];//Empty Array 
	//Are parameters natural numbers?
	if(!proveNum(elements) || !proveNum(totalSize)){
		return false;
	}
	//Start generating
	generate();
	//Generate an Array of non-unique values
	function generate(){
		//Assign a random number to the first element of an Array 
		arrTemp[0] = Math.round(Math.random()*(totalSize-1))+1;//Random number from 1 to 10, 1-10
		if(arrTemp.length < elements){//1 < 10
			var randN = Math.round(Math.random()*(totalSize-1))+1;//1-10
			for(var i = 0;i < arrTemp.length;i++){
				if(arrTemp[i] != randN){
					arrTemp.push(randN);
					break;
				}
			}
			generate();//Recursive	
		}else{
			return false;
		}
	}
	complete(arrTemp);
	//Leave only unique elements
	function complete(arrToFilter){
		//Get part of the unique array elements, it returns [1,4,7,2,9,10,...]
		arrUnique = arrToFilter.filter((value, index, self)=>{
			return self.indexOf(value) === index;
		});
	}
	//Combine 
	function combineTillAllElements(){
		while(arrUnique.length < elements){
			generate();
			var newArr = arrUnique.concat(arrTemp);
			arrUnique = newArr.filter((value, index, self)=>{
				//
				return self.indexOf(value) === index;
			});
		}
	}
	if(arrUnique.length != totalSize){//10 != 10
		combineTillAllElements();
		//console.log("Less than "+totalSize);
	}else{
		//console.log("Good");
	}
	return arrUnique;
}
exports.exercises = {
	parseTranslatedString : parseString,
	uniqueNumbers : createNumbersArray
};