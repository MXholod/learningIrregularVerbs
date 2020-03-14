console.log("Method-1");
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
//url - "/method1" getDataByAjax("/method1",2)
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
	const cachedHTMLNodes = [];//[{}]
	let ajaxPageCounter = 1;//Number of start page
	let buttonClicks = 0;
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[],'gCounter':200}
	let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
	let arrowMove;
	let globalCounter = 0;//Specify time from page to page
	window.addEventListener("load",start);
	//Subscribe to parent element on 'onmousedown' event. 
	function start(){
		if(!sessionStorage.getItem("method1")){
			sessionStorage.setItem("method1",JSON.stringify(pages));
		}
		//Prepare HTML nodes for AJAX, fill Array 'cachedHTMLNodes' with Objects of nodes
		findCaheNodes();
		//Start counter
		let timeCounter = document.getElementById("timeCounter");
		window.setTimeout(function(){
				startTimer(timeCounter,203,true);//203
		},2000);
		//Disable language panel during the test
		disabledLanguagePanel();
		//Parent element
		let parentTask = document.querySelector(".wrapper__method1__main");
		if(typeof parentTask !== "undefined" && parentTask !== null){
			parentTask.addEventListener("mousedown",detectButton);
			//Find arrow move-on to the next page
			arrowMove = document.getElementsByClassName("wrapper__method1__move-on")[0];
			arrowMove.children[0].addEventListener("click",function(e){
				//Disable click by 'a' element
				e.preventDefault();
				getDataByAjax("/method1",ajaxPageCounter).then((serverData)=>{
					//
					if(parseInt(serverData.pageNumber) <= 5){
						//Incremented variable between server and client
						ajaxPageCounter = serverData.pageNumber;
						//Redraw amount of pages
						document.getElementById("pageAmount").innerHTML = serverData.pageNumber;
						//Render data in HTML nodes
						insertAjaxDataToNodes(serverData.randomRows);
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
		}else{
			console.log("Parent task wasn't founded");
		}
	}
	//Button has been clicked on "mousedown" event
	function detectButton(e){
		//Correct answer according to the button, 'variant' is true
		if(e.target.getAttribute("class") == "task__correct"){ 
			//Increment counter each time when button is clicked
			buttonClicks++;
			//User has clicked on 'correct' button
			let variant = true;
			//Trying to get data from hidden elements
			if(e.target.nextSibling.nodeType == 1){//If it's a button with a class="task__incorrect"
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
			//Increment counter each time when button is clicked
			buttonClicks++;
			//User has clicked on 'incorrect' button
			let variant = false;
			//Trying to get data from hidden elements
			if(e.target.previousSibling.nodeType == 1){//If it's a button with a class="task__correct"
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
		function makePageData(e){
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
			//Remove event 'mouseup' immediately after creation to avoid duplication
			this.removeEventListener('mouseup',makePageData);
			//Till 9 clicks
			if(buttonClicks < 10){
				arrowMove.style.display = "none";
				//console.log(page," ",buttonClicks);
			}else{//10 clicks, the last button on a page was clicked.
				arrowMove.style.display = "block";
				//Reset click amount
				buttonClicks = 0;
				//Collect marked items. 
				prepareDataResult(ajaxPageCounter);
			}
		}
		this.addEventListener('mouseup',makePageData,false);
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(queryNumber){
		//If sessionStorage exists
		if(sessionStorage.getItem("method1")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method1"));
		}
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
					sessionStorage.setItem("method1",JSON.stringify(pages));
					//Go to the result page route and save data to DB when time is up.
					window.setTimeout(()=>{window.location.href = "/show-result";},1000);
				return;
		}
		pages.gCounter = globalCounter;
		pages.pageAmount = queryNumber;
		let serialized = JSON.stringify(pages);
		//Saving to the SessionStorage
		sessionStorage.setItem("method1",serialized);
	}
	//This function is for time counting, call this function from scripts below: method1, method2, method3
	function startTimer(el,limit=200,reverse=false){
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
	//Call it only once to find HTML nodes and cache them for data insert into 'cachedHTMLNodes' array
	function findCaheNodes(){
		//Work with a part of 'method-1.pug' template and it's block of HTML
		let allRows = document.getElementsByClassName("wrapper__method1__main__task");
		Array.prototype.forEach.call(allRows,(el,ind,arr)=>{
			let oneRowNodes = {};
			oneRowNodes.translatedWord = el.children[0].firstChild;
			oneRowNodes.id = el.children[1].children[0];
			oneRowNodes.spoiled = el.children[1].children[1];
			oneRowNodes.bt_correct = el.children[1].children[2];
			oneRowNodes.bt_incorrect = el.children[1].children[3];
			oneRowNodes.engWord1 = el.children[2].children[0];
			oneRowNodes.engWord2 = el.children[2].children[1];
			oneRowNodes.engWord3 = el.children[2].children[2];
			cachedHTMLNodes.push(oneRowNodes);
		});
	}
	//Insert data from Ajax into the cached fields
	function insertAjaxDataToNodes(dataAjax){
		//Go through the Nodes and insert the data
		cachedHTMLNodes.forEach((el,ind)=>{
			el.translatedWord.textContent = dataAjax[ind].translatedWord;
			el.id.textContent = dataAjax[ind].id;
			el.spoiled.textContent = dataAjax[ind].spoiled;
			el.bt_correct.disabled = false;
			el.bt_incorrect.disabled = false;
			el.engWord1.textContent = dataAjax[ind].engArray[0];
			el.engWord2.textContent = dataAjax[ind].engArray[1];
			el.engWord3.textContent = dataAjax[ind].engArray[2];
		});
	}
})();