(function(){
	const preparedData = {
		"login":"",
		"hash":"",
		"methodNumber":0,
		"time":"0:00",
		"successArray":[],
		"failureArray":[],
		"successResult":0,
		"failureResult":0,
		"totalAnswers":0,
		"failedAsString":"",
		"successProgressPercentage":0
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
	function timeFormat(exerciseTime,limitExerciseTime){
		let time = "";
		let secondsSpent = limitExerciseTime - exerciseTime;//200 - 170 = 30
		if(exerciseTime == 0){
			time = "0:00";
			preparedData.time = time;
			//console.log(time);
			return;
		}
		else if(secondsSpent < 60){
			secondsSpent = secondsSpent <= 9 ? "0"+secondsSpent : secondsSpent;//"0:59"
			preparedData.time = "0:"+secondsSpent;
		}else if(secondsSpent >= 60){
			var isFloat = secondsSpent%60 !== 0 ? true : false;  
			if(isFloat){//Float
				var min = Math.trunc(secondsSpent/60);
				var sec = secondsSpent%60;
				sec = sec <= 9 ? "0"+sec : sec;
				preparedData.time = min+":"+sec;
			}else{//Integer
				var integerData = secondsSpent/60;
				preparedData.time = integerData+":00";
			}
		}
		let timeBlock = document.querySelector(".scoreboard__time");
		timeBlock.textContent = preparedData.time;
		//console.log(time);
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
			//Subscribe on click event to clear Session Storage
			let buttonToProfile = document.getElementsByClassName("return-navigation__button")[0];
			buttonToProfile.addEventListener("click",clearStorage,false);
			console.log(preparedData);
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
		let that = this;
		window.setTimeout(function(){
			that.setAttribute("href","/profile");//href="/profile"
		},10000);
		if(this.getAttribute("href") == "/profile"){
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
})();