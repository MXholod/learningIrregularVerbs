//This method is packing 'IDs' and 'spoiled IDs' to save them into Session. The parameter is an Array of all IDs.
//Structure of the object is: { IDs:[3,44,21,1,9,...], spoiledPortionsIDs:[[...],[...],[...],[...],[...]] } 
function cutForSpoiledIDs(arr){
	var idsObject = {
		IDs:null,
		spoiledPortionsIDs:[]
	};
	var num;
	//Cut from 50 to 75 for spoiled IDs and save it to the property 'spoiledIDs'
	var spoiledIDs = arr.splice(30,45);//50,75
	//Cut from 0 to 50 IDs
	idsObject.IDs = arr.splice(0,30);//0,50
	//Prepare for each page in loop spoiled IDs. Random amount.
	for(var i = 0;i < 3; i++){
		//Generate random range from 1 to 5
		num = Math.round(Math.random()*(5-1))+1;
		//Cut from the Array from 1 to 5 elements 
		idsObject.spoiledPortionsIDs[i] = spoiledIDs.splice(0,num);
	}
	return idsObject; 
}
//Get first 10 from array each time 
function calculateRange(objIDs,requestParam){
	var resultArray = [];
		//Calculate current page according to the request query parameter
		var pageNumber = requestParam - 1;
		//Cut IDs for page
		var idsForPage = objIDs.IDs.splice(0,10);
		//Spoiled IDs for current page as Array
		var spoiledPageNums = objIDs.spoiledPortionsIDs[pageNumber];//'pageNumber' - 0,1,2,3,4 - five pages
		//Combine normal and spoiled IDs for current page
		var normalAndSpoiled = idsForPage.concat(spoiledPageNums);
			//Save combined IDs
			resultArray.push(normalAndSpoiled);
			//Save only normal IDs
			resultArray.push(idsForPage);
			//Save only spoiled IDs
			resultArray.push(spoiledPageNums);
		//Return Array with [['Normal and spoiled'],[only normal],[only spoiled]]	
	return resultArray;
}
/* Method preparedVerbs

  Incoming an Array of data objects like:
	[
		{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},
		{},
		...,
	]
  Outcoming an Array of data objects like:
	[
		{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1,spoiled:true},
		{},
		...,
	]
	The property 'spoiled' true | false, true - means 'engArray' has been changed, elements were replaced.
*/
//Parameters: 1. array of objects, 2. array of spoiled indexes. Return array [[Only normal obj],[Only spoiled obj]]
function changePositions(arrayData,spoiled){
	let resultCommon = [],resultNormal = [],resultSpoiled = [];
	let equalToSpoiled = false;
	//Random numbers Array in loop
	for(var i = 0;i<arrayData.length;i++){
		//Data Array in loop
		for(var j = 0;j<spoiled.length;j++){
			//IF property 'id' is equal to spoiled 'index' then save current object to the 'resultSpoiled[]'
			if(arrayData[i].id === spoiled[j]){
				resultSpoiled[j] = arrayData[i];
				//Found similarities
				equalToSpoiled = true;
				break;
			}
		}
		if(equalToSpoiled != true){
			resultNormal.push(arrayData[i]);
		}
		//Reset variable to false.
		equalToSpoiled = false;
		
	}
	resultCommon[0] = resultNormal; 
	resultCommon[1] = resultSpoiled; 
	return resultCommon;
}
//Generate random unique indexes. Parameter is length of desired indexes.
function generateIndexes(spoiledLength){
	//Temporary array
	var arr1 = [],index1,index2;
	//Result array has only unique indexes from 0 - 9 according to the 'spoiled' amount. 
	var unique = [];
		//Generate first random number and add it to Array
		index1 = Math.round(Math.random()*9);//0-9
		arr1.push(index1);
	//If spoiled more than one then keep on generating numbers
	if(spoiledLength > 1){
		while(unique.length < spoiledLength){
			index2 = Math.round(Math.random()*9);//0-9
			arr1.push(index2);
			unique = arr1.filter(function(item, pos) {
				return arr1.indexOf(item) == pos;
			});
		}
	}else{//If spoiled is only one then reassign it.
		unique[0] = arr1[0];
	}
	//Return array of unique indexes
	return unique;
}
//Set 'spoiled' property to objects that were spoiled. 
//Parameters: 1. Normal array of objects, 2. Spoiled array of objects, 3. Random generated indexes from 0 to 9.
function spoilRandomObject(normalObjects,spoiledObjects,randomIndexes){
	for(var i = 0;i < normalObjects.length;i++){
		for(var j = 0;j < randomIndexes.length;j++){
			//If indexes are even to each other from 0 - 9
			if(i == randomIndexes[j]){
				//Random number from 0 - 2
				var indexRand = Math.round(Math.random()*2);
				//Cut one spoiled object from array
				var spoiledObj = spoiledObjects.splice(0,1);
				//Take a current Object from array
				normalObjects[i].engArray[indexRand] = spoiledObj[0].engArray[indexRand];
				//Set false if object is spoiled
				normalObjects[i].spoiled = false;
				break;
			}else{
				//Set true if object is not spoiled
				normalObjects[i].spoiled = true;
			}
		}
	}
	return normalObjects;
}
//[{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},..] - incoming
//[{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1,spoiled:true},{},..] - outcoming	
//normalAndSpoiledIDs - [ ['Normal with spoiled'], [only normal], [only spoiled] ]
function preparedVerbs(preparedObject,normalAndSpoiledIDs){
	//Spoiled array length
	//var spoiledLength = normalAndSpoiledIDs[2].length;//only spoiled
	//Return two arrays in one [[normal],[spoiled]] objects
	var arrOfNormalAndSpoiled = changePositions(preparedObject,normalAndSpoiledIDs[2]);
	//Cut spoiled objects from array of normals
	//var onlySpoiledObjects = preparedObject.splice(10,spoiledLength);//From 11 - 15
	//Last 10 normal Objects
	//var onlyNormalObjects = preparedObject;//From 1 - 10
	//Generate Array of unique indexes according to the 'spoiled' length. Parameter is 'length of spoiled array'
	var arrUnique = generateIndexes(normalAndSpoiledIDs[2].length);
	//Set spoiled property
	//[{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1},{},...]
	//[{translatedWord:'ru|ua word',engArray:['e1','e2','e3'],id:1,spoiled:true},{},...]
	var completed = spoilRandomObject(arrOfNormalAndSpoiled[0],arrOfNormalAndSpoiled[1],arrUnique);
	//preparedObject[0].spoiled = "Length is "+preparedObject.length+" "+normalAndSpoiledIDs.length;
	return completed;
}
//
module.exports = {
	cutForSpoiledIDs : cutForSpoiledIDs,
	getPortionIDs : calculateRange,
	preparedVerbs : preparedVerbs 
};