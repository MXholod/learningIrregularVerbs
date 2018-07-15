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
		case "h" : result = date.getHours();
			break;
		case "m" : result = date.getMinutes();
			break;
		case "s" : result = date.getSeconds();
			break;
		default  : result = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
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