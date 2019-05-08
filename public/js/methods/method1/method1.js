console.log("Method-1");
(function(){
	let buttonClicks = 0;
	window.addEventListener("load",start);
	//Subscribe to parent element on 'onmousedown' event. 
	function start(){
		//Parent element
		let parentTask = document.querySelector(".wrapper__method1__main");
		if(typeof parentTask !== "undefined" && parentTask !== null){
			parentTask.addEventListener("mousedown",detectButton);
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
				//Function 'compareValues' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}else{
				//Switch off the neighbour button
				e.target.nextSibling.nextSibling.disabled = true;
				//Function 'compareValues' invokes in the clicked Button context, and takes variable 'variant'. 
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
				//Function 'compareValues' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}else{
				//Switch off the neighbour button
				e.target.previousSibling.nextSibling.disabled = true;
				//Function 'compareValues' invokes in the clicked Button context, and takes variable 'variant'. 
				chosenVariant.call(e.target,variant);
			}
		}
	}
	//
	function chosenVariant(variant){
		this.addEventListener('mouseup',function(e){
			//Get 'id' - number from template - 'hidden element'
			let id = this.parentNode.children[0].textContent;//'.task__unique'
			//Get 'value' - boolean from template - 'hidden element' 
			let value = this.parentNode.children[1].textContent;//'.task__hidden'
			//Cast to 'Boolean' type from 'String'
			value = value === "true" ? true : false;
			//Save 'id' and computed 'value' to the SessionStorage if last click.
			
			//Compare clicked button with boolean value from the template 
			let res = variant === value ? "Good" : "Bad";
			//Switch off clicked Button
			this.disabled = true;
			//Increment counter each time when button is clicked
			buttonClicks++;
			//Till 9 clicks
			if(buttonClicks < 10){
				console.log(res," Count clicks on buttons ",buttonClicks," var ",variant," val ",value);
			}else{//10 clicks, the last button on a page was clicked.
				console.log(res,"Button clicks is ",buttonClicks," var ",variant," val ",value);
			}
		},false);
	}
	
})();