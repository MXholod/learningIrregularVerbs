(function(){
			var blocking = false;//For cancel event if this event in progress 
			var direction = false;
			window.onload = function(){
				var panel = document.querySelector(".settings__base");//Handled element 
				var cssTop = window.getComputedStyle(panel,null).getPropertyValue("top");
				var cssHeight = window.getComputedStyle(panel,null).getPropertyValue("height");
				var top = parseInt(cssTop);//Without px -40
				var height = parseInt(cssHeight);//Height panel without px
				var settings = {
					top:top,
					height:height,//panel height (look up in css file )
					stopPoint:[40,-40],//down stop point, top stop point
					reverse:[false,true]//false - down, true - up
				};
				var bt = document.getElementById("settings");//Button test
				bt.addEventListener('click',function(){
					if(!blocking){
						blocking = true;
						start(panel,settings);
					}
					return false;//Cancel event
				},false);
			};
			function start(el,obj){//Choose movement direction
				if(!direction){ //\!false - true, !true - false
					goDown(el,obj);
				}
				else{
					goUp(el,obj);
				}
			}
			function goDown(el,obj){
				var req;
				loop();
					function loop(){
						if(!obj.reverse[0]){//go down
							if(obj.top >= obj.stopPoint[0]){
								window.cancelAnimationFrame(req);
								direction = true;
								blocking = false;//Remove cancel event
							}else{
								obj.top++;
								el.style.top = obj.top+"px";
								req = window.requestAnimationFrame(loop);
							}
						}
					}	
			}			
			function goUp(el,obj){
				var req;
				loop();
					function loop(){
						if(obj.reverse[1]){
							if(obj.top <= obj.stopPoint[1]){
								window.cancelAnimationFrame(req);
								direction = false;
								blocking = false;
							}else{
								obj.top--;
								el.style.top = obj.top+"px";
								req = window.requestAnimationFrame(loop);
							}
						}
					}
			}
})();