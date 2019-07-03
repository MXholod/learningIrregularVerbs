console.log("Method-3");
(function(){
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[],'gCounter':300} 
	let globalCounter = 0;//Specify time from page to page
	//It should filled with '1', to show completed.
	let fieldsActivity = 0;
	let moveOnButton = null;
	window.addEventListener("load",function(){
		//DIV with arrow
		moveOnButton = document.getElementsByClassName("wrapper__method3__move-on")[0];
		start();
	},false);
	//Subscribe on focus and blur events.
	function start(){
		//Start counter
		let timeCounter = document.getElementById("timeCounter");
		if(sessionStorage.getItem("method3")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method3"));
		}
		let gCounter = Number(pages.gCounter);
		if(!pages.gCounter){//First page
			window.setTimeout(function(){
				startTimer(timeCounter,20,true);//303
			},2000);
		}else{//Other pages
			startTimer(timeCounter,gCounter,true);	
		}
		//Disable language panel during the test
		disabledLanguagePanel();
		let allInputs = document.querySelectorAll(".task__empty-field");
		allInputs.forEach((val,ind,arr)=>{
			//Enter input
			val.addEventListener("focus",function(){
				enterToInput.call(this);
			},false);
			//Leave input
			val.addEventListener("blur",function(){
				completed.call(this);
			},false);
		});
	}
	//Get hidden result
	function getHiddenData(){
		//Get hidden data
		let hiddenChildren = this.parentNode.previousSibling.children;
		//Correct word or words split by space.
		let hiddenArr = hiddenChildren[3].textContent.split(" ");
		//Comparison of each word that was divided apart by space with a user's word.
		if((hiddenArr[0] === this.value) || (hiddenArr[1] === this.value) || (hiddenArr[2] === this.value)){
			//console.log("Good ",hiddenArr," ",this.value);
			//Correct answer was given
			hiddenChildren[2].textContent = 1;
		}else{
			//console.log("Bad ",hiddenArr," ",this.value);
			//Incorrect answer was given
			hiddenChildren[2].textContent = 0;
		}
	}
	//Enter to an input
	function enterToInput(){
		//this - Input tag
		//When first time visiting an element, increment counter. 
		if(this.value.length < 2){
			fieldsActivity++;
		}
	}
	//Leave an input
	function completed(){
		//this - Input tag
		//If characters less than 2
		if(this.value.length < 2){
			fieldsActivity--;
		}
		//Comparison user input value with the hidden correct answer. Save values into hidden elements.
		getHiddenData.call(this);
		//If 10 then we will show 'move-on' button, otherwise hide it.
		if(fieldsActivity == 10){
			moveOnButton.style.display = "block";
			//Get an anchor element
			let a = moveOnButton.children[0];
			//Go to next page
			a.addEventListener("click",function(e){
				//e.preventDefault();
				//Pass 'a' element, and pick all the data 
				prepareDataResult(this);
			},false);
		}else{
			moveOnButton.style.display = "none";
		}
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(aElement){
		let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
		if(sessionStorage.getItem("method3")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method3"));
			//console.log("Storage exists");
		}
		//Get number of a current page
			let length = aElement.getAttribute("href").length;
			//Get query string part: 2,3,4,5,6
			let strNumber = aElement.getAttribute("href").substring(length-1,length);
			//Cast String to Number
			let queryNumber = Number(strNumber);
		//Pick all the data within the page
		let arrRows = document.querySelectorAll(".task__row1");
		arrRows.forEach((val,ind,arr)=>{
			let hiddenIndex = val.children[1].textContent;
			//Check does neighbour element contains 'draggable' element
			if(val.nextSibling.children[hiddenIndex].value.length >= 2){
				let obj = {};
				obj['id'] = val.children[0].textContent;
				obj['result'] = val.children[2].textContent;
				page.push(obj);
			}
		});
		//Check query parameter from each page
		let serialized;
		switch(queryNumber){
			case 2: pages['firstPage'] = page;
					pages['gCounter'] = globalCounter;
					pages['pageAmount'] = (queryNumber - 1);
					serialized = JSON.stringify(pages);
			break;
			case 3: pages['secondPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = (queryNumber - 1);
					serialized = JSON.stringify(pages);
			break;
			case 4: pages['thirdPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = (queryNumber - 1);
					serialized = JSON.stringify(pages);
			break;
			case 5: pages['forthPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = (queryNumber - 1);
					serialized = JSON.stringify(pages);
			break;
			case 6: pages['fifthPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = (queryNumber - 1);
					serialized = JSON.stringify(pages);
			break;
		}
		//Saving to the SessionStorage
		sessionStorage.setItem("method3",serialized);
		//console.log(pages);
	}
	
	//This function is for time counting, call this function from scripts below: method1, method2, method3
	function startTimer(el,limit=300,reverse=false){
		let t1 = t2 = null,counter;
		if(reverse){//From 5 to 0 
			counter = limit; 
			limit = 0;
		}else{
			counter = 0;
		}  
		t1 = window.setTimeout(function func(){
			count();
			t2 = window.setTimeout(func,1000);
			if(!reverse){//From 0 to 5
				if(counter >= limit){
					if(t2 != null){
						window.clearTimeout(t2);
						t2 = null;
					}
					counter = 0;
				}
			}else{//From 5 to 0
				if(counter <= limit){
					if(t2 != null){
						window.clearTimeout(t2);
						t2 = null;
					}
					counter = 0;
					//If time is up the button(link to the next page) wasn't pressed, imitate this behaviour 	
						//to collect marked items. 
					prepareDataResult(moveOnButton.children[0]);
					//Go to the result page route and save data to DB when time is up.
					window.location.href = "/show-result";
				}
			}
		},1000);// 1000 * 60 * 5 = 1000 * 300 = 300 000ms - 5min;
		//Counting
		function count(){
			if(t1 != null){
				window.clearTimeout(t1);
				t1 = null;
			}
			//if(!reverse){counter++;}else{ counter--;}
			!reverse ? counter++ : counter--;
			//Save counter value to the global counter value to save in Session Storage
			globalCounter = counter;
			el.textContent = counter;
		}
	}
	function disabledLanguagePanel(){
		let rus = document.getElementById("rus");
		let ukr = document.getElementById("ukr");
		rus.disabled = true;
		ukr.disabled = true;
	}
})();