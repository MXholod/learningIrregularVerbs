(function(){
	window.addEventListener("load",function(){
		clearAndSetClassMenu();
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
})();