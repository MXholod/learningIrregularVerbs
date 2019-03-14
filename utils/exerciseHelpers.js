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
//Clean English string from transcription "eng":["abide[ə'baɪd]","abode[ə'bəud]","abode[ə'bəud]"] 
function parseEngString(parsedEngArr,delimiter = "["){
	var tempArr = [], squareBracket;
	if(Array.isArray(parsedEngArr)){
		for(var i = 0;i < parsedEngArr.length;i++){
			//Try to find square bracket
			squareBracket = parsedEngArr[i].indexOf(delimiter);
			if(squareBracket !== -1){//Find bracket
				//Cut "abide[ə'baɪd]" -> take this: "abide" and this cut off: "[ə'baɪd]"
				tempArr[i] = parsedEngArr[i].slice(0,squareBracket);
			}else{
				tempArr[i] = parsedEngArr[i];
			}
		}
		return tempArr;//Return array like this - "eng":["abide","abode","abode"] 
	}
	return parsedEngArr;
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
//If third parameter is true, clean an Array from brackets "eng":["abide[ə'baɪd]","abode[ə'bəud]","abode[ə'bəud]"]
function arrayOfTasks(dataDB,language,cleanEng){
	let rows = [];
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
				//Clean English string
				if(cleanEng){
					objectData.engArray = parseEngString(dataDB[i].eng,delimiter = "[");
				}else{
					//Assign an array of English words to the property
					objectData.engArray = dataDB[i].eng;
				}
				//Set id
				objectData.id = dataDB[i]._id;
				//Push object to an Array
				rows.push(objectData);
				i++;
			}
	return rows;
}
//Set elements of Data Array to random order, according to random Array numbers
//1.[only normal]  2.[{translatedWord:'ru|ua',engArray:['e1','e2','e3'],id:1,spoiled:true},{},..] 
function changePositions(arrayUniqueNums,arrayDataDB){
	let resultData = [],iter = 0;
	//Random numbers Array in loop
	for(var i = 0;i<arrayUniqueNums.length;i++){
		//Data Array in loop
		for(var j = 0;j<arrayDataDB.length;j++){
			//If element from 'Random Nums Array' is equal to 'id' from 'Data Array' then add this element to
			//'result Array'
			if(arrayUniqueNums[i] == arrayDataDB[j].id){
				//resultData.push(arrayDataDB[j]);
				resultData[iter] = arrayDataDB[j];
				iter++;
			}
		}
	}
	return resultData;
}

exports.exercises = {
	uniqueNumbers : createNumbersArray,
	arrayOfTasks : arrayOfTasks,
	changePositions : changePositions,
};