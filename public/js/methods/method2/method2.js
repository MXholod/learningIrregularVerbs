console.log("Method-2");
(function(){
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[],'gCounter':250}
	let arrowMove;
	let globalCounter = 0;//Specify time from page to page
	window.addEventListener("load",function(){
		//Find arrow move-on to the next page
		arrowMove = document.querySelector(".wrapper__method2__move-on");
		strat();
	},false);
	//Function 'start' subscribes elements on draggable and droppable events.
	function strat(){
		//Start counter
		let timeCounter = document.getElementById("timeCounter");
		if(sessionStorage.getItem("method2")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method2"));
		}
		let gCounter = Number(pages.gCounter);
		if(!pages.gCounter){//First page
			window.setTimeout(function(){
				startTimer(timeCounter,20,true);//253
			},2000);
		}else{//Other pages
			startTimer(timeCounter,gCounter,true);	
		}
		//Disable language panel during the test
		disabledLanguagePanel();
		//Find parent element
		let basePlace = document.getElementsByClassName("wrapper__method2__single-words")[0];
		//Find all children
		let arrDragable = basePlace.querySelectorAll(".single-words__word");
		//Subscribe for drag events
		for(var i = 0;i < arrDragable.length;i++){
			arrDragable[i].addEventListener("dragstart",function(e){
				//console.log(this.id);
				e.dataTransfer.effectAllowed = "move";
				e.dataTransfer.setData("text",this.id);
			},false);
			arrDragable[i].addEventListener("drag",function(e){
				this.style.cursor = "move";
			},false);
			arrDragable[i].addEventListener("dragend",function(e){
				
			},false);
		}
		//Get all dropped elements
		let drops = document.querySelectorAll(".task__empty-field");
		//Subscribe for drop events
		for(var i = 0;i < drops.length;i++){
			drops[i].addEventListener("dragenter",function(e){
				//console.log(e.type);
			},false);
			drops[i].addEventListener("dragleave",function(e){
				//Clear box shadow
				this.style.boxShadow = "none";
			},false);
			drops[i].addEventListener("dragover",function(e){
				if(e.preventDefault){
					e.preventDefault();
					this.style.boxShadow = "0px 0px 0px 3px #fff inset";
				}
				e.dataTransfer.dropEffect = "move";
			},false);
			drops[i].addEventListener("drop",function(e){
				e.stopPropagation();
				e.preventDefault();
				var id = e.dataTransfer.getData("text");
				var elem = document.getElementById(id);
				//Check does element contains child element before placing.
				var childExists = checkIsChild(this,"drag");
				//If doesn't equal to null, element wasn't found in droppable zone.
				if(!childExists){ 
					this.appendChild(elem);
				}else{//Replace one element with another, if place is occupied.
					//Find parent element for draggable children elements.
					var childrenPlace = document.querySelector(".wrapper__method2__single-words");
					//Firstly we return back a child element to the children place.
					childrenPlace.appendChild(childExists);
					//Place new child element to the drop zone.
					this.appendChild(elem);
				}
				//Clear box shadow
				this.style.boxShadow = "none";
				//Compare values drag and drop zones.
				compareValues(elem,this);
				//Counting draggable elements
				watchingForLastDraggable();
				return false;
			},false);
		}
	}
	//childAttrVal - it is a sub 'string' (a part of 'id' value).
	//Here we checking out does drop zone contain an element with id's value.
	function checkIsChild(parent,childAttrVal){
			var childElem = null;
			var len = parent.children.length;
			for(var i = 0;i < len;i++){
				//Get ID's attribute value
				var val = parent.children[i].getAttribute("id");
				if((val.indexOf(childAttrVal)) !== -1){
					//Save found element and leave from loop
					childElem = parent.children[i];
					break;
				}
			}
			//Return 'null' or 'an element' as the result.
			return childElem;
	}
	//Function is for calculating and for comparison both values.
	function compareValues(dragEl,dropEl){
		//For drag El, get array from string like: "8,1" -> [8,1]. First is 'id', second is 'index'.
		let arrDragEl = dragEl.dataset.wordinfo.split(",");
		let dragId = Number(arrDragEl[0]);
		//For drop El, get values
		//Get id
		let dropId = dropEl.parentNode.previousSibling.children[0].textContent;
		dropId = Number(dropId);
		//Get index
		let dropIndex = dropEl.parentNode.previousSibling.children[1].textContent;
		//console.log("Drag id: ",arrDragEl[0]," drag ind ",arrDragEl[1]);
		//console.log("Drop id: ",dropId," drop ind ",dropIndex);
		let result = 0;
		if(dragId == dropId){
			result = 1;
			//console.log("Good dragId",dragId," dropId ",dropId);
		}else{
			result = 0;
			//console.log("Bad dragId",dragId," dropId ",dropId);
		}
		//Write 0 | 1 depending on correct or not.
		dropEl.parentNode.previousSibling.children[2].textContent = result;
	}
	//Function counts draggable elements
	function watchingForLastDraggable(){
		//Find parent element
		let basePlace = document.getElementsByClassName("wrapper__method2__single-words")[0];
		//Get all children
		let arrDragable = basePlace.querySelectorAll(".single-words__word");
		//Children are less than 1
		if(arrDragable.length <= 0){
			//console.log("Elements are absent");
			//Show 'move on' button
			arrowMove.style.display = "block";
			//Subscribe on event 'mousedown' to save into the SessionStorage
			arrowMove.addEventListener("mousedown",function(e){
				//Get 'a' element
				this.children[0].onclick = function(e){
					//e.preventDefault();
					//Save data to the SessionStorage, pass 'anchor' as parameter
					prepareDataResult(this);
				};
			},false);
		}else{
			//console.log("Elements ",arrDragable.length);
			arrowMove.style.display = "none";
		}
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(aElement){ 
		let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
		if(sessionStorage.getItem("method2")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method2"));
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
			if(val.nextSibling.children[hiddenIndex].children.length != 0){
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
		sessionStorage.setItem("method2",serialized);
		//console.log(pages);
	}
	
	//This function is for time counting, call this function from scripts below: method1, method2, method3
	function startTimer(el,limit=250,reverse=false){
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
					prepareDataResult(arrowMove.children[0]);
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
