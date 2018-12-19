//Countdown numbers
(function(){
	let numbers;
	window.addEventListener("load",function(){
		//Get all SVG Numbers as an Array
		numbers = document.getElementsByClassName("numbers__nums-pos");
		//Last element animated in the first place
		setLastElementAnimated(numbers);
		//Start countdown, 1600ms duration is equal to CSS animation-duration property.
		countDown(numbers.length,1600);
	},false);
	//Find last element to animate
	function setLastElementAnimated(arrElems){
		let lastElem = arrElems[(arrElems.length-1)];
		//If last element hasn't class 'numbers__countDownNum'
		if(!lastElem.classList.contains("numbers__countDownNum")){
			lastElem.classList.add("numbers__countDownNum");
			lastElem.classList.remove(`numbers__n-${arrElems.length}`);
		}
	}
	//Add 'time' parameter is equal to CSS property animation:spinAndHide 2s linear 0s 1 normal; 
	function countDown(limit,time){//3,2000
		var previousInd,currentInd = (numbers.length-1);
		var t1=null,t2=null,times = 0,limit = limit || 1,time = time || 1000;
		//First Timeout
		t1 = window.setTimeout(function func(){
			//Call my function
			doTask();
			//Second Timeout
			t2 = window.setTimeout(func,time);
			if(times == limit){
				if(t2 != null){
					window.clearTimeout(t2);
					t2 = null;
					times = 0;
				}
			}
		},1600);
		function doTask(){
			if(t1 != null){
				window.clearTimeout(t1);
				t1 = null;
			}
			times++;
			//Do the Job
			if(currentInd !== 0){
				//If current element has class 'numbers__countDownNum'
				if(numbers[currentInd].classList.contains("numbers__countDownNum")){//currentInd - 2,1,0
				//Current html element in array
					//Remove class 'numbers__countDownNum' from the current
					numbers[currentInd].classList.remove("numbers__countDownNum");
					//Add class numbers__n-3,numbers__n-2,numbers__n-1
					numbers[currentInd].classList.add(`numbers__n-${currentInd+1}`);
				//Previous html element in array
					//Add class 'numbers__countDownNum' to the previous html element
					numbers[(currentInd-1)].classList.add("numbers__countDownNum");
					//Remove class 'numbers__n-3,2,1' from the previous html element
					numbers[(currentInd-1)].classList.remove(`numbers__n-${currentInd}`);
				}
			}else{
				//Remove class 'numbers__countDownNum' from the first element in an array
				numbers[0].classList.remove("numbers__countDownNum");
				//Add class numbers__n-1 to the first element in an array
				numbers[0].classList.add('numbers__n-1');
				//Remove smoky main block
				window.setTimeout(()=>{
					let mainWindow = document.querySelector(".main-window");
					mainWindow.style.display = "none";
					mainWindow.style.zIndex = "auto";
				},300);
			}
			currentInd--;
		}
	}
})();