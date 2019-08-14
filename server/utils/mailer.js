var nodemailer = require('nodemailer');

// transporter initialiser to use Gmail smpt protocol
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kudenv.edu@gmail.com',
    pass: 'kudenv.edu1981'
  }
});

var sendEmail = function(data) {     
    var link="http://"+data.host+"/auth/verify/"+data.verification;    
    var mailOptions = {
        from: 'kudenv.edu@gmail.com',
        to: data.userMail,
        subject: 'FrendlyShips confirmation email',
        text: 'Easy to keep your account safety',
        html: "Hellow, <b> Please Click on the link to veryfy your email </br> <a href="+ link +">Click here to verify</a>"
      };   
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = sendEmail;
