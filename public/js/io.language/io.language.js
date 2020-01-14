	(function(){
		//1. Check ID elements in DOM if find then add to an array
		function compareIdsInHtml(idsArray,attrName){
			if(!(Array.isArray(idsArray)) || (idsArray.length == 0)){return false;}
			var idsArrayLength = idsArray.length; 
			var existedIds = [];
			for(var i = 0;i < idsArrayLength;i++){
				if(document.getElementById(idsArray[i])){//Does exist id?
					var id = document.getElementById(idsArray[i]);
					var dataValue = id.getAttribute(attrName);
					if(dataValue === idsArray[i]){
						existedIds.push(idsArray[i]);
					}else{
						//console.log("There is not ID");
					}
				}else{
					//console.log("ID does not exist");
				}
			}
			return existedIds;
		}
		//2. Parse HTML according to given IDs
		function parseHtmlByIdAndAttr(idArr,dataSet){
			if(!(Array.isArray(idArr)) || (idArr.length == 0)){return false;}
			let completedObject = {};
			let parentEl, parentElChildrenLength;
				if(Array.isArray(idArr)){
					var idsArrLength = idArr.length;//1;
					for(var i = 0;i < idsArrLength;i++){
						parentEl = document.getElementById(idArr[i]);//Get element By ID
						parentElChildrenLength = parentEl.children.length;
						//Create temporary array
						var tempArray = [];
						for(let j = 0;j < parentElChildrenLength;j++){//Level 1, children of ID element
							if(parentEl.children[j].getAttribute(dataSet) === idArr[i]){//Level 1
								tempArray.push(parentEl.children[j]);//Add element to array
								if(parentEl.children[j].children.length > 0){//Level 2
									recursion(parentEl.children[j],idArr[i]);//Recursion
								}
								else{
									//console.log("There are not children here");
								}
							}else{//1 Has not attribute data-
								if(parentEl.children[j].children.length > 0){//Level 2
									recursion(parentEl.children[j],idArr[i]);//Recursion
								}
								else{
									//console.log("There are not children here");
								}
							}
						}
						//Create dynamic object property with value - an array 
						completedObject[idArr[i]] = tempArray;
					}
				}else{
					/*parentEl = document.getElementById(idArr);//DIV id=test
					if(parentEl && (parentEl.children.length > 0)){
						completedObject[idArr] = [];//;
					}else{
							console.log(idArr," ID does not exist!");
					}*/
					return false;//It is not an array
				}
					function recursion(parent,dataSetVal){
						if(parent.children.length > 0){
							for(let a = 0;a < parent.children.length;a++){
								if(parent.children[a].getAttribute(dataSet) === dataSetVal){
									tempArray.push(parent.children[a]);//Add element to array
									//console.log(parent.children[i]);
									if(parent.children[a].children.length > 0){//Level 2
										recursion(parent.children[a],dataSetVal);//Recursion
									}else{
										//console.log("There are not children here");
									}
								}else{
									if(parent.children[a].children.length > 0){//Level 2
										recursion(parent.children[a],dataSetVal);//Recursion
									}else{
										//console.log("There are not children here");
									}
								}
							}
						}else{
							return false;
						}
					}
			return completedObject;
		}
		//3. This is an array of IDs we try to find on client side
		var arrayIDs = new Array("basePanelText","basePanel","auth","authRestore","profileMenu","profileLeftColumn","profileUserData","profileUserVerbList","profileSmokeBlock","bothListHeaders","fullListTableHeader","portionListTableHeader","verbsList","verbsListPortion","exerciseItems","infoPanelPage","infoPanelTimer","resultTable","resultTableButton","pageInfo1","listC1","pageInfo2","listC2","pageInfo3","listC3","displayIfZeroFailed","toProfileExercises","toListVerbs","methodDelete1","methodDelete2","methodDelete3");
		var parentIDs;
		//5. Insert data from language file to HTML elements 
		function insertDataToHTML(objectHtmlElements,objectStringsData){
			if(Object.keys(objectHtmlElements).length !== Object.keys(objectStringsData).length){return false;}
			for(var prop1 in objectHtmlElements){
				for(var prop2 in objectStringsData){
					if(prop1 === prop2){
						if(Array.isArray(objectHtmlElements[prop1]) && Array.isArray(objectStringsData[prop2])){
							var i = 0;
							var len1 = objectHtmlElements[prop1].length,len2 = objectStringsData[prop2].length;
							if(len1 == len2){//If array1 == array2
								while(i < len1){
									if(objectHtmlElements[prop1][i].tagName == "INPUT"){
										objectHtmlElements[prop1][i].value = objectStringsData[prop2][i];
									}
									else if(objectHtmlElements[prop1][i].tagName == "LABEL"){
										objectHtmlElements[prop1][i].firstChild.nodeValue = objectStringsData[prop2][i];
									}
									else{
										objectHtmlElements[prop1][i].firstChild.nodeValue = objectStringsData[prop2][i];
									}
									i++;
								}
							}
							
						}
					}
				}
			}
		}
	//Launch Socket
	window.socket = io.connect('http://localhost:3000');	
		window.socket.on('getLanguage', function(data){
						//console.log(data);//d
				//1. Get DOM elements to insert data from parsed object
				var domElements = parseHtmlByIdAndAttr(parentIDs,"data-language");
				//2. Insert data from parsed file to HTML elements
				insertDataToHTML(domElements,data.language);
				//console.log("----------------");
				//console.log(domElements);
				//console.log(data.language);
			});
		window.addEventListener('load',function(){
			//4. Get IDs from DOM if they exist
			parentIDs = compareIdsInHtml(arrayIDs,"data-language");
				getTypeLanguage("rus",function(event){
					//Save data to SessionStorage
					saveDataToSessionStorage(this,"language");//this - input radio
					//console.log("RUS",this);
					socketData(this.value);//rus - input.value radio
				});
				getTypeLanguage("ukr",function(event){
					//Save data to SessionStorage
					saveDataToSessionStorage(this,"language");//this - input radio
					//console.log("UKR",event.target);
					socketData(event.target.value);//ukr - event.target this is a input radio
				});
		},false);
			//Set onchange Event for Radio buttons
			function getTypeLanguage(id,func){
				var radio = document.getElementById(id);
				radio.onchange = function(e){
					func.call(this,e);
				};
			}
			//Working with Socket.IO on Client Side
			function socketData(d){//console.log(parentIDs,"Client");
				if(d == "rus"){
					//console.log(d);
					window.socket.emit('setLanguage', { language: "ru", ind:0, ids:parentIDs});
				}
				if(d == "ukr"){
					//console.log(d);
					window.socket.emit('setLanguage', { language: "ua",ind:1, ids:parentIDs});
				}
			}
	})();