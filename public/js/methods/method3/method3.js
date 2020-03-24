console.log("Method-3");
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
	const cachedPageNodes = [];
	let ajaxPageCounter = 1;//Number of start page
	let pages = {};//{'firstPage':[],'secondPage':[],'thirdPage':[],'forthPage':[],'fifthPage':[],'gCounter':300} 
	let page = [];//[{'id':2,'result':0},{'id':88,'result':1},{'id':30,'result':1},...]
	let globalCounter = 0;//Specify time from page to page
	//It should filled with '1', to show completed.
	let fieldsActivity = 0;
	//Variable for next page button
	let moveOnButton = null;
	let cachedInputs = [];
	let resultInputs = [];
	function addToCachedInputs(input){
		//Preserve input to array
		cachedInputs.push(input);
		//Set false by default
		resultInputs.push(false);
	}
	//Find equal inputs and return index.
	function compareInputs(input){
		for(let i = 0;i < cachedInputs.length;i++){
			if(cachedInputs[i] === input){
				if(input.value.length < 2){
					resultInputs[i] = false;
				}else{
					resultInputs[i] = true;
				}
				break;
			}
		}
	}
	//Compare array of the Input elements with boolean 'true'
	function checkResultInputs(){
		let counter = 0;
		for(let i = 0;i < resultInputs.length;i++){
			if(resultInputs[i] === true){
				counter++;
			}
		}
		if(counter == 10){
			//counter = 0;
			return true;
		}else{
			return false;
		}
	}
	//On keyup event
	function subscribeToInputs(event){
		let that = event.target;
		//Get the length of the current input value
		compareInputs(that);
		//Get 'true' if all ten elements in the array are 'true'
		fieldsActivity = checkResultInputs();
		//Evaluate results and write them in hidden HTML elements
		getHiddenData.call(that);
		//If 10 then we will show 'move-on' button, otherwise hide it.
		if(fieldsActivity == true){
			moveOnButton.style.display = "block";
		}else{
			moveOnButton.style.display = "none";
		}
	}
	
	window.addEventListener("load",function(){
		//DIV with arrow
		moveOnButton = document.getElementsByClassName("wrapper__method3__move-on")[0];
		start();
	},false);
	//Subscribe on focus and blur events.
	function start(){
		//Start counter
		let timeCounter = document.getElementById("timeCounter");
		//Cache DOM nodes for AJAX
		cacheNodesForDataInsert();
		//Start timer
		window.setTimeout(function(){
			startTimer(timeCounter,333,true);//333
		},2000);
		//Ready to send data by AJAX
		completed();
		//Disable language panel during the test
		disabledLanguagePanel();
		let allInputs = document.querySelectorAll(".task__empty-field");
		allInputs.forEach((val,ind,arr)=>{
			//Add all input elements to the Array
			addToCachedInputs(val);
			//Type in input
			val.addEventListener("keyup",subscribeToInputs,false);
		});
	}
	//Get hidden result call it when all values in array are 'true'
	function getHiddenData(){
		//Get hidden data
		let hiddenChildren = this.parentNode.previousSibling.children;
		//Correct word or words split by space.
		let hiddenArr = hiddenChildren[3].textContent.split(" ");
		//Comparison of each word that was divided apart by space with a user's word.
		if((hiddenArr[0] === this.value) || (hiddenArr[1] === this.value) || (hiddenArr[2] === this.value)){
			//Correct answer was given
			hiddenChildren[2].textContent = 1;
		}else{
			//Incorrect answer was given
			hiddenChildren[2].textContent = 0;
		}
	}
	//Leave an input
	function completed(){
			//Get an anchor element
			let a = moveOnButton.children[0];
			//Go to next page
			a.addEventListener("click",function(e){
				e.preventDefault();
				//
				if(parseInt(ajaxPageCounter) <= 5){
					//Save the current Method's data into the sessionStorage
					prepareDataResult(ajaxPageCounter);
				}
				//Get AJAX data to genarate new page
				getDataByAjax("/method3",ajaxPageCounter).then((serverData)=>{
					//
					if(parseInt(serverData.pageNumber) <= 5){
						//Incremented variable between server and client
						ajaxPageCounter = serverData.pageNumber;
						//console.log("Dropable words ",serverData.clientData);
						insertDataToCachedNodes(serverData.clientData);
						//Redraw amount of pages
						document.getElementById("pageAmount").innerHTML = serverData.pageNumber;
						//Hide next page arrow
						moveOnButton.style.display = "none";
						//Reset current page data
						page = [];
						//Reset 'resultInputs' all elements to 'false' 
						resultInputs = [];
						cachedInputs = [];
						let allInputs = document.querySelectorAll(".task__empty-field");
						allInputs.forEach((val,ind,arr)=>{
							//Add all input elements to the Array
							addToCachedInputs(val);
						});
					}else{
						//Go to the result page route and save data to DB when time is up.
						//window.location.href = "/show-result";
					}
				}).catch((err)=>{
					console.log(err);
				});
				
			},false);
	}
	//Function invokes when everything is done, and user click the 'Move on' button. It returns an array of objects. Save data to the SessionStorage.
	function prepareDataResult(queryNumber){
		if(sessionStorage.getItem("method3")){
			//Get serialized object
			pages = JSON.parse(sessionStorage.getItem("method3"));
			//console.log("Storage exists");
		}
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
					moveOnButton.style.display = "none";
					//Saving to the SessionStorage
					sessionStorage.setItem("method3",JSON.stringify(pages));
					//Go to the result page route and save data to DB when time is up.
					window.setTimeout(()=>{window.location.href = "/show-result";},1000);
				return;
		}
		pages.gCounter = globalCounter;
		pages.pageAmount = queryNumber;
		let serialized = JSON.stringify(pages);
		//Saving to the SessionStorage
		sessionStorage.setItem("method3",serialized);
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
	//AJAX functionality
	//Cache DOM nodes, run only once
	function cacheNodesForDataInsert(){
		const allRows = document.querySelectorAll(".wrapper__method3__main__task");
		allRows.forEach((el,ind,arr)=>{
			let obj = {};
				obj.translatedWord = el.children[0].firstChild;
					obj.id = el.children[1].firstChild;
					obj.index = el.children[1].children[1];
					obj.result = el.children[1].children[2];
					obj.word = el.children[1].children[3];
						obj.engWordsRow = el.children[2];
			cachedPageNodes.push(obj);
		});
	}
	//Insert data from the server to the cached nodes
	function insertDataToCachedNodes(data){
		//cachedPageNodes
		cachedPageNodes.forEach((row,ind,arr)=>{
			row.translatedWord.textContent = data[ind].translatedWord;
				row.id.textContent = data[ind].id;
				row.index.textContent = data[ind].index;
				row.result.textContent = 0;
				row.word.textContent = data[ind].singleWord.word;
				//1.Node to insert 2. Data words 3. Index of Input element
				detectEmptyField(row.engWordsRow,data[ind].engArray,data[ind].singleWord.index);
		});
	}
	//This function works inside of the 'insertDataToCachedNodes' function
	function detectEmptyField(elNode,data,inputIndex){
		//
		let engFields = elNode.children;//div div input
		let currenElement = engFields[inputIndex];
		//Input is found by incoming index
		if(currenElement.tagName == "INPUT"){
			for(let i = 0;i < 3;i++){
				//Find DIVs
				if(i !== inputIndex){
					engFields[i].firstChild.textContent = data[i];
				}else{//Find INPUT
					//console.log("INPUT ",engFields[i]);
					engFields[i].value = data[i];
				}
			}
		}else{//If "DIV" takes Input's place (redraw the row structure on the page)
			let parent = currenElement.parentNode;
			//Remove children in one row
			let i = 0;
			while(i < 3){
				//Remove event listener from Inputs before they will be removed
				if(parent.firstChild.tagName == "INPUT"){
					parent.firstChild.removeEventListener('keyup',subscribeToInputs);
				}
				parent.removeChild(parent.firstChild);
				i++;
			}
			generateElements(parent,inputIndex,data);
		}
	}
	//Create new elements with data for one row
	function generateElements(parent,inputIndex,data){//data - engArray[]
		//Create new children
		let div1 = document.createElement("DIV");//task__e2
		let div2 = document.createElement("DIV");
		let input = document.createElement("INPUT");
		//
			input.setAttribute("class","task__e1 task__empty-field");
			input.addEventListener('keyup',subscribeToInputs,false);
		//'inputIndex' is - 0 1 2, the random place for input in one row
		switch(inputIndex){
			case 0 : 	input.setAttribute("value",data[0]); 
					 parent.appendChild(input);
					 	div1.setAttribute("class","task__e2");
					 	div1.innerHTML = data[1];
					 parent.appendChild(div1);
					 	div2.setAttribute("class","task__e3");
					 	div2.innerHTML = data[2];
					 parent.appendChild(div2);
				break;
			case 1 : 	div1.setAttribute("class","task__e1");
					 	div1.innerHTML = data[0];
					  parent.appendChild(div1);
					  	input.setAttribute("value",data[1]);
					 parent.appendChild(input);
						div2.setAttribute("class","task__e3");
						div2.innerHTML = data[2];
					 parent.appendChild(div2);
				break;
			case 2 : div1.setAttribute("class","task__e1");
						div1.innerHTML = data[0];
					 parent.appendChild(div1);
						div2.setAttribute("class","task__e2");
						div2.innerHTML = data[1];
					 parent.appendChild(div2);
					 	input.setAttribute("value",data[2]);
					 parent.appendChild(input);
				break;
		}
	}
})();