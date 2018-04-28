/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);