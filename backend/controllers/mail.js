const nodemailer = require('nodemailer');

const {sql, tables } = require('../database');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.MAILER_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_UID,
        pass: process.env.MAILER_PASS
    }
})

const mailControllers = {};

mailControllers.sendMail = async (req, res) => {
    mail = req.body.mail;
    var query = await sql`
        select 
        mail 
        from users 
        where mail = ${mail}
    `;
    if(!query.length) {
        res.status(300).send('The email is not registered');
    } else {
        var mailOptions = {
            from: process.env.MAILER_UID,
            to: mail,
            subject: 'Dribbble',
            html: `<p>Hello User!!!</p><p>Thank you for choosing dribbble</p>`
        }
        transporter.sendMail(mailOptions, (error, info)=> {
            if (error) {
                console.log(error);
                res.status(300).send();
              } else {
                res.status(200).send();
              }
        })
    }
}

module.exports = mailControllers;