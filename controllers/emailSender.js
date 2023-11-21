const nodemailer = require('nodemailer');

exports.emailSendingFunction = async (emailID, emailSubject, emailMessage) => {
     // Creating a nodemailer transporter
     const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_EMAIL_PASSWORD
        },
    });

    // Creating an email message
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: emailID,
        subject: emailSubject ,
        text : emailMessage
    };

    // Sending the email
    const emailResult = await transporter.sendMail(mailOptions);
    
    return emailResult;
}





