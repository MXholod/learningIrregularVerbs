const nodemailer = require('nodemailer');
//userEmail - User's email, password - new User's password	
function sendPassword(userEmail,password){
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		service: 'gmail',
		auth: {
			user: 'irregular81verbs@gmail.com',
			pass: 'Irregular1981Verbs'
		},
		tls: { rejectUnauthorized: false }
	});
	var mailOptions = {
		from: 'irregular81verbs@gmail.com',
		to: userEmail,
		subject: 'Password restore',
		text: 'Your new password is '+password
	};
	var res = transporter.sendMail(mailOptions, function(error, info){
		var resultArray = [];
		if(error){//Something is going wrong 
			resultArray[0] = false;
			resultArray[1] = error;
		}else{//Email was sent
			resultArray[0] = true;
			resultArray[1] = info.response;
		}
		//return resultArray;
	});
	return res;
}
module.exports = sendPassword;