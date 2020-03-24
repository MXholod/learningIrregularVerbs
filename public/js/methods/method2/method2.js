console.log("Method-2");
//Function creates cross-browser object XMLHttpRequest 
function getXmlHttp(){
	var xmlhttp;
	try{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");//newer versions of IE5+
	}catch(e){
		try{
			//Old versions of Internet Explorer (IE5 and IE6) use an ActiveX object 
			//instead of the XMLHttpRequest object
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//older versions of IE5+, 
		}catch(E){
			try{
				//проверяем, поддерживает ли событие onload, это старый XMLHttpRequest,
				//значит это IE8,9, и используем XDomainRequest
				if("onload" in new XMLHttpRequest()){
					xmlhttp = new XDomainRequest;
				}else{
					throw new Error("Not IE");
				}
			}catch(Ex){
				xmlhttp = false;
			}
		}
	}
	if(!xmlhttp && typeof(XMLHttpRequest) != 'undefined'){
		xmlhttp = new XMLHttpRequest();//IE7, Firefox, Safari etc
	}
	return xmlhttp;
}
//url - "/method2" getDataByAjax("/method1",2)
function getDataByAjax(url,page){
	return new Promise(function(resolve,reject){
		//Get XMLHttpRequest
		let xhr = getXmlHttp();
		xhr.onload = function(){
			try{
				//Attempt to get the data from the server
				resolve(JSON.parse(xhr.responseText));
			}catch(e){
				reject(e);
			}
		};
		xhr.addEventListener("error", function() {
			reject(new Error("Network error"));
		});
		xhr.open('POST',url,true);
		xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
		//Object to JSON	
		var methodDeleting = JSON.stringify({
				page:page
			});
		//Send object of data
		xhr.send(methodDeleting);
	});
}
(function(){
	let ajaxPageCounter = 1;//Number of start page
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[],'gCounter':250}
	let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
	let arrowMove;
	let globalCounter = 0;//Specify time from page to page
	function onDragEnter(e){
		//console.log("onDragEnter ",e.type);
	}
	function onDragLeave(e){
		//Clear box shadow
		this.style.boxShadow = "none";
	}
	function onDragOver(e){
		if(e.preventDefault){
			e.preventDefault();
			this.style.boxShadow = "0px 0px 0px 3px #fff inset";
		}
		e.dataTransfer.dropEffect = "move";
	}
	function onDrop(e){
		e.stopPropagation();
		e.preventDefault();
		//Get id
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
	}
	window.addEventListener("load",function(){
		//Find arrow move-on to the next page
		arrowMove = document.querySelector(".wrapper__method2__move-on");
		strat();
	},false);
	//Function 'start' subscribes elements on draggable and droppable events.
	function strat(){
		//Initial AJAX
		transferDataByAjax();
		//Start counter
		let timeCounter = document.getElementById("timeCounter");
		if(sessionStorage.getItem("method2")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method2"));
		}
		//Start the method
		window.setTimeout(function(){
			startTimer(timeCounter,253,true);//253
		},2000);
		//Disable language panel during the test
		disabledLanguagePanel();
		//Find parent element
		let basePlace = document.getElementsByClassName("wrapper__method2__single-words")[0];
		//Find all children
		let arrDragable = basePlace.querySelectorAll(".single-words__word");
		//Subscribe for drag events
		for(var i = 0;i < arrDragable.length;i++){
			arrDragable[i].addEventListener("dragstart",function(e){
				//Let an element to be a draggable - 'move'
				e.dataTransfer.effectAllowed = "move";
				//this.id - is an attribut 'id' of a draggable elemen 
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
			drops[i].addEventListener("dragenter",onDragEnter,false);
			drops[i].addEventListener("dragleave",onDragLeave,false);
			drops[i].addEventListener("dragover",onDragOver,false);
			drops[i].addEventListener("drop",onDrop,false);
		}
	}
	function transferDataByAjax(){
		//Subscribe on event 'mousedown' to save into the SessionStorage
		arrowMove.children[0].addEventListener("click",function(e){
			//
				e.preventDefault();
				if(parseInt(ajaxPageCounter) <= 5){
					//Save the current Method's data into the sessionStorage
					prepareDataResult(ajaxPageCounter);
				}
				//Get AJAX data to genarate new page
				getDataByAjax("/method2",ajaxPageCounter).then((serverData)=>{
					//
					if(parseInt(serverData.pageNumber) <= 5){
						//Incremented variable between server and client
						ajaxPageCounter = serverData.pageNumber;
						//Redraw amount of pages
						document.getElementById("pageAmount").innerHTML = serverData.pageNumber;
						//Firstly single words are going back
						bringSingleWordsBack(serverData.singleWords);
						//Secondary redraw empty spaces
						redrawEmptyHoles(serverData.dropableRows);
						//Hide next page arrow
						arrowMove.style.display = "none";
						//Reset current page data
						page = [];
					}else{
						//Go to the result page route and save data to DB when time is up.
						//window.location.href = "/show-result";
					}
				}).catch((err)=>{
					console.log(err);
				});
		},false);
	}
	//childAttrVal - it is a sub 'string' (a part of 'id' value).
	//Here we are checking out does drop zone contain an element with id's value.
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
			//Show 'move on' button
			arrowMove.style.display = "block";
		}else{
			//console.log("Elements ",arrDragable.length);
			arrowMove.style.display = "none";
		}
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(queryNumber){ 
		if(sessionStorage.getItem("method2")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method2"));
			//console.log("Storage exists");
		}
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
		switch(queryNumber){
			case 1: pages['firstPage'] = page;
					pages['gCounter'] = globalCounter;
					pages['pageAmount'] = queryNumber;
				break;
			case 2: pages['secondPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = queryNumber;
				break;
			case 3: pages['thirdPage'] = page;
				break;
			case 4: pages['forthPage'] = page;
				break;
			case 5: pages['fifthPage'] = page;
					pages.gCounter = globalCounter;
					pages.pageAmount = queryNumber;
					//Hide the next page arrow
					arrowMove.style.display = "none";
					//Saving to the SessionStorage
					sessionStorage.setItem("method2",JSON.stringify(pages));
					//Go to the result page route and save data to DB when time is up.
					window.setTimeout(()=>{window.location.href = "/show-result";},1000);
				return;
		}
		pages.gCounter = globalCounter;
		pages.pageAmount = queryNumber;
		let serialized = JSON.stringify(pages);
		//Saving to the SessionStorage
		sessionStorage.setItem("method2",serialized);
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
					prepareDataResult(ajaxPageCounter);
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
	//Redraw skiped words on the page, render new data
	function redrawEmptyHoles(pageRowData){
		const taskRows = document.getElementsByClassName("wrapper__method2__main__task");
		Array.prototype.forEach.call(taskRows,(el,ind,arr)=>{
			//Translated word
			el.children[0].children[0].textContent = pageRowData[ind].translatedWord;
			//'id','index' and 'result'
			el.children[1].children[0].textContent = pageRowData[ind].id;
			el.children[1].children[1].textContent = pageRowData[ind].index;
			el.children[1].children[2].textContent = 0;
			//Droppable place 1 in one row
			worksInsideRedrawEmptyHoles(el.children[2].children[0],pageRowData[ind].engArray[0]);
			//Droppable place 2 in one row
			worksInsideRedrawEmptyHoles(el.children[2].children[1],pageRowData[ind].engArray[1]);
			//Droppable place 3 in one row
			worksInsideRedrawEmptyHoles(el.children[2].children[2],pageRowData[ind].engArray[2]);
		});
		//This function works inside of function 'redrawEmptyHoles'
		//Checking only one field
		function worksInsideRedrawEmptyHoles(elNode,data){
			//If an element doesn't have an empty class. Drop zone doesn't exist
			if(!elNode.classList.contains('task__empty-field')){
				//Incoming data - is an empty string 
				if(data == ""){
					//Add event to one current item
					elNode.addEventListener("dragenter",onDragEnter,false);
					elNode.addEventListener("dragleave",onDragLeave,false);
					elNode.addEventListener("dragover",onDragOver,false);
					elNode.addEventListener("drop",onDrop,false);
					elNode.classList.add('task__empty-field');
					elNode.textContent = "";
				}else{//If incoming data - is a word
					elNode.textContent = data;
				}
			}else{//If an element has an empty class
				//Incoming data - is an empty string 
				if(data == ""){
					elNode.textContent = "";
				}else{//If incoming data - is a word
					//Remove event from one current item
					elNode.removeEventListener("dragenter",onDragEnter,false);
					elNode.removeEventListener("dragleave",onDragLeave,false);
					elNode.removeEventListener("dragover",onDragOver,false);
					elNode.removeEventListener("drop",onDrop,false);
					elNode.classList.remove('task__empty-field');
					//Remove 'drop' event listeners
					elNode.textContent = data; 
				}
			}
			/*if(data == ""){
				if(!elNode.classList.contains('task__empty-field')){
					elNode.classList.add('task__empty-field');
					elNode.textContent = "";
				}
			}else{
				if(elNode.classList.contains('task__empty-field')){
					elNode.classList.remove('task__empty-field');
					//Remove 'drop' event listeners
					elNode.textContent = data; 
				}else{
					elNode.textContent = data; 
				}
			}*/
		}
	}
	//Bring 'single words' back to their places
	function bringSingleWordsBack(singleWordsArray=[]){
		if(singleWordsArray.length > 0){
			const parentSingleWords = document.getElementsByClassName("wrapper__method2__single-words")[0];
			const allDraggable = document.querySelectorAll('.single-words__word');
			allDraggable.forEach((el,ind,arr)=>{
				//Redraw an 'id' of a current element
				allDraggable[ind].setAttribute("id",'drag'+(ind+1));
				let wordInfoId = singleWordsArray[ind].id;
				let wordInfoIndex = singleWordsArray[ind].index;
				//Set attribute - data-wordInfo=value.id+','+value.index
				allDraggable[ind].dataset.wordinfo = wordInfoId+","+wordInfoIndex;
				//Redraw a 'word'
				allDraggable[ind].innerHTML = singleWordsArray[ind].word;
				//Append to the parent
				parentSingleWords.appendChild(allDraggable[ind]);
			});
			//console.log(allDraggable);
		}
	}
})();