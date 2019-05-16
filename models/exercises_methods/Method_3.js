//Cut the Array each time, and return two arrays. The first is: 1-10, and the second is: 11-50 IDs.
function getPortionIDs(arrIDs){
	var tempArr = [];
	var portionIDs;
	if(Array.isArray(arrIDs) && (arrIDs.length > 0)){
		//Cut from 0 to 9 index
		portionIDs = arrIDs.splice(0,10);
		//Save 
		tempArr[0] = portionIDs;//1-10
		tempArr[1] = arrIDs;//11-50
	}else{//If array is empty
		return false;
	}
	//[ [1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20,21,...] ]
	return tempArr;
}
//Parameters: 1. string; 2. string or array
//The result should be like: aaaaa,bbbbb -> aaaaa bbbbb or ccccc(ddddd) -> ccccc ddddd 
function preparedHiddenString(parsedStr = "",delimiter = ","){
	var resultStr,index,resultArr;
	//Create polyfill isArray() if it doesn't exist.
	if(!Array.isArray){
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}
	//Delimiter is an Array using Polyfill isArray()
	if(Array.isArray(delimiter)){
		for(var i = 0;delimiter.length > i;i++){
			//Find more than one word
			index = parsedStr.indexOf(delimiter[i]);
			if(index !== -1){
				//Split by given character
				resultArr = parsedStr.split(delimiter[i]);
				//If delimiter ")" was found in the end of last element.
				if(resultArr[resultArr.length-1].lastIndexOf(")") !== -1){
					var lastEl = resultArr[resultArr.length-1];
					resultStr = lastEl.substring(0,lastEl.length-1);
					//Rewrite element without parenthesis
					resultArr[resultArr.length-1] = resultStr;
					resultStr = resultArr.join(" ");
					//console.log(resultArr.join(" "),1);
					break;
				}else{
					resultStr = resultArr.join(" ");
					break;
					//console.log(resultArr.join(" ","ok"));
				}
			}else{//Single word
				resultStr = parsedStr;
			}
		}
	}else{//Delimiter is a String
		index = parsedStr.indexOf(delimiter);
		if(index !== -1){//Comma exists
			resultStr = parsedStr.slice(0,index);
		}else{//Single word
			resultStr = parsedStr;
		}
	}
	return resultStr;
}
function setEmptyFieldInRow(arrayOfObj){
	var arrayObjects = [], singleWords = [];
	var randInd;
		//[{ translatedWord:'ru|ua word', engArray:['e1','e2','e3'], id:1, index:0|1|2 },{},..]
		arrayOfObj.forEach((val,ind,arr) => {
			//Object like: {id:1,index:0,word:'began'}
			let currentObj = {};
			randInd = Math.round(Math.random()*2);//From 0 to 2
				//Save id 
				currentObj.id = val.id;
				//Save index
				currentObj.index = randInd;
				//Save random eng word
				currentObj.word = preparedHiddenString(val.engArray[randInd],[',','(']);
				//Set this current word as empty string ''
				val.engArray[randInd] = '';
				//Save index into an object to identify an empty field on client side.
				val['index'] = randInd;
				//Add object to the Array
				singleWords[ind] = currentObj;
		});
		
	arrayObjects[0] = arrayOfObj;
	arrayObjects[1] = singleWords;
	return arrayObjects;
}
module.exports = {
	getPortionIDs: getPortionIDs,
	setEmptyFieldInRow: setEmptyFieldInRow
};