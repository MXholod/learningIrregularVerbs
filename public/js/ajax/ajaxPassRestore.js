//Функция создаёт кроссбраузерный объект XMLHTTP 
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
				//проверяем, поддерживает ли событие onload, то это старый XMLHttpRequest,
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
    if(!xmlhttp && typeof XMLHttpRequest != 'undefined'){
		xmlhttp = new XMLHttpRequest();//IE7, Firefox, Safari etc
    }
    return xmlhttp;
}
let XHR = getXmlHttp();
(function(XHR){
	window.onload = function(){
		var b = document.getElementById("but");
		b.onclick = function(){
			sendAjax();
			this.disabled = true;
		};
	};
	function sendAjax(){
		var e = document.getElementById("email");
		var t = document.getElementById("text");
		var process = document.getElementById("process");
		
			XHR.onreadystatechange = ()=>{
					if((XHR.readyState == 4) && (XHR.status == 200)){
							var result = JSON.parse(XHR.responseText);
							document.getElementById("ajaxTest").innerHTML = result.email+"\r\n "+result.text;
						
						//Hide animation
						process.style.display = "none";
						//Show submit button again
						var b = document.getElementById("but");
						b.disabled = false;
					}else{
						//Если код ответа сервера не 200, то это ошибка, обработать ошибку.
						console.log(XHR.status + ': ' + XHR.statusText ); // пример вывода: 404: Not Found
						process.style.display = "block"; 
					}
			}
			//XHR.timeout = 4000;
			//XHR.ontimeout = function() {
				//Hide shadow block after long request	
				//console.log( 'Извините, запрос превысил максимальное время' );
			//}
			//XHR.onerror = function() {
			//	console.log( 'Извините,error' );
			//}
				XHR.open("POST", "/", true);
				XHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				var data = JSON.stringify({'email':e.value,'text':t.value});	
				XHR.send(data);
	}
})(XHR);