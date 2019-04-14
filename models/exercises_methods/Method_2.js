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
function setEmptyFieldInRow(arrayOfObj){
	var arrayObjects = [], singleWords = [];
	var randInd;
	//for(var i = 0;i < arrayOfObj.length;i++){
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
				currentObj.word = val.engArray[randInd];
				//Set this current word as empty string ''
				val.engArray[randInd] = '';
				//Save index into an object to identify an empty field on client side.
				val['index'] = randInd;
				//Add object to the Array
				singleWords[ind] = currentObj;
		});
		
		//
		//singleWords[i] = arrayOfObj[i].engArray[randInd];
		//arrayOfObj[i].engArray[randInd] = "";
		//
	//}
	//
	arrayObjects[0] = arrayOfObj;
	arrayObjects[1] = singleWords;
	return arrayObjects;
}
module.exports = {
	getPortionIDs: getPortionIDs,
	setEmptyFieldInRow: setEmptyFieldInRow
};