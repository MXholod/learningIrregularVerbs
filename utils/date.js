let date = new Date();

const monthsRu = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
const monthsUa = ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня","Серпня","Вересня","Жовтня","Листопада","Грудня"];

function createDate(language="ru",divider){// 
	let fullDate;
	if(divider){
		if(language === "ru"){
			fullDate = `${date.getDate()}${divider}${monthsRu[date.getMonth()]}${divider}${date.getFullYear()}`;
		}
		if(language === "ua"){
			fullDate = `${date.getDate()}${divider}${monthsUa[date.getMonth()]}${divider}${date.getFullYear()}`;
		}
	}else{
		if(language === "ru"){
			fullDate = `${date.getDate()}${monthsRu[date.getMonth()]}${date.getFullYear()}`;
		}
		if(language === "ua"){
			fullDate = `${date.getDate()}${monthsUa[date.getMonth()]}${date.getFullYear()}`;
		}
	}
	return fullDate;
}
function createTime(divider){// 
	if(divider){
		return `${date.getHours()}${divider}${date.getMinutes()}${divider}${date.getSeconds()}`;
	}else{
		return `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
	}
}
function preserveTimeToDb(){
	return date.getTime();//Quantity of milliseconds since 1970 01 01
}
function retrieveTimeFromDb(milisec,format){
	let date = new Date(milisec);
	let result;
	switch(format){
		case "empty" : result = "00/00/0000 00:00:00";
			break;
		case "y" : result = date.getFullYear();
			break;
		case "m" : result = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;;
			break;
		case "d" : result = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
			break;
		case "h" : result = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
			break;
		case "min" : result = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
			break;
		case "s" : result = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
			break;
		default  :  let d = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
					let m = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1;
					let h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
					let min = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
					let s = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
					result =  `${d}/${m}/${date.getFullYear()} ${h}:${min}:${s}`;
	}
	return result;
}
const dateTimeMethods = {
	createDate,
	createTime,
	preserveTimeToDb,
	retrieveTimeFromDb
	
}

module.exports = dateTimeMethods;