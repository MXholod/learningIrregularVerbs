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
//"Private function" Check is number
function isNumeric(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}
//"Private function"
function proveNum(dimension){
	//Number greater than 0
	if(isNumeric(dimension) && dimension > 0){
		return true;
	}
	return false;
}
//Create an Array of unique numbers. 'elements' - size of result array, 'totalSize' - dimension of numbers
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
//Get all documents from DB by given IDs, and get chunk of string from the first element of an array rus|ukr 
function arrayOfTasks(dataDB,language){
	let task = [];
			let i = 0;
			while(dataDB.length > i){
				//Temporary object created each time in a loop
				var objectData = {};
				//Pack with russian
				if(language == "rus"){
					//If string isn't a single word slice it by comma
					objectData.translatedWord = parseString(dataDB[i].rus[0]);
				}
				//Pack with Ukrainian
				if(language == "ukr"){
					//If string isn't a single word slice it by comma
					objectData.translatedWord = parseString(dataDB[i].ukr[0]);
				}
				//Assign an array of English words to the property
				objectData.engArray = dataDB[i].eng;
				//Set id
				objectData.id = dataDB[i]._id;
				//Push object to an Array
				task.push(objectData);
				i++;
			}
	return task;
}
//Set elements of Data Array to random order, as in random Array numbers 
function changePositions(arrayUniqueNums,arrayDataDB){
	let resultData = [];
	//Random numbers Array in loop
	for(var i = 0;i<arrayUniqueNums.length;i++){
		//Data Array in loop
		for(var j = 0;j<arrayDataDB.length;j++){
			//If element from 'Random Nums Array' is equal to 'id' from 'Data Array' then add this element to
			//'result Array'
			if(arrayUniqueNums[i] == arrayDataDB[j].id){
				resultData.push(arrayDataDB[j]);
			}
		}
	}
	return resultData;
}
exports.exercises = {
	uniqueNumbers : createNumbersArray,
	arrayOfTasks : arrayOfTasks,
	changePositions : changePositions
};