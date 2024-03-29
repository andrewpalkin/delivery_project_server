const nodemailer = require('nodemailer');

// transporter initializer to use GMail SMTP protocol
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kudenv.edu@gmail.com',
        pass: 'kudenv.edu1981'
    }
});

const sendEmail = function (data) {
    let link = "http://" + data.host + "/auth/verify?email=" + data.userMail + "&verificationString=" + data.verificationString;
    console.log(link);

    let mailOptions = {
        from: 'kudenv.edu@gmail.com',
        to: data.userMail,
        subject: 'FriendlyShips confirmation email',
        text: 'Easy to keep your account safety',
        html: "Hello, <b> please click on the link to verify your email. </br> <a href=" + link + ">Click here to verify email.</a>"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
