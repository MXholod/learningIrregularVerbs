var cr = require('crypto');
const secretHash = "irregularVerbs";
const digits = [0,1,2,3,4,5,6,7,8,9];
const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-','_'];
//Hashing secretHash+login+password
function hashPassword(login,pass){// secretHash + login + password
	var result = secretHash+login+pass;
	return cr.createHash('md5').update(result).digest("hex");
}
//Get random index for array
function randomIndexForArray(arr){
	var len = (arr.length-1) || 1;
	var res = Math.round((Math.random() * len));
	return res;
}
//Create unique array from given length and array as parameters
function getUniqueArray(times,arr){
	var randInd,res,numsArr = [];
	for(var i = times-1;i>=0;i--){
		randInd = randomIndexForArray(arr);
		res = arr.splice(randInd,1);
		numsArr.push(res[0]);
	}
	return numsArr;
}
//
function createRandomString(){
	var tempArr = [];
	var ds = getUniqueArray(3,digits);
	var cs = getUniqueArray(4,chars);
		//console.log(getUniqueArray(3,digits).join(" - "));
		//console.log(getUniqueArray(4,chars).join(" - "));
	//Combine arrays
	for(var i = 0,j = (cs.length);ds.length > i;j++,i++){
			cs[j] = ds[i];
	}
	var mutualLength = cs.length;
	var rand1=0,rand2=0,rand3=0;
		//Generate three different indexes for substitution 	
		while(rand1 == rand2 || rand2 == rand3 || rand1 == rand3){
			rand1 = Math.round((Math.random() * (mutualLength-1)));//0-6
			rand2 = Math.round((Math.random() * (mutualLength-1)));//0-6
			rand3 = Math.round((Math.random() * (mutualLength-1)));//0-6
		}
	var el1 = cs.splice(rand1,1)[0];
		cs.unshift(el1);
	var el2 = cs.splice(rand2,1)[0];
		cs.push(el2);
	var el3 = cs.splice(rand3,1)[0];
		cs.push(el3);
	return cs.join(""); 
}
/*var data = "asdf"; 
var crypto = require('crypto'); 
crypto.createHash('md5').update(data).digest("hex"); */

/*const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
console.log(hash);*/
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
module.exports = {hashPassword,createRandomString};