(function(){
	const preparedData = {
		"login":"",//MethodMOdel
		"hash":"",//MethodMOdel
		"methodNumber":0,//MethodMOdel
		"time":"0:00",//MethodMOdel
		"successArray":[],//
		"failureArray":[],//
		"successResult":0,//MethodMOdel && MethodFailedModel
		"failureResult":0,//MethodMOdel && MethodFailedModel
		"totalAnswers":0,//MethodMOdel
		"failedAsString":"",//MethodFailedModel
		"successProgressPercentage":0,//MethodMOdel
		"dateTime":0//MethodMOdel && MethodFailedModel
	};
	window.addEventListener("load",function(){
		//Disable button "to profile" temporarily.
		disableButton();
		init();
	},false);
	function init(){
		analizeSession();
		setNumberOfExercise();
		//console.log(preparedData.methodNumber);
	}
	function analizeSession(){
		/*pages - {
			'firstPage':[],
			'secondPage':[],
			'thirdPage':[],
			'forthPage':[],
			'fifthPage':[],
			'gCounter':200,
			'pageAmount':1,
		}
		page - [{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
		*/
		let pages = null;
		if(sessionStorage.getItem("method1")){
			preparedData.methodNumber = 1;
			pages = JSON.parse(sessionStorage.getItem("method1"));
			//Quantity of passed pages
			passedPages(pages.pageAmount);
			//Compute correct time
			timeFormat(pages.gCounter,200);
			//
			combineData(pages.firstPage,pages.secondPage,pages.thirdPage,pages.forthPage,pages.fifthPage);
		}
		if(sessionStorage.getItem("method2")){
			preparedData.methodNumber = 2;
			pages = JSON.parse(sessionStorage.getItem("method2"));
			//Quantity of passed pages
			passedPages(pages.pageAmount);
			//Compute correct time
			timeFormat(pages.gCounter,250);
			//
			combineData(pages.firstPage,pages.secondPage,pages.thirdPage,pages.forthPage,pages.fifthPage);
		}
		if(sessionStorage.getItem("method3")){
			preparedData.methodNumber = 3;
			pages = JSON.parse(sessionStorage.getItem("method3"));
			//Quantity of passed pages
			passedPages(pages.pageAmount);
			//Compute correct time
			timeFormat(pages.gCounter,300);
			//
			combineData(pages.firstPage,pages.secondPage,pages.thirdPage,pages.forthPage,pages.fifthPage);
		}
	}
	//Set the number of the current exercise. 
	function setNumberOfExercise(){
		let exerciseNums = document.querySelectorAll(".scoreboard__exercise-number");//№1:
		exerciseNums[0].textContent = `№${preparedData.methodNumber}`;
		exerciseNums[1].textContent = `№${preparedData.methodNumber}:`;
	}
	//Passed pages
	function passedPages(pagesAmount){
		let passedPages = document.querySelector(".scoreboard__passed-pages");
		passedPages.textContent = pagesAmount;
	}
	//Compute rest of time
	function timeFormat(spentTime, totalTime){
		let hours,minutes,seconds = 0;
		//Amount of seconds in an hour
		const secondsInHour = 60 * 60;//seconds * minutes = 3600
		//Check incoming arguments
		const correctArguments = ((typeof spentTime == 'number') && (typeof totalTime == 'number')) ? true : false;
		//Arguments are correct and 'spentTime' is zero
		if((correctArguments && (spentTime === 0)) && (totalTime < secondsInHour)){
			preparedData.time = "00:00";
			return true;
		}else if((correctArguments && (spentTime === 0)) && (totalTime >= secondsInHour)){
			preparedData.time = "00:00:00";
			return true;
		}
		//Difference between arguments should not be negative. Make a subtraction
		const restOfSeconds = (correctArguments && (spentTime < totalTime))  ? spentTime : 0;
		if(restOfSeconds > 0){
			//Checking for hour format
			if(totalTime >= secondsInHour){
					hours = Math.floor(restOfSeconds / 60 / 60);//restOfSeconds / minutes / seconds
						let formatedHours = (hours < 10) ? "0"+hours : hours;
					minutes = Math.floor(restOfSeconds / 60) - (hours * 60);//(restOfSeconds / seconds) - (1 * 60)
						let formatedMinutes = (minutes < 10) ? "0"+minutes : minutes;
					seconds = (restOfSeconds % 60) < 10 ? "0"+(restOfSeconds % 60) : (restOfSeconds % 60);
					preparedData.time = `${formatedHours}:${formatedMinutes}:${seconds}`;
			}else{//Minutes and seconds
					hours = Math.floor(restOfSeconds / 60 / 60);//restOfSeconds / minutes / seconds
					minutes = Math.floor(restOfSeconds / 60) - (hours * 60);//(restOfSeconds / seconds) - (1 * 60)
						let formatedMinutes = (minutes < 10) ? "0"+minutes : minutes;
					seconds = (restOfSeconds % 60) < 10 ? "0"+(restOfSeconds % 60) : (restOfSeconds % 60);
					preparedData.time = `${formatedMinutes}:${seconds}`;
			}
		}else{
			preparedData.time = "--:--";
		}
		let timeBlock = document.querySelector(".scoreboard__time");
		timeBlock.textContent = preparedData.time;
	}
	//Prepare data from Arrays
	function combineData(...arr){
		arr[0] = arr[0] || [];
		arr[1] = arr[1] || [];
		arr[2] = arr[2] || [];
		arr[3] = arr[3] || [];
		arr[4] = arr[4] || [];
		let combinedArray;
		//Combine Arrays using concat()
		combinedArray = arr[0].concat(arr[1],arr[2],arr[3],arr[4]);
		//console.log(combinedArray);
		if(combinedArray.length >= 1){
			//Sort Array dividing by two Arrays.
			combinedArray.forEach((item,ind,arr)=>{
				if(item.result == 1){//If answer is correct
					preparedData.successArray.push(item);
				}else{//If answer is incorrect
					preparedData.failureArray.push(item);
				}
			});
			//Amount of all given answers
			preparedData.totalAnswers = combinedArray.length;
			//Amount of only correct answers
			preparedData.successResult = preparedData.successArray.length;
			//Add percentage to the data object
			countPercentage(preparedData.successResult,50);
			//Amount of only incorrect answers
			preparedData.failureResult = preparedData.failureArray.length;
			//Set data to HTML
			document.querySelector(".scoreboard__correct-choosen").textContent = preparedData.successResult;
			document.querySelector(".scoreboard__total").textContent = preparedData.totalAnswers;
			document.querySelector(".scoreboard__incorrect-choosen").textContent = preparedData.failureResult;
			document.querySelector(".scoreboard__success-result").textContent = preparedData.successProgressPercentage;
			//Get user's login
			preparedData.login = document.querySelector(".scoreboard__player").textContent;
			//Get user's hash
			preparedData.hash = document.querySelector("#hiddenHash").textContent;
			//All failed data combine to a string
			preparedData.failedAsString = failedToString();
			//Set current date 
			preparedData.dateTime = setTime();
			//Subscribe on click event to clear Session Storage
			//let buttonToProfile = document.getElementsByClassName("return-navigation__button")[0];
			//buttonToProfile.addEventListener("click",clearStorage,false);
			//console.log(preparedData);
			//Send User's data result through the Socket
			window.socket.emit('userResultEvent', { userResult: preparedData });
		}else{
			//If not one of words wasn't chosen. Clear the Session Storage and make the button 'to profile' is an active.
			clearStorage();
		}
	}
	//Calculate percentage based on the result
	function countPercentage(result, limit){
		var y1 = 100, y2 = 0;
		if(result == 0){
			preparedData.successProgressPercentage = 0;
			return;
		}
		y2 = (y1 * result) / limit;
		preparedData.successProgressPercentage = y2;
	}
	//All failed attempts as a string
	function failedToString(){
		let tempFailureArray = Array();
		preparedData.failureArray.forEach((elem,ind,arr)=>{
			tempFailureArray[ind] = elem.id;
		});
		return tempFailureArray.join(",");
	}
	//Disable button "to profile" temporarily.
	function disableButton(){
		let buttonToProfile = document.getElementsByClassName("return-navigation__button")[0];
		buttonToProfile.setAttribute("href","#");//There is a hash instead of href="/profile"
	}
	//Clear data from Session Storage when go to the Profile
	function clearStorage(){
		//a - element
		let buttonToProfile = document.getElementsByClassName("return-navigation__button")[0];
		//let that = this;
		//window.setTimeout(function(){
			buttonToProfile.setAttribute("href","/profile");//href="/profile"
		//},10000);
		if(buttonToProfile.getAttribute("href") == "/profile"){
			if(typeof(Storage) !== "undefined"){
				if(sessionStorage.getItem("method1")){
					sessionStorage.removeItem("method1");
				}
				if(sessionStorage.getItem("method2")){
					sessionStorage.removeItem("method2");
				}
				if(sessionStorage.getItem("method3")){
					sessionStorage.removeItem("method3");
				}
			}
		}	
	}
	//
	function setTime(){
		let date = new Date();
		return date.getTime();//Quantity of milliseconds since 1970 01 01
	}
	//Client Socket function
	//When socket event is on activate the link to profile.
	window.socket.on('userResultRecordedEvent', function(data){
		if(data.activateLink){
			clearStorage();
			console.log(data.activateLink);
		}
				//console.log(data.activateLink);
	});
	
})();