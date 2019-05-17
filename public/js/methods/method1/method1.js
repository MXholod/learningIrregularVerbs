console.log("Method-1");
(function(){
	let buttonClicks = 0;
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[]}
	let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
	let arrowMove;
	window.addEventListener("load",start);
	//Subscribe to parent element on 'onmousedown' event. 
	function start(){
		//Parent element
		let parentTask = document.querySelector(".wrapper__method1__main");
		if(typeof parentTask !== "undefined" && parentTask !== null){
			parentTask.addEventListener("mousedown",detectButton);
			//Find arrow move-on to the next page
			arrowMove = document.getElementsByClassName("wrapper__method1__move-on")[0];
			arrowMove.addEventListener("click",function(e){
				//Save to the sessionStorage. Pass 'a' element as a parameter
				prepareDataResult(this.children[0]);
			},false);
		}else{
			console.log("Parent task wasn't founded");
		}
	}
	//Button has been clicked on. 
	function detectButton(e){
		//Correct answer according to the button, 'variant' is true
		if(e.target.getAttribute("class") == "task__correct"){ 
			//User has clicked on 'correct' button
			let variant = true;
			//Trying to get data from hidden elements
			if(e.target.nextSibling.nodeType == 1){
				//Switch off the neighbour button
				e.target.nextSibling.disabled = true;
				//Function 'chosenVariant' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}else{
				//Switch off the neighbour button
				e.target.nextSibling.nextSibling.disabled = true;
				//Function 'chosenVariant' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}
		}
		//Incorrect answer according to the button, 'variant' is false
		if(e.target.getAttribute("class") == "task__incorrect"){
			//User has clicked on 'incorrect' button
			let variant = false;
			//Trying to get data from hidden elements
			if(e.target.previousSibling.nodeType == 1){
				//Switch off the neighbour button
				e.target.previousSibling.disabled = true;
				//Function 'chosenVariant' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}else{
				//Switch off the neighbour button
				e.target.previousSibling.nextSibling.disabled = true;
				//Function 'chosenVariant' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}
		}
	}
	//Prepare values and pack they into an object and then into array.
	function chosenVariant(variant){
		this.addEventListener('mouseup',function(e){
			//Get 'id' - number from template - 'hidden element'
			let id = this.parentNode.children[0].textContent;//'.task__unique'
			//Get 'value' - boolean from template - 'hidden element' 
			let value = this.parentNode.children[1].textContent;//'.task__hidden'
			//Cast to 'Boolean' type from 'String'
			value = value === "true" ? true : false;
			//Compare clicked button with boolean value from the template. true -1, false - 0 
			let result = variant === value ? 1 : 0;
			//Pack data to the object properties
				let obj = {};
				obj['id'] = id;
				obj['result'] = result;
				//Push object with results to array each time when button was clicked.
				page.push(obj);
			//Switch off clicked Button
			this.disabled = true;
			//Increment counter each time when button is clicked
			buttonClicks++;
			//Till 9 clicks
			if(buttonClicks < 10){
				arrowMove.style.display = "none";
				//console.log(page," ",buttonClicks);
			}else{//10 clicks, the last button on a page was clicked.
				arrowMove.style.display = "block";
				//console.log(page," ",buttonClicks);
			}
		},false);
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(aElement){
		//If sessionStorage exists
		if(sessionStorage.getItem("method1")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method1"));
		}
		//Get number of a current page
			let length = aElement.getAttribute("href").length;
			//Get query string part: 2,3,4,5,6
			let strNumber = aElement.getAttribute("href").substring(length-1,length);
			//Cast String to Number
			let queryNumber = Number(strNumber);
		//Check query parameter from each page
		let serialized;
		switch(queryNumber){
			case 2: pages['firstPage'] = page; 
					serialized = JSON.stringify(pages);
			break;
			case 3: pages['secondPage'] = page;
					serialized = JSON.stringify(pages);
			break;
			case 4: pages['thirdPage'] = page;
					serialized = JSON.stringify(pages);
			break;
			case 5: pages['forthPage'] = page;
					serialized = JSON.stringify(pages);
			break;
			case 6: pages['fifthPage'] = page;
					serialized = JSON.stringify(pages);
			break;
		}
		//Saving to the SessionStorage
		sessionStorage.setItem("method1",serialized);
		//console.log(pages);
	}
})();