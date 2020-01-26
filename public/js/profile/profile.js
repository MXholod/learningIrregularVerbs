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
//Clicking on menu button panels are changing
(function(){
	window.addEventListener("load",function(){
		clearAndSetClassMenu();
		//Close Failed Result Panel
		closeResultPanel();
	},false);
	var classesArray = [
		"a-profile__menu__settings_active",
		"a-profile__menu__methodOne_active",
		"a-profile__menu__methodTwo_active",
		"a-profile__menu__methodThree_active"
		];
	var pastIndex = 0;	
	var classesArrayMovePanel = [
		"wrapper__profile__move-forward-content",
		"wrapper__profile__move-back-content"
	];	
	function clearAndSetClassMenu(){
		var ul = document.getElementById("profileMenu");
		var LIs = ul.getElementsByTagName("LI");
		for(var i = 0;i<LIs.length;i++){
			(function(j){//Save local variable value
				LIs[j].addEventListener("click",function(){
					//If it is A element
					if(this.firstChild.nodeType === 1){
						//console.log("Element",this.firstChild);
						//If class doesn't exist !false
							removeUnusedClassesMenu(LIs);
							this.firstChild.classList.add(classesArray[j]);
							//Draw the data result, LI element as parameter
							drawData(this);
							movePanels(j);
					}else{
						//console.log("This node type is not an element",this.firstChild.nodeValue);
					}
				},false);
			})(i);
		}
	}
	function removeUnusedClassesMenu(elementsArray){
		var len1 = elementsArray.length;//Array of LI
		var len2 = classesArray.length;//Array of classes
		if(len1 >= 0){
			for(var i = (len1-1); i >= 0;i--){
				for(var j = 0;len2 > j;j++){
					//Check all A elements, do they contain classes
					if(elementsArray[i].firstChild.classList.contains(classesArray[j])){
						elementsArray[i].firstChild.classList.remove(classesArray[j]);
					}
				}
			}
		}else{
			return false;
		}
	}
	function movePanels(idexPanel){
		var parentSection = document.getElementsByClassName('wrapper__profile__content')[0];
		//var panel = parentSection.firstChild;
		var panels = parentSection.getElementsByTagName("SECTION");
		//Click twice on menu button
		if(idexPanel === pastIndex){
			//console.log("Indexes are equal!");
			//It is no need to do nothing if clicking by the same button twice
		}else{
			if(panels[0].classList.contains("wrapper__profile__move-default-content")){
				panels[0].classList.remove("wrapper__profile__move-default-content");
			}
			//Ex panel (disappear)
			if(panels[0].classList.contains(classesArrayMovePanel[0])){
				panels[pastIndex].classList.remove(classesArrayMovePanel[0]);
			}
			panels[pastIndex].classList.add(classesArrayMovePanel[1]);
			//New panel (appear)
			if(panels[0].classList.contains(classesArrayMovePanel[1])){
				panels[idexPanel].classList.remove(classesArrayMovePanel[1]);
			}
			panels[idexPanel].classList.add(classesArrayMovePanel[0]);
			//Save current index to check for the next time
			pastIndex = idexPanel;
			//console.log("Past index is ",pastIndex);
		}
	}
	//Pagination settings
	const paginationSettings = {
		"itemsOnPage":5,
		"buttonsAElement":[],
		"activePage":0,
		"activePageStyle": null,
		"ulBaseOffset":0,
		"methodNumber":0
	};
	//Draw data result incoming from server
	function drawData(elLi){
		//Get a number of a method that is clicked by. 
		var methodNum = Number(elLi.dataset.orderexercise);
		//Check a number of a method to detect a panel
		switch(methodNum){
			case 1: requestToServer(1,true).then(function(serverData){
					//Initial pagination settings each time when switch between panels
					paginationSettings.itemsOnPage = 5;
					paginationSettings.buttonsAElement = [];
					paginationSettings.activePage = 0;
					paginationSettings.activePageStyle = null;
					paginationSettings.ulBaseOffset = 0;
					paginationSettings.methodNumber = methodNum;
					//console.log(serverData);
					//Show the list of data when panel appears. First page data only. 1 - is by default.
					displayData(1,serverData);
					//Create pagination buttons according to the data
					createPaginationButtons(serverData);
					//Redraw page number by default - 1
					document.getElementById(`pageNumber-${serverData[0]}`).textContent = "1";
					//Get data when clicking by pagination buttons
					getDataByClickingPages(function(){
						//Check the property 'paginationSettings.activePageStyle'. Does it contain the class? 
						if(paginationSettings.activePageStyle != null){
							//If class is present then remove it.
							paginationSettings.activePageStyle.classList.remove("list-pagination__active-page");
						}
						//Save 'this' - is an 'a' element
						paginationSettings.activePageStyle = this;
						//Set class to the 'a' element
						paginationSettings.activePageStyle.classList.add("list-pagination__active-page");
						//Convert String to the Number of current Method
						let pageNumber = +this.textContent;
						//Redraw the number of the current Method and the Page.
							document.getElementById(`pageExercise-${serverData[0]}`).textContent = serverData[0];
							document.getElementById(`pageNumber-${serverData[0]}`).textContent = pageNumber;
						//Show the data on the Page
						displayData(pageNumber,serverData);
					});
				}).catch(function(error) {
					//
					console.log("Error!!! ",error);
				});
			break;
			case 2: requestToServer(2,true).then(function(serverData){
					//Initial pagination settings each time when switch between panels
					paginationSettings.itemsOnPage = 5;
					paginationSettings.buttonsAElement = [];
					paginationSettings.activePage = 0;
					paginationSettings.activePageStyle = null;
					paginationSettings.ulBaseOffset = 0;
					paginationSettings.methodNumber = methodNum;
					//console.log(serverData);
					//Show the list of data when panel appears. First page data only. 1 - is by default.
					displayData(1,serverData);
					//Create pagination buttons according to the data
					createPaginationButtons(serverData);
					//Redraw page number by default - 1
					document.getElementById(`pageNumber-${serverData[0]}`).textContent = "1";
					//Get data when clicking by pagination buttons
					getDataByClickingPages(function(){
						//Check the property 'paginationSettings.activePageStyle'. Does it contain the class? 
						if(paginationSettings.activePageStyle != null){
							//If class is present then remove it.
							paginationSettings.activePageStyle.classList.remove("list-pagination__active-page");
						}
						//Save 'this' - is an 'a' element
						paginationSettings.activePageStyle = this;
						//Set class to the 'a' element
						paginationSettings.activePageStyle.classList.add("list-pagination__active-page");
						//Convert String to the Number of current Method
						let pageNumber = +this.textContent;
						//Redraw the number of the current Method and the Page.
							document.getElementById(`pageExercise-${serverData[0]}`).textContent = serverData[0];
							document.getElementById(`pageNumber-${serverData[0]}`).textContent = pageNumber;
						//Show the data on the Page
						displayData(pageNumber,serverData);
					});
				}).catch(function(error) {
					//
					console.log("Error!!! ",error);
				});
			break;
			case 3: requestToServer(3,true).then(function(serverData){
					//Initial pagination settings each time when switch between panels
					paginationSettings.itemsOnPage = 5;
					paginationSettings.buttonsAElement = [];
					paginationSettings.activePage = 0;
					paginationSettings.activePageStyle = null;
					paginationSettings.ulBaseOffset = 0;
					paginationSettings.methodNumber = methodNum;
					//console.log(serverData);
					//Show the list of data when panel appears. First page data only. 1 - is by default.
					displayData(1,serverData);
					//Create pagination buttons according to the data
					createPaginationButtons(serverData);
					//Redraw page number by default - 1
					document.getElementById(`pageNumber-${serverData[0]}`).textContent = "1";
					//Get data when clicking by pagination buttons
					getDataByClickingPages(function(){
						//Check the property 'paginationSettings.activePageStyle'. Does it contain the class? 
						if(paginationSettings.activePageStyle != null){
							//If class is present then remove it.
							paginationSettings.activePageStyle.classList.remove("list-pagination__active-page");
						}
						//Save 'this' - is an 'a' element
						paginationSettings.activePageStyle = this;
						//Set class to the 'a' element
						paginationSettings.activePageStyle.classList.add("list-pagination__active-page");
						//Convert String to the Number of current Method
						let pageNumber = +this.textContent;
						//Redraw the number of the current Method and the Page.
							document.getElementById(`pageExercise-${serverData[0]}`).textContent = serverData[0];
							document.getElementById(`pageNumber-${serverData[0]}`).textContent = pageNumber;
						//Show the data on the Page
						displayData(pageNumber,serverData);
					});
					
				}).catch(function(error) {
					//
					console.log("Error!!! ",error);
				});
			break;
		}
		
	}
	//AJAX and Promise request to retrieve the data from the server.
	function requestToServer(methodNumber,jsonParse){
		//Get User hash from hidden HTML element
		var hiddenUserHash = document.getElementById("hiddenHash").textContent;
		//Use Promise to get the data
		return new Promise(function(resolve, reject){
			var xmlHttp = getXmlHttp();
			xmlHttp.onload = function(){
				if(jsonParse){
					try{
						resolve(JSON.parse(this.responseText));
					}catch(e){
						reject(e);
					}
				}else{
					resolve(this.responseText);
				}
			};
			xmlHttp.addEventListener("error", function() {
				reject(new Error("Network error"));
			});
			xmlHttp.open('POST','/user_results',true);
			xmlHttp.setRequestHeader('Content-Type','application/json; charset=utf-8');
			//Object to JSON	
			var methodNum = JSON.stringify({
				methNum:methodNumber,
				userHash:hiddenUserHash
				});
			//Send object of data
			xmlHttp.send(methodNum);
		});
	}
	//Draw the pagination buttons if data come from the server
	function createPaginationButtons(data){
		//'data' looks like - [methodNumber,arrayOfData]
		if(data[1].length > 0){
			//Get the parent block of the pagination. If data is absent then hide this block.
			let parentList = document.querySelector("#listP-"+data[0]);
			if(parentList.style.display == "none"){
				parentList.style.display = "block";
			}
			//Find a specific pagination block according to the method. It is UL element.
			let ulMethod = document.querySelector(".pagination-"+data[0]);	
				ulMethod.innerHTML = "";
			//Calculate an amount of pages.
			let pages = Math.ceil(data[1].length / paginationSettings.itemsOnPage);//11 / 5 
			//Manage the arrow buttons
			manageArrowButtons(pages,ulMethod,data[0]);
			//Generate pagination items according to the incoming data
			for(let i = 1;i <= pages;i++){
				let li = document.createElement("LI");
					li.setAttribute("class","page-item");
				let a = document.createElement("A");
					a.setAttribute("class","page-link");
					a.setAttribute("href","#");
				let text = document.createTextNode(i); 
					a.appendChild(text);
					li.appendChild(a);
					//Save A element into the paginationSettings array
					paginationSettings.buttonsAElement.push(a);
					ulMethod.appendChild(li);
			}
			//If the array isn't empty
			if(paginationSettings.buttonsAElement.length > 0){
				//Save first 'a' element
				paginationSettings.activePageStyle = paginationSettings.buttonsAElement[0];
				//Set class to the 'a' element
				paginationSettings.activePageStyle.classList.add("list-pagination__active-page");
			}
		}else{//Get the parent block of the pagination. If data is present then show this block.
			let parentList = document.querySelector("#listP-"+data[0]);
			parentList.style.display = "none";
		}
	}
	//Manage the arrow buttons
	function manageArrowButtons(pages,ulMethod,methodN){
		//Get arrow pagination buttons.
		let leftB = document.getElementById(`arrowLeft-${methodN}`);
		let rightB = document.getElementById(`arrowRight-${methodN}`);
		//If more than three then shows the arrow buttons.
		if(pages > 3){
			leftB.parentNode.style.visibility = "visible";
			rightB.parentNode.style.visibility = "visible";
			//Slide to left
			setEventArrowButtons(leftB,function(){
				//Get the value of the left property of the style object
				paginationSettings.ulBaseOffset = isNaN(parseInt(ulMethod.style.left)) ? 0 : parseInt(ulMethod.style.left);
				//If less than zero 
				if(paginationSettings.ulBaseOffset < 0){
					//Move UL element to the right when clicking on the left button.
					ulMethod.style.left = (paginationSettings.ulBaseOffset+33)+"px";
				}
			});
			//Slide to right
			setEventArrowButtons(rightB,function(){
				//Get the value of the left property of the style object
				paginationSettings.ulBaseOffset = isNaN(parseInt(ulMethod.style.left)) ? 0 : parseInt(ulMethod.style.left);
				//Calculate right edge of moving UL
				let lastPosition = 33 * ((-1) * pages) - ((-3) * 33);
				//If more than negative edge of the left property of the style object.
				if(paginationSettings.ulBaseOffset > lastPosition){
					//Move UL element to the left when clicking on the right button.
					ulMethod.style.left = (paginationSettings.ulBaseOffset-33)+"px";
				}
			});
		}//If pages are less than three hide pagination block.
		if(pages <= 3){
			leftB.parentNode.style.visibility = "hidden";
			rightB.parentNode.style.visibility = "hidden";
		}
	}
	function setEventArrowButtons(btn,func){
		btn.addEventListener("click",func,false);
	}
	//Get data by clicking on the pages buttons
	function getDataByClickingPages(byOnClick){
		//Array of A elements, subscribe on click event
		if(paginationSettings.buttonsAElement.length > 0){
			//We sort through all the previously created elements.
			for(let elA of paginationSettings.buttonsAElement){
				//Click by A element
				elA.addEventListener("click",function(){
					//Get the number of page
					byOnClick.call(this);
				},false);
			}
		}
	}
	//Display data from the DB in HTML
	function displayData(pageNum,data){
		//'data' looks like - [methodNumber,arrayOfData]
		//If number of pages are equal then do nothing.
		if(paginationSettings.activePage === pageNum){
			return false;
		}else{
			paginationSettings.activePage = pageNum;
		}
		//Calculate a portion of the elements. Start and End positions
		let start = (pageNum - 1) * paginationSettings.itemsOnPage;
		let end = start + paginationSettings.itemsOnPage;
		//Slice the portion of the elements
		let portioOfPage = data[1].slice(start,end);
		//Find the parent element (Panel)
		let parentContainer = document.querySelector(`#listC${data[0]}`);
		//Show button 'delete results'
		if(portioOfPage.length > 0){
			document.getElementById(`methodDelete${data[0]}`).style.visibility = "visible";
		}
		//Get all of his five children DIVs
		let fiveDivRows = parentContainer.children;
		//Hide all elements before the data will be inserted into them.
		for(let i = 0;i < paginationSettings.itemsOnPage;i++){
			fiveDivRows[i].style.visibility = "hidden";
		}
		//Set data in the loop
		for(let i = 0;i < portioOfPage.length;i++){
			//Show hidden element because it contains data.
			if(fiveDivRows[i].style.visibility == "hidden"){
				fiveDivRows[i].style.visibility = "visible";
			}
			//First line in row
			fiveDivRows[i].firstChild.children[0].children[1].textContent = createDateFormat(portioOfPage[i].dateTime); 
			fiveDivRows[i].firstChild.children[1].children[1].textContent = portioOfPage[i].successResult; 
			fiveDivRows[i].firstChild.children[2].children[1].textContent = portioOfPage[i].failureResult; 
			fiveDivRows[i].firstChild.children[3].children[1].textContent = portioOfPage[i].totalAnswers; 
			//Second line in row
			fiveDivRows[i].lastChild.children[0].textContent = "";//Cell is empty 
			fiveDivRows[i].lastChild.children[1].children[1].textContent = portioOfPage[i].gameTime; 
			fiveDivRows[i].lastChild.children[2].children[1].textContent = portioOfPage[i].successPercentage+"%"; 
			//Get link
			var a = fiveDivRows[i].lastChild.children[3].firstChild;
			//Get link's value
			var href = a.getAttribute("href");
				//This variable will store the - '/profile/method1-mistaken-results'
				var aValue = "";
				//Get part of URN: profile/method1-mistaken-results
				//If question sign is found cut the link
				if(href.indexOf("?") !== -1){
					//Cut from 0 index until question sign but without it '/profile/method1-mistaken-results'?
					aValue = href.substring(0,href.indexOf("?"));
					//Add query string part: profile/method1-mistaken-results + ?id="+uid+"&dt="+dtime
					var fullHref = aValue+"?id="+portioOfPage[i].uid+"&dt="+portioOfPage[i].dateTime;
					//console.log("Test 1",href.length," ",fullHref.length);
					a.setAttribute("href",fullHref);
				}else{
					//Compare 
					if(aValue.length <= href.length){
					//Add query string part: profile/method1-mistaken-results + ?id="+uid+"&dt="+dtime
					var fullHref = href+"?id="+portioOfPage[i].uid+"&dt="+portioOfPage[i].dateTime;
					a.setAttribute("href",fullHref);
					//console.log("Test 2",href.length," ",aValue.length);
					}
				}
			//Subscribe on click event 
			a.addEventListener("click",displayFailed,false);
		}
	}
	//Create date and time format
	function createDateFormat(ms){
		let date = new Date(ms);
		let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
		let month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
		let year =  date.getFullYear();
		let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
		let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
		return `${day}/${month}/${year} ${hours}:${minutes}`;
	}
	//Temporary storage incoming data from the server
	//const incomingData = [];
	/* Show Failed results by clicking on 'a' element and take data from it's value attribute */
	function displayFailed(e){
		e.preventDefault();
		let aValue = e.target.getAttribute("href");
		//'id' of panel is - displayFailedResults
		//Parse a string - /profile/method1-mistaken-results ? id=EOXhq4OocCN4afEF & dt=1572124235330
		let startIdInd = aValue.indexOf("?");
		let endIdInd = aValue.lastIndexOf("&");
			//Plus four characters ?id= to get a correct hash of an 'id' - EOXhq4OocCN4afEF
			let id = aValue.substring((startIdInd + 4),endIdInd);
			//console.log("id ",id);
		let startDateTimeInd = aValue.indexOf("&");
			//Plus four characters &dt= to get a correct hash of a 'dateTime' - 1572124235330
			let dt = aValue.substring((startDateTimeInd + 4));
			//console.log("date time ",dt);
			//Get current language
		let language = "";
			if(typeof(Storage) !== "undefined"){
				if(sessionStorage.getItem("settings")){
					let settings = JSON.parse(sessionStorage.getItem("settings"));
					if(settings.language === "ru"){
						language = "rus"; 
					}else{
						language = settings.language;
					} 
				}
			}
		//Request to the server to get the data - Failed User Result
		getFailedData(id,dt,language).then(function(failedData){
			//failedData - {currentLanguage:string,incomingData:[]}
			//Move panel to the top
			let failedResultsPanel = document.getElementById("displayFailedResults");
			failedResultsPanel.style.top = "5px";
			//Get zero failed panel
			let displayIfZeroFailed = document.getElementById("displayIfZeroFailed");
			//If there are no mistakes. Count failed, failedData.incomingData - is an Array
			if(failedData.incomingData.length <= 0){
				//If failed data don't exist hide this block
				if(displayIfZeroFailed.classList.contains("failed-results__absent-data-hide")){
					displayIfZeroFailed.classList.remove("failed-results__absent-data-hide");
					//Display congratulation sentence!
					displayIfZeroFailed.classList.add("failed-results__absent-data-visible");
				}
			}else{
				if(displayIfZeroFailed.classList.contains("failed-results__absent-data-visible")){
					displayIfZeroFailed.classList.remove("failed-results__absent-data-visible");
					//Hide congratulation sentence.
					displayIfZeroFailed.classList.add("failed-results__absent-data-hide");
				}
				//Display data first time. Show panel with failed results
				drawDataFromServer(failedData);
			}
		}).catch(function(err){
			console.log(err);
		});
	}
	//Request to the server for the data
	function getFailedData(uid,dateTime,lang){
		return new Promise(function(resolve,reject){
			let xhr = getXmlHttp();
			xhr.onload = function(){
				try{
					//Attempt to get the data
					resolve(JSON.parse(xhr.responseText));
				}catch(e){
					reject(e);
				}
			};
			xhr.addEventListener("error", function() {
				reject(new Error("Network error"));
			});
			xhr.open('POST','/user-failed-results',true);
			xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
			//Object to JSON	
			var failedRes = JSON.stringify({
				method:paginationSettings.methodNumber,
				id:uid,
				dt:dateTime,
				language:lang
				});
			//Send object of data
			xhr.send(failedRes);
		});
	}
	//This function is only close Failed Results Panel
	function closeResultPanel(){
		//Subscribe on click event to close Result Panel
		let closeFailedResultsPanel = document.getElementById("closeFailedResults");
		closeFailedResultsPanel.addEventListener("click",function(){
			let failedResultsPanel = document.getElementById("displayFailedResults");
			//Move panel to the down
			failedResultsPanel.style.top = "520px";
			//Enable radio language buttons
			let rus = document.getElementById("rus");
			rus.disabled = false;
			let ukr = document.getElementById("ukr");
			ukr.disabled = false;
			
			//Clear parent element that displays data in the children elements	
			let displayIfPresentFailed = document.getElementById("displayIfPresentFailed");
			//Remove table element
			if(displayIfPresentFailed.firstChild !== null){
				displayIfPresentFailed.removeChild(displayIfPresentFailed.firstChild);
			}
		},false);
	}
	//This function is for drawing the incoming failed data. fd - is a failed data
	function drawDataFromServer(fd){
		//Disable radio language buttons
			let rus = document.getElementById("rus");
			rus.disabled = true;
			let ukr = document.getElementById("ukr");
			ukr.disabled = true;
		//Parent element displays data in the children elements	
		let displayIfPresentFailed = document.getElementById("displayIfPresentFailed");
		//The data for the children elements - redrawOnlyData()
		let onlyTextData = redrawOnlyData(fd.incomingData,fd.currentLanguage);
			//
			var mainContainer = document.createElement("div");
			mainContainer.setAttribute("class","main-container");
			//
			var mainRow = upRow = downRow = upData1 = upData2 = upData3 = downData1 = downData2 = downData3 = tx1 = tx2 = tx3 = tx4 = tx5 = tx6 = null;
			onlyTextData.forEach(function(el,ind,arr){
				mainRow = document.createElement("div");
				mainRow.setAttribute("class","main-row");
					//Make first row
					upRow = document.createElement("div");
					upRow.setAttribute("class","up-row");
						upData1 = document.createElement("div");
						upData2 = document.createElement("div");
						upData3 = document.createElement("div");
							tx1 = document.createTextNode(el.eng[0]);
							tx2 = document.createTextNode(el.eng[1]);
							tx3 = document.createTextNode(el.eng[2]);
								upData1.appendChild(tx1);
								upData2.appendChild(tx2);
								upData3.appendChild(tx3);
					upRow.appendChild(upData1);
					upRow.appendChild(upData2);
					upRow.appendChild(upData3);
					//Make second row
					downRow = document.createElement("div");
					downRow.setAttribute("class","down-row");
						downData1 = document.createElement("div");
						downData2 = document.createElement("div");
						downData3 = document.createElement("div");
							tx4 = document.createTextNode(el.translation[0]);
							tx5 = document.createTextNode(el.translation[1]);
							tx6 = document.createTextNode(el.translation[2]);
								downData1.appendChild(tx4);
								downData2.appendChild(tx5);
								downData3.appendChild(tx6);
					downRow.appendChild(downData1);
					downRow.appendChild(downData2);
					downRow.appendChild(downData3);
				mainRow.appendChild(upRow);
				mainRow.appendChild(downRow);
				//
				mainContainer.appendChild(mainRow);
			});
			//
			displayIfPresentFailed.appendChild(mainContainer);
	}
	//Redraw only data when switching between languages
	function redrawOnlyData(dataWords,lang){
		var verbs = dataWords.map((item,ind,arr)=>{
			if(lang == "rus"){
				return { "eng":item.eng, "translation":item.rus };
			}else{
				return { "eng":item.eng, "translation":item.ukr };
			}
		});
		return verbs;
	}
})();
//Delete data results of a chosen Method
(function(){
	//Blocking Multiple clicks at the same time on panels. 
	const blockClick = {switchState : true};
	//
	window.addEventListener("load",function(){
		//Display button 'Delete the whole methods data' and user profile
		let allUserDataDelete = document.getElementById(`methodDelete${4}`);
		allUserDataDelete.style.visibility = "visible";
		//Start each method for data deleting
		clickDeleteData("methodDelete1",slidePanelUpDown);
		clickDeleteData("methodDelete2",slidePanelUpDown);
		clickDeleteData("methodDelete3",slidePanelUpDown);
		//Delete the whole user's data
		clickDeleteData("methodDelete4",slidePanelUpDown);
	});
	//
	function clickDeleteData(elId,funcToDo){
		//Find button
		let button = document.getElementById(elId).firstChild;
		button.addEventListener("click",funcToDo,false);
	}
	//Find out the number of the method
	function getMethodNumber(e){
		//el.dataset.methodDelete1
		let attrVal = this.getAttribute("data-language");
		let num = attrVal.slice(attrVal.length-1,attrVal.length);
		return num;
	}
	function slidePanelUpDown(){
		//Parent is a DIV context had got from BUTTON 
		let parent = this.parentNode;
		//Get number of current method
		let methodNumber = getMethodNumber.bind(parent)();
		//Cover by "Yes"/"No" panel
		//parent.children[1].style.top = "-38px";//.link__delete-method__links == this.children[0]
		if(blockClick.switchState){//If switcher isn't occupied
			goUp.call(parent.children[1],"-38px");//(Go up)
		}
		//The first link is sending data
		parent.children[1].children[0].addEventListener("click",function(event){
			event.preventDefault();
			//Context of element an 'A'
			sendOrNotData.call(this,true,methodNumber);
		},false);
		//The second link isn't sending data
		parent.children[1].children[1].addEventListener("click",function(event){
			event.preventDefault();
			//Context of element an 'A'
			sendOrNotData.call(this,false,methodNumber);
		},false);
	}
	//Click on button "Yes" or "No" to delete data
	function sendOrNotData(canItSend,methodN){
		//Delete user's results
		if(canItSend){
			if(blockClick.switchState){//If switcher isn't occupied
				//Get current User's hash
				let hash = document.getElementById("hiddenHash").firstChild.nodeValue;
				//Request to the server
					deleteDataResults(methodN,hash).then((serverData)=>{
						if(serverData.status){
							if(serverData.methodNumber != 4){//Delete data of the Methods 1,2,3
								//Clear all fields in the interface
								clearFields(methodN);
								//Buttons panel goes down
								goDown.call(this.parentNode,"0px");//(Go up)
								//Hide button 'Delete results'
								document.getElementById("methodDelete"+methodN).style.visibility = "hidden";
								//Delete pagination items, find the pagination block (UL element) according to the method to remove LI.
								let ulMethod = document.querySelector(".pagination-"+methodN);
								if(ulMethod.children.length > 0){//LI (exists/exist) 
									for(let i = 0;ulMethod.children.length > i;i++){
										ulMethod.removeChild(ulMethod.children[i]);
									}
								}
								//console.log("GOOD ",serverData," ",res);
							}else{//Method 4 - Delete all User's data
								//console.log(serverData.methodNumber);
								//Buttons panel goes down
								goDown.call(this.parentNode,"0px");//(Go up)
								//Go back to the 'Start page', User data have been successfully deleted
								window.location.href = "/";
							}
						}else{//The number of deleted rows is NOT the same in both databases
							//console.log("BAD ",serverData);
						}
					}).catch(function(err){
						console.log(err);
					});		
			}
		}else{
			if(blockClick.switchState){//If switcher isn't occupied
				//Decline request
				goDown.call(this.parentNode,"0px");//(Go up)
			}
		}
	}
	//Lift panel to delete method data up
	function goUp(limitPx){
		//Occupy the switcher
		blockClick.switchState = false;
		//this - specifies div.class="link__delete-method__links" context is bound above
		let that = this;
		let limitPix = parseInt(limitPx) + 1;
		var t1 = null,t2 = null,time = 30,count = 1,currentPx = 1;
		t1 = window.setTimeout(function f1(){
			t2 = window.setTimeout(f1,time);
				//Go from zero to negative
				if(limitPix < 0){//-38px < 0px (Go up) 
					if(limitPix == currentPx){//-38 == -38 - true	
						if(t2 != null){//Exit
							window.clearTimeout(t2);
							t2 = null;
							//Release the switcher
							blockClick.switchState = true;
						}
					}
					//Create negative value
					currentPx = ((count++)*(-1));
					that.style.top = currentPx+"px";
				}
				//Clear timer1
				if(t1 != null){
					window.clearTimeout(t1);
					t1 = null;
				}
		},time);
	}
	//Lift panel to delete method data down
	function goDown(limitPx){
		//Occupy the switcher
		blockClick.switchState = false;
		//this - specifies div.class="link__delete-method__links" context is bound above
		let that = this;
		let limitPix = parseInt(limitPx);//0
		var t1 = null,t2 = null,time = 30,count = 0,currentPx = 0,start = parseInt(that.style.top);
		t1 = window.setTimeout(function f1(){
			t2 = window.setTimeout(f1,time);
				//Go from negative to zero
				if(limitPix == 0){//0px == 0px (Go down) 
					if(limitPix == start){//0 == 0 - true
						if(t2 != null){//Exit
							window.clearTimeout(t2);
							t2 = null;
							//Release the switcher
							blockClick.switchState = true;
						}
					}
					//Create positive value
					currentPx = (start += 1);
					that.style.top = currentPx +"px";	
				}
				//Clear timer1
				if(t1 != null){
					window.clearTimeout(t1);
					t1 = null;
				}
		},time);
	}
	//Send data to delete them on the server
	function deleteDataResults(methodNumber,hash){
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
			xhr.open('DELETE','/delete-user-result',true);
			xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
			//Object to JSON	
			var methodDeleting = JSON.stringify({
					method:methodNumber,
					hash:hash
				});
			//Send object of data
			xhr.send(methodDeleting);
		});
	}
	//Clear fields after deleted
	function clearFields(methodNum){
		//Find the parent element (Panel)
		let parentContainer = document.querySelector(`#listC${methodNum}`);
		//Get all of his five children DIVs
		let fiveDivRows = parentContainer.children;
		//Set data in the loop
		for(let i = 0;i < fiveDivRows.length;i++){
			//Hide elements after data have been deleted.
			fiveDivRows[i].style.visibility = "hidden";
			//First line in row
			fiveDivRows[i].firstChild.children[0].children[1].textContent = ""; 
			fiveDivRows[i].firstChild.children[1].children[1].textContent = ""; 
			fiveDivRows[i].firstChild.children[2].children[1].textContent = ""; 
			fiveDivRows[i].firstChild.children[3].children[1].textContent = ""; 
			//Second line in row
			fiveDivRows[i].lastChild.children[0].textContent = "";//Cell is empty 
			fiveDivRows[i].lastChild.children[1].children[1].textContent = ""; 
			fiveDivRows[i].lastChild.children[2].children[1].textContent = ""; 
				let attrVal = '/profile/method'+methodNum+'-mistaken-results';
			fiveDivRows[i].lastChild.children[3].firstChild.setAttribute("href",attrVal);
		}
	}
})();
//AJAX for adding user's data to rewrite his Login, Password and Email(if exists)
(function(){
	//Keep correct value of Login,Password,Email inputs
	var correctLogPassEmail = [];
	//Show dialogue window before User save his own data
		window.addEventListener('load',function(){
				//Check onkeyup event Login input, Params: id,callback
				check(["login"],login);
				//Check onkeyup event Password input, Params: id,callback
				check(["password"],password);
				//Check onkeyup event Email input, Params: id,callback
				check(["emailWarn","emailNotify"],email);
				//They will keep a state of two inputs - both of them must be correct to show button Submit
					var resultLog = true,resultPas = true;
				//Login onblur event
				checkWhenLeave(["login"],function(){//console.log(this);
					//Call function login() again when leave input 
					resultLog = login.call(this);//Get correct context
					//if(resultLog && resultPas){
					var userSubmit = document.getElementById("userSubmit");
					if(resultLog && resultPas){//Good
						document.forms.resaveUserData.elements.subResaveData.disabled = false;//Show submit button
						userSubmit.style.backgroundColor = "#55e083";
					}else{
						document.forms.resaveUserData.elements.subResaveData.disabled = true;//Hide submit button
						userSubmit.style.backgroundColor = "#ff7266";
						//document.forms.resaveUserData.onsubmit = toSubmit;
					}
				});
				//Password onblur event
				checkWhenLeave(["password"],function(){
					//Call function password() again when leave input
					resultPas = password.call(this);//Get correct context
					var userSubmit = document.getElementById("userSubmit");
					if(resultLog && resultPas){//Good
						document.forms.resaveUserData.elements.subResaveData.disabled = false;//Show submit button
						userSubmit.style.backgroundColor = "#55e083";
					}
					else{
						document.forms.resaveUserData.elements.subResaveData.disabled = true;//Hide submit button
						userSubmit.style.backgroundColor = "#ff7266";
					}
				});
				checkWhenLeave(["emailWarn","emailNotify"],function(){
					//Call function email() again when leave input
					var emailRes = email.call(this);//Get correct context
					if(!emailRes){//"Incorrect"
						//userSubmit.disabled = true;//Hide submit button
					}
					else{//"Correct"
						//userSubmit.disabled = false;//Show submit button
					}
				});
				//Set click event to show dialogue window
				dialogueWin();
				
		});
		//Show dialogue window
		function dialogueWin(){
			//Submit button
			var userSubmit = document.querySelector("#userSubmit");
			//Element smokeBlock
			var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_hide");
			//Add elements by click
			userSubmit.onclick = function(){
				smokeBlock.className = "wrapper__profile__smokeBlock_show";
				//Set click event to hide dialogue window
				removeDialogueWin();
				return false;
			};
		}
		//Hide dialogue window, display sets none.
		function removeDialogueWin(){
			//Button for refusing data save
			var refuseDataToSave = document.querySelector("#refuseDataToSave");
			//Button for accepting data save
			var acceptDataToSave = document.querySelector("#acceptDataToSave");
			//Remove dialogue window and refuse to save user's data
			refuseDataToSave.onclick = function(){
				var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_show");
				smokeBlock.className = "wrapper__profile__smokeBlock_hide";
			};
			//Save user's data through AJAX
			acceptDataToSave.onclick = function(){
				var smokeBlock = document.querySelector(".wrapper__profile__smokeBlock_show");
				//Start showing preloader
				var loader = document.querySelector(".wrapper__profile__smokeBlock__loader");
				loader.style.display = "block";
				//Disable the buttons
				var bt = this;
				this.disabled = true;
				refuseDataToSave.disabled = true;
				//Get AJAX object
				var XHR = getXmlHttp();
				XHR.onreadystatechange = function(){
					if((this.readyState == 4) && (this.status == 200)){
						var data = JSON.parse(this.responseText);
						var infoP = document.getElementsByClassName("wrapper__profile__smokeBlock__child-info")[0];
						var paragraphs = infoP.getElementsByTagName("P");
						var tempElLink;
						var t1=null,t2=null;
						t1 = window.setTimeout(function showText(){
							//Hide loader processing...
							loader.style.display = "none";
							switch(data.code){
								case 0 : tempElLink = paragraphs[0];
									infoP.style.display = "block";
									tempElLink.style.zIndex = "2";
									t2 = window.setTimeout(function(){
										hideText();
										if(t1){
											window.clearTimeout(t1);
											t1 = null;
										}
									},3000);
								break;
								case 2 : tempElLink = paragraphs[1];
									infoP.style.display = "block";
									tempElLink.style.zIndex = "2";
									t2 = window.setTimeout(function(){
										hideText();
										if(t1){
											window.clearTimeout(t1);
											t1 = null;
										}
									},3000);
								break;
							}
							function hideText(){
								//console.log("Success ",data.code);
								if(t2){
									window.clearTimeout(t2);
									t2 = null;
								}
								//Hide Text block
								infoP.style.display = "none";
								//Reset z-index text message
								tempElLink.style.zIndex = "auto";
								//Buttons enabled again
								bt.disabled = false;
								refuseDataToSave.disabled = false;
								//Hide smoke block
								smokeBlock.className = "wrapper__profile__smokeBlock_hide";
							}
						},1500);
					}
				};
				XHR.open('POST','/resave',true);
				XHR.setRequestHeader('Content-Type','application/json; charset=utf-8');
				//Prepare object
				var userData;
				if(typeof(correctLogPassEmail[0]) !== "undefined" && typeof(correctLogPassEmail[1]) !== "undefined" && typeof(correctLogPassEmail[2]) !== "undefined"){
					//Set values from validate functions: login(), password() and email(), If user interact with fields
					userData = {
						"login":correctLogPassEmail[0],
						"password":correctLogPassEmail[1],
						"email":correctLogPassEmail[2]
					};
				}else{
					//Take values by default
					var login = document.forms.resaveUserData.elements.login.value;
					var password = document.forms.resaveUserData.elements.password.value;
					var emailW = document.forms.resaveUserData.elements.emailW.value;
					var emailN = document.forms.resaveUserData.elements.emailN.value;
					var emailField = emailW != "" ? emailW : emailN != "" ? emailN : "";
					userData = {
						"login":login,
						"password":password,
						"email":emailField
					};
				}
				//console.log("Before sending: ",userData.login," ",userData.password," ",userData.email);
				//Object to JSON	
				userData = JSON.stringify(userData);
				//Send object of data
				XHR.send(userData);
			};
		}
		//Clear input element when clicked by it
		function clearInput(id){
			var input = document.getElementById(id);
			input.addEventListener("focus",function(){
				this.value = "";
			},false);
		}
		//Call given function each time when type a character
		function check(ids,checkFunc){
			var input;
			for(var i = 0;i<ids.length;i++){
				input = document.getElementById(ids[i]);
				//Make input clear
				clearInput(ids[i]);
				//checkFunc.apply(input);
				input.addEventListener("keyup",checkFunc,false);
			}
		}
		//Call given function when leave an input element
		function checkWhenLeave(ids,func){
			var element;
			for(var i = 0;i<ids.length;i++){
				element = document.getElementById(ids[i]);
			}
			element.addEventListener("blur",func,false);
		}
		//Functions login,password,email are subscribed on events: onkeyup, onfocus, onblur
		function login(){//Check Login
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("wrapper__profile__content_settings-log")[0];
			if((this.value.length < 3) || !result){//"Wrong!"			
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else if((this.value.length > 7) || !result){//"Wrong!"			
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Login is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[0] = this.value;//Remember correct value of Login input
				return true;
			}
		}
		function password(){//Check Password
			var template = "^[а-яА-Яa-zA-Z0-9_-]*$";
			var reg = new RegExp(template); //
			var result = reg.test(this.value);
			var warn = document.getElementsByClassName("wrapper__profile__content_settings-pass")[0];
			if((this.value.length < 5) || !result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else if((this.value.length > 7) || !result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Password is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[1] = this.value;//Remember correct value of Password input
				return true;
			}
		}
		function email(){
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			//var pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			var reg = new RegExp(pattern);
			var result = reg.test(this.value);
			var warn = this.parentNode;//Get parent Label Element
			if(!result){//5 
				warn.style.backgroundPosition = "200px -24px";
				return false;
			}else{//Email is correct
				warn.style.backgroundPosition = "200px 0px";
				correctLogPassEmail[2] = this.value;//Remember correct value of Email input
				return true;
			}
		}
		
})(); 