(()=>{//
	window.addEventListener("load",()=>{
		//Go to full list (switch between lists)
		fullVButton();
		//Go to portion list (switch between lists)
		portionVbutton();
		//Socket data, get Array of objects 
		socketData();
			//Values trifle buttons
			//showAmountInTrifleButtons();
			//Display information about hundreds 
			//displayInfoHundreds();
			//createPages();
			
			//AJAX for getting List of Verbs	
			//getVerbsList();
			//Button mines One panel to the left <---
		
		buttonClick("minesTrifle",function(){
			//console.log(this);
			var elements = findCurrent();
			var prev = getLeftRightPanel(false);
			if(prev !== null){
				var dataAttr,styleAttr;
				if(elements.current.hasAttribute("style") && elements.current.hasAttribute("data-current")){
					//Save style attr
					styleAttr = elements.current.getAttribute("style");
					//Remove style attr
					elements.current.removeAttribute("style");
					//Save data-attr
					dataAttr = elements.current.getAttribute("data-current");
					//Remove data-attr
					elements.current.removeAttribute("data-current");
						//Save current element link to prev object property
							//settings.elements.prev = elements.current;//settings.elements.prev = settings.elements.current
						//Save prev element link to current object property
						settings.elements.current = prev;
						//Set attributes to an element
						settings.elements.current.setAttribute("style",styleAttr);
						settings.elements.current.setAttribute("data-current",dataAttr);
					//Plus 10 each time by click to hundred.trifleLimit 0+=10
					settings.hundred.trifleLimit+= settings.listLimitOnPage;
					//100 == 100
					if(settings.hundred.trifleLimit == settings.hundred.step){
						//If we have hundred, subtract it from the current amount 201 - 100
						var tempAmount = settings.hundred.currentMines - settings.hundred.trifleLimit;
						//If 101 >= 1, 1 >= 1
						if((tempAmount) >= settings.hundred.limitMines){
							//Behaviour like click hundred button
							settings.hundred.currentPlus-=settings.hundred.trifleLimit;
							settings.hundred.currentMines-=settings.hundred.trifleLimit;
						}
						//Reset Trifle by default
						settings.hundred.trifleLimit = 0;
					}
				}
			}else{
				//this.disabled = "disabled";
			}
		});
		//Button plus One panel to the right --->
		buttonClick("plusTrifle",function(){
			//
			var elements = findCurrent();
			var next = getLeftRightPanel(true);
			if(next !== null){
				var dataAttr,styleAttr;
				if(elements.current.hasAttribute("style") && elements.current.hasAttribute("data-current")){
					//Save style attr
					styleAttr = elements.current.getAttribute("style");
					//Remove style attr
					elements.current.removeAttribute("style");
					//Save data-attr
					dataAttr = elements.current.getAttribute("data-current");
					//Remove data-attr
					elements.current.removeAttribute("data-current");
						//Save current element link to prev object property
							//settings.elements.prev = elements.current;
						//Save next element link to current object property
						settings.elements.current = next;
						//Set attributes to an element
						settings.elements.current.setAttribute("style",styleAttr);
						settings.elements.current.setAttribute("data-current",dataAttr);
					//Plus 10 each time by click to hundred.trifleLimit 0+=10
					settings.hundred.trifleLimit+= settings.listLimitOnPage;	
					//100 == 100
					if(settings.hundred.trifleLimit == settings.hundred.step){
						//If we have hundred, add it to the current amount 
						var tempAmount = settings.hundred.currentPlus + settings.hundred.trifleLimit;
						//If 100 < 300, 200 < 300
						if((tempAmount) < settings.hundred.limitPlus){
							//Behaviour like click hundred button
							settings.hundred.currentPlus+=settings.hundred.trifleLimit;
							settings.hundred.currentMines+=settings.hundred.trifleLimit;
						}
						//Reset Trifle by default
						settings.hundred.trifleLimit = 0;
					}
				}
			}else{
				//this.disabled = "disabled";
			}
		});
		//Button plus hundred +100
		buttonClick("minesHun",function(){
			//If current value is less than minimum limit, set values by minimum default  
			if(settings.hundred.currentMines <= settings.hundred.limitMines){
				//settings.hundred.currentMines = settings.hundred.defaultMines;
				settings.hundred.currentPlus = settings.hundred.defaultPlus;
				//setHundreds(settings.hundred.defaultMines,settings.hundred.currentPlus);
			}else{
				//Reset Trifle by default
				settings.hundred.trifleLimit = 0;
				settings.hundred.currentMines -= settings.hundred.step;
				settings.hundred.currentPlus -= settings.hundred.step;
				findPageHundred();
			}
		});
		buttonClick("plusHun",function(){
			//If current value is more than maximum limit, set values by maximum default  
			if(settings.hundred.currentPlus >= settings.hundred.limitPlus){
				settings.hundred.currentPlus = settings.hundred.currentPlus; //200 = 200
				settings.hundred.currentMines = settings.hundred.currentMines;//100 = 100
			}else{
				//Reset Trifle by default
				settings.hundred.trifleLimit = 0;
				settings.hundred.currentPlus += settings.hundred.step;
				settings.hundred.currentMines += settings.hundred.step;
				findPageHundred();
			}
		});
		
	},false);
	//Subscribe on event for button
		function buttonClick(id,func){
			var bt = document.getElementById(id);
			bt.addEventListener("click",func,false);
		}
		//Display buttons hundred
		function displayInfoHundreds(){
			var hundredsBlock = document.getElementById("hundreds");
			if(settings.mutualAmountRows < 100){
				hundredsBlock.style.display = "none";
			}else{
				//Display hundreds range 
				//showHundreds(settings.hundred.defaultMines,settings.hundred.defaultPlus);
				hundredsBlock.style.display = "block";
			}
		}
		//Find panel with dataset attribute 'current' and two other panels (previous and next) and set their values to the object
		function findCurrent(){
			var panels = document.querySelectorAll(".wrapper__list-verbs__all-verbs__portion-list__page");//'.panel-page'
			for(var i = 0;i < panels.length;i++){
				if(panels[i].getAttribute("data-current") == "current"){
					settings.elements.current = panels[i];//panels[0],panels[1],panels[2]
					if(panels[(i-1)]){
						settings.elements.prev = panels[(i-1)];
					}
					if(panels[(i+1)]){
						settings.elements.post = panels[(i+1)];
					}
				}
			}
			//Return object
			return settings.elements;
		}
		//Get left or right panel (element's link) by given 'direction', returns null if element doesn't exist
		function getLeftRightPanel(direction){
			var element;
			//Take current element from object
			var currentElement = settings.elements.current;
			if(direction){//true - go to the right
				if(currentElement.nextSibling !== null && currentElement.nextSibling.nodeType == 1){
					element = currentElement.nextSibling;
				}else if(currentElement.nextSibling !== null){
					element = currentElement.nextSibling.nextSibling;
				}else{
					element = null;
				}
			}else{//false - go to the left
				if(currentElement.previousSibling !== null && currentElement.previousSibling.nodeType == 1){
					element = currentElement.previousSibling;
				}else if(currentElement.previousSibling !== null){
					element = currentElement.previousSibling.previousSibling;
				}else{
					element = null;
				}
			}
			return element;
		}
		//Find page according to hundred value
		function findPageHundred(){
			//Find current page
			findCurrent();
			//Get the current element by class, remove it attributes
			if(settings.elements.current !== null){
				var dataAttr,styleAttr;
				if(settings.elements.current.hasAttribute("style") && settings.elements.current.hasAttribute("data-current")){
					//Save style attr
					styleAttr = settings.elements.current.getAttribute("style");
					//Remove style attr
					settings.elements.current.removeAttribute("style");
					//Save data-attr
					dataAttr = settings.elements.current.getAttribute("data-current");
					//Remove data-attr
					settings.elements.current.removeAttribute("data-current");
					//101 % 10 = 10.1, parseInt(10.1) = 10, 10 is a Index of Page
					if((settings.hundred.currentMines % settings.listLimitOnPage) != 0){
						var pageIndex = parseInt(settings.hundred.currentMines / settings.listLimitOnPage);
						//Get all pages Array
						var pages = document.querySelectorAll(".wrapper__list-verbs__all-verbs__portion-list__page");
						//Rewrite link current element 
						settings.elements.current = pages[pageIndex];
						//Restore attributes for current element
						pages[pageIndex].setAttribute("style",styleAttr);
						pages[pageIndex].setAttribute("data-current",dataAttr);
					}
				}
			}
		}
	//Switch to full list of verbs
	let fullVButton = ()=>{
		let toFullListVerbs = document.getElementById("toFullListVerbs");
		//Hide 'Portion panel' when we don't see it
		let portionPanel = document.querySelector(".wrapper__list-verbs__all-verbs__portion-list");
		toFullListVerbs.addEventListener("click",()=>{
			let fullList = document.querySelector(".wrapper__list-verbs__all-verbs__full-list");
			if(fullList.classList.contains("wrapper__list-verbs__all-verbs__full-list-negative")){
				//Remove negative
				fullList.classList.remove("wrapper__list-verbs__all-verbs__full-list-negative");
				if(!fullList.classList.contains("wrapper__list-verbs__all-verbs__full-list-positive")){
					//Add positive
					fullList.classList.add("wrapper__list-verbs__all-verbs__full-list-positive");
				}
			}
			//Hide 'Portion panel'
			if(portionPanel.classList.contains("wrapper__list-verbs__all-verbs__portion-list-negative")){
				portionPanel.classList.remove("wrapper__list-verbs__all-verbs__portion-list-negative");
				portionPanel.classList.add("wrapper__list-verbs__all-verbs__portion-list-positive");
			}
			//console.log("to Full List Verbs");
		},false);
	};
	//Switch to portion list of verbs
	let portionVbutton = ()=>{
		let toPortionListVerbs = document.getElementById("toPortionListVerbs");
		//Display 'Portion panel' when we see it
		let portionPanel = document.querySelector(".wrapper__list-verbs__all-verbs__portion-list");
		toPortionListVerbs.addEventListener("click",()=>{
			let fullList = document.querySelector(".wrapper__list-verbs__all-verbs__full-list");
			if(!fullList.classList.contains("wrapper__list-verbs__all-verbs__full-list-negative")){
				//Add negative
				fullList.classList.add("wrapper__list-verbs__all-verbs__full-list-negative");
				if(!fullList.classList.contains("wrapper__list-verbs__all-verbs__full-list-positive")){
					//Remove positive
					fullList.classList.remove("wrapper__list-verbs__all-verbs__full-list-positive");
				}
			}
			//Show 'Portion panel'
			if(portionPanel.classList.contains("wrapper__list-verbs__all-verbs__portion-list-positive")){
				portionPanel.classList.remove("wrapper__list-verbs__all-verbs__portion-list-positive");
				portionPanel.classList.add("wrapper__list-verbs__all-verbs__portion-list-negative");
			}
			//console.log("to Portion List Verbs");
		},false);
	};
	
	//AJAX Request
	//Function creates cross-browser object XMLHttpRequest 
	/*function getXmlHttp(){
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
	function getVerbsList(){
		var XHR = getXmlHttp();
		XHR.onreadystatechange = function(){
			if((this.readyState == 4) && (this.status == 200)){
				var data = JSON.parse(this.responseText);
			
				var arrayData = data.verbs;
				arrayData.forEach((val,ind,arr)=>{
					console.log(val.join());
				});
			}
		};
		XHR.open('POST','/getListVerbs',true);
		XHR.setRequestHeader('Content-Type','application/json; charset=utf-8');
		//Send object of data
		var userData = JSON.stringify({});//Empty object
		XHR.send(userData);
		console.log("AJAX");
	}*/
	
	//User's settings are: 
	//1.settings.listLimitOnPage and 2.Array of data.
	/*
	var dataArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120,121,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205];//18  //new Array(18);//
	*/
	//Launch Socket
	var socket = io.connect('http://localhost:3000');	
	socket.on('getVerbsList', function(data){
		//console.log(data.verbs," ",Array.isArray(data.verbs));
		//Set array of data to the settings
		settings.mutualAmountRows = data.verbs;
		settings.dataArray = data.verbs;
		
			//Set array of data to the settings
			//settings.mutualAmountRows = dataArr;
		//Values trifle buttons
			showAmountInTrifleButtons();
			//Display information about hundreds 
			displayInfoHundreds();
			createPages();
	});
	//Working with Socket.IO on Client Side
	function socketData(){
		socket.emit('launchVerbs', {launch: true});//
	}
	//Object with settings
	var settings = {
		"dataArray":null,
		"hundred":{
			"step":100,
			"defaultMines":1,"defaultPlus":100,
			"currentMines":1,"currentPlus":100,
			"limitMines":1,"limitPlus":0,
			"trifleLimit":0
		},
		"setLimitPlus" : function(){
			//Example 205 % 100 == 0 ? 100 / 100 : parseInt(205 / 100)+1;
			var res = (this.mutualAmountRows % this.hundred.step) == 0 ? this.mutualAmountRows / this.hundred.step : parseInt(this.mutualAmountRows / this.hundred.step)+1;
			res = res * this.hundred.step;//3 * 100
			if(res < 100){
				this.hundred.limitPlus = 0;
			}else{
				this.hundred.limitPlus = res;
			}
		},
		"elements":{"prev":null,"current":null,"post":null},
		"listLimitOnPage":10,
		"amountOfPages":0,
		"setAmountOfPages":function(){//Amount of pages
			if(this._mutualAmountRows !== 0){//If rows exists
				if(this._mutualAmountRows < this.listLimitOnPage){
					this.amountOfPages = 1;//Only one page exists
				}else if((this._mutualAmountRows % this.listLimitOnPage) !== 0){//Having a rest
					this.amountOfPages = parseInt(this._mutualAmountRows / this.listLimitOnPage) + 1;//Add one page
				}
				else if((this._mutualAmountRows % this.listLimitOnPage) === 0){//Haven't a rest
					this.amountOfPages = this._mutualAmountRows / this.listLimitOnPage;
				}
			}else{
				this.amountOfPages = 0;
			}
		},
		"_mutualAmountRows":0,//Mutual amount of rows from Array of Objects
		set mutualAmountRows(dataArray){
			if(Array.isArray(dataArray)){
				this._mutualAmountRows = dataArray.length;
				if(this._mutualAmountRows > 0){
					//Set total amount of pages
					this.setAmountOfPages();
					//Set limitPlus property of 'hundred' object 
					this.setLimitPlus();
				}
			}else{
				this._mutualAmountRows = 0;
			}
		},
		get mutualAmountRows(){
			return this._mutualAmountRows;
		}
	};
	//Create pages for portion elements with data from settings.dataArray Array
	function createPages(){
		var pages = document.getElementById("verbsListPortion");
			//settings.mutualAmountRows//18
			//settings.listLimitOnPage;//5
			//settings.amountOfPages//4
		//Create and add child element to parent element	
		function addNewChildToParent(parent,elName,text,attr,attrValue,dataLang){
			//Create column
			var rowItem = document.createElement(elName);
				//Create text for column
				var txt = document.createTextNode(text);
				//Add text to the column
				rowItem.appendChild(txt);
				if(attr){
					rowItem.setAttribute(attr,attrValue);
				}
				if(dataLang){
					rowItem.setAttribute("data-language","verbsListPortion");
				}
			//Add column to the parent row
			parent.appendChild(rowItem);
			//console.log(dataArr[j]);
		}
		for(var i = 1; i <= settings.amountOfPages;i++){
			//Create page panel block
			var panelPage = document.createElement("DIV");
			panelPage.setAttribute("class","wrapper__list-verbs__all-verbs__portion-list__page");//'.panel-page'
			//Set attributes to the first element
			if(i == 1){
				panelPage.setAttribute("style","z-index:"+1);
				panelPage.setAttribute("data-current","current");
			}
			//Create limit for inner loop for each time
			var limit = settings.listLimitOnPage * i;//10,20,30
			//Inner loop, create row each time
			for(var j = (limit - settings.listLimitOnPage);j < limit;j++){//j = (10-10),j = (20-10),j = (30-10)
				if(j >= settings.mutualAmountRows){
					break;
				}
				var pRow = document.createElement("DIV");
				pRow.setAttribute("class","wrapper__list-verbs__all-verbs__portion-list__page__row");
					for(var cells = 0,innArr = 0;cells < 8;cells++){
						//Create 5 cells with text
						if(cells == 0){
							addNewChildToParent(pRow,"SPAN",settings.dataArray[j]._id,"class","portion-list__page__row__ind");
						}
						if(cells > 0 && cells < 4){
							if(innArr > 2){innArr = 0;}
							if(innArr == 1){
								addNewChildToParent(pRow,"SPAN",settings.dataArray[j].eng[innArr],"class","portion-list__page__row__ing portion-list__page__row_middle");
							}else{
							addNewChildToParent(pRow,"SPAN",settings.dataArray[j].eng[innArr],"class","portion-list__page__row__ing");
							}
							innArr++;
						}
						if(cells > 4 && cells < 8){
							if(innArr > 2){innArr = 0;}
							if(innArr == 1){
								addNewChildToParent(pRow,"SPAN",settings.dataArray[j].rus[innArr],"class","portion-list__page__row__translate portion-list__page__row_middle");
							}else{
							addNewChildToParent(pRow,"SPAN",settings.dataArray[j].rus[innArr],"class","portion-list__page__row__translate",true);
							}
							innArr++;
						}
						//addNewChildToParent(pRow,"DIV",j);
					}
				//Add row to the parent panel-page
				panelPage.appendChild(pRow);
			}
			//console.log(" ----- ");
			pages.appendChild(panelPage);
		}
	} 
	
	function showAmountInTrifleButtons(){
		var minesTrifle = document.getElementById("minesTrifle");
		var plusTrifle = document.getElementById("plusTrifle");
		minesTrifle.innerHTML = "-"+settings.listLimitOnPage;
		plusTrifle.innerHTML = "+"+settings.listLimitOnPage;
	}

	/*Control buttons*/
	
	//Show hundreds in HTML
	/*function showHundreds(hun1=1,hun2=100){
		var showHun = document.getElementById("showHun");
		showHun.children[0].innerHTML = hun1;
		showHun.children[1].innerHTML = hun2;
		//console.log(settings.hundred.currentMines,settings.hundred.currentPlus);
	}*/
	
})();