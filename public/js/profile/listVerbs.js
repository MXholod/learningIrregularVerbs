(()=>{
	window.addEventListener("load",()=>{
		//Go to full list
		fullVButton();
		//Go to portion list
		portionVbutton();
			//Values trifle buttons
			showAmountInTrifleButtons();
			//Display information about hundreds 
			displayInfoHundreds();
			createPages();
			
			
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
			}
		}else{
			//this.disabled = "disabled";
		}
	});
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
	//Button plus hundred +100
	buttonClick("minesHun",function(){
		//If current value is less than minimum limit, set values by minimum default  
		if(settings.hundred.currentMines <= settings.hundred.limitMines){
			//settings.hundred.currentMines = settings.hundred.defaultMines;
			settings.hundred.currentPlus = settings.hundred.defaultPlus;
			//setHundreds(settings.hundred.defaultMines,settings.hundred.currentPlus);
		}else{
			settings.hundred.currentMines -= settings.hundred.step;
			settings.hundred.currentPlus -= settings.hundred.step;
			findPageHundred();
		}
		//drawMines = settings.hundred.currentMines == 0 ? 1 : settings.hundred.currentMines;
		//
		//showHundreds(settings.hundred.currentMines,settings.hundred.currentPlus);
		
	});
	buttonClick("plusHun",function(){
		//If current value is more than maximum limit, set values by maximum default  
		if(settings.hundred.currentPlus >= settings.hundred.limitPlus){
			settings.hundred.currentPlus = settings.hundred.currentPlus;
			settings.hundred.currentMines = settings.hundred.currentMines;
		}else{
			settings.hundred.currentPlus += settings.hundred.step;
			settings.hundred.currentMines += settings.hundred.step;
			findPageHundred();
		}
		//showHundreds(settings.hundred.currentMines,settings.hundred.currentPlus);
	});
			
			
			//findPageHundred(settings.hundred.defaultPlus);
	},false);
	//
	let fullVButton = ()=>{
		let toFullListVerbs = document.getElementById("toFullListVerbs");
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
			//console.log("to Full List Verbs");
		},false);
	};
	let portionVbutton = ()=>{
		let toPortionListVerbs = document.getElementById("toPortionListVerbs");
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
			//console.log("to Portion List Verbs");
		},false);
	};
	//User's settings are: 
	//1.settings.listLimitOnPage and 2.Array of data.
	var dataArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120,121,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205];//18  //new Array(18);//
	var settings = {
		"hundred":{
			"step":100,
			"defaultMines":1,"defaultPlus":100,
			"currentMines":1,"currentPlus":100,
			"limitMines":1,"limitPlus":0
		},
		"setLimitPlus" : function(){
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
		"setAmountOfPages":function(){
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
		"_mutualAmountRows":0,
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
	function createPages(){
		var pages = document.getElementById("pages");
			//settings.mutualAmountRows//18
			//settings.listLimitOnPage;//5
			//settings.amountOfPages//4
		//Create and add child element to parent element	
		function addNewChildToParent(parent,elName,text){
			//Create column
			var rowItem = document.createElement(elName);
				//Create text for column
				var txt = document.createTextNode(text);
				//Add text to the column
				rowItem.appendChild(txt);
			//Add column to the parent row
			parent.appendChild(rowItem);
			//console.log(dataArr[j]);
		}
		for(var i = 1; i <= settings.amountOfPages;i++){
			//Create page panel block
			var panelPage = document.createElement("DIV");
			panelPage.setAttribute("class","wrapper__list-verbs__all-verbs__portion-list__page");//'.panel-page'
			if(i == 1){
				panelPage.setAttribute("style","z-index:"+1);
				panelPage.setAttribute("data-current","current");
			}
			//Create limit for inner loop for each time
			var limit = settings.listLimitOnPage * i;//5,10,15
			//Inner loop, create row each time
			for(var j = (limit - settings.listLimitOnPage);j < limit;j++){
				if(j >= settings.mutualAmountRows){
					break;
				}

				var pRow = document.createElement("DIV");
				pRow.setAttribute("class","wrapper__list-verbs__all-verbs__portion-list__page__row");
					for(var columns = 0;columns < 5;columns++){
						//Create 5 columns
						addNewChildToParent(pRow,"DIV",j);
					}
				//Add row to the parent panel-page
				panelPage.appendChild(pRow);
			}
			//console.log(" ----- ");
			pages.appendChild(panelPage);
		}
	} 
	//Set array of data to the settings
	settings.mutualAmountRows = dataArr;
	function showAmountInTrifleButtons(){
		var minesTrifle = document.getElementById("minesTrifle");
		var plusTrifle = document.getElementById("plusTrifle");
		minesTrifle.innerHTML = "-"+settings.listLimitOnPage;
		plusTrifle.innerHTML = "+"+settings.listLimitOnPage;
	}

	/*Control buttons*/
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
	//Subscribe on event for button
	function buttonClick(id,func){
		var bt = document.getElementById(id);
		bt.addEventListener("click",func,false);
	}
	
	//Show hundreds in HTML
	/*function showHundreds(hun1=1,hun2=100){
		var showHun = document.getElementById("showHun");
		showHun.children[0].innerHTML = hun1;
		showHun.children[1].innerHTML = hun2;
		//console.log(settings.hundred.currentMines,settings.hundred.currentPlus);
	}*/
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
				
				var amount = 1;//
				//
				var pages = document.querySelectorAll(".wrapper__list-verbs__all-verbs__portion-list__page");//Return an Array '.panel-page'
				//
				for(var i = 0;i < pages.length;i++){
					//
					if(amount >= settings.hundred.currentMines){//101,201,...
						//Rewrite link current element 
						settings.elements.current = pages[i];
						//Restore attributes for current element
						pages[i].setAttribute("style",styleAttr);
						pages[i].setAttribute("data-current",dataAttr);
						//console.log(pages[i]," amount ",amount);
						break;
					}else{
						for(var j = 0;j < settings.listLimitOnPage;j++){//10,20,30,...
							//console.log("Res amount ",amount);
							amount++;
						}
					}
				}
			}
		}
	}
})();