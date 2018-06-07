//Panel slide up and down
(function(){
			var blocking = false;//For cancel event if this event in progress 
			var direction = false;
			window.onload = function(){
				var panel = document.querySelector(".settings__base__slidePanel");//Handled element 
				var cssTop = window.getComputedStyle(panel,null).getPropertyValue("top");
				var cssHeight = window.getComputedStyle(panel,null).getPropertyValue("height");
				var top = parseInt(cssTop);//Without px -40
				var height = parseInt(cssHeight);//Height panel without px
				var settings = {
					top:top,
					height:height,//panel height (look up in css file )
					stopPoint:[40,-110],//stop point from the top, stop point from the top
					reverse:[false,true]//false - down, true - up
				};
				var bt = document.getElementById("basePanelText");//Button test
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
//Music control
(function(){
	window.addEventListener('load',function(){
		//Detect radio buttons changing
		function changeMusicState(id,func){
			var radio = document.getElementById(id);
			//Gets audio element
			var parentAU = document.getElementById("bgMusic");
			var audio = parentAU.getElementsByTagName("audio")[0];
			radio.onchange = function(e){
				func.call(this,audio,event);
			};
		}
		function turnOnTheMusic(id,func){
			changeMusicState(id,func);
		}
		function turnOffTheMusic(id,func){
			changeMusicState(id,func);
		}
		//Turn on the music
		turnOnTheMusic("onMusic",function(au,event){
			//console.log("Turned on ",event.target);
			au.play();
		});
		//Turn off the music
		turnOffTheMusic("offMusic",function(au){
			//console.log("Turned off ",this,au);
			au.pause();
			au.currentTime = 0.0;
		});
		
	});
})();