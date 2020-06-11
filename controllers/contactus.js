import {
    sequelize, contact_us
} from './../models'

import * as jwt from 'jsonwebtoken';
import q from 'q';
const get = () => {
    let defer = q.defer();
    contact_us.findAll({

    })
        .then(contactusdata => {

            defer.resolve(contactusdata);
        })
        .catch(error => {
            defer.reject({
                status: 400,
                message: error.message
            });
            return defer.promise;
        });
    return defer.promise;
}

const post = (req) => {
    let defer = q.defer();
    const nodemailer = require('nodemailer');
    let data = req.body;
    if (!data.email) {
        defer.reject({
            status: 403,
            message: "Please Enter the email"
        });
        return defer.promise;
    }
    if (!data.subject) {
        defer.reject({
            status: 403,
            message: "Please Enter the subject"
        });
        return defer.promise;
    }
    contact_us.create(data).then(contactusdata => {
        if (contactusdata) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "lokeshbabu.gp21@gmail.com",
                    pass: "9963049529@"// mailtrap.io password
                }
            });

            var textBody = `FROM: ${data.first_name} EMAIL: ${data.email} MESSAGE: ${data.subject}`;
            var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${data.first_name}</p><p> <a href="mailto:${data.email}">${data.email}</a></p><p>${data.subject}</p>`;
            var mail = {
                from: data.email, // sender address
                to: "lokeshbabu.gp21@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
                subject: data.first_name +"Mail From Contact Form", // Subject line
                text: textBody,
                html: htmlBody
            };

            // send mail with defined transport object
            transporter.sendMail(mail, function (err, info) {
                if (err) {
                    console.log(err);
                    response.json({ message: "message not sent: an error occured; check the server's console log" });
                }
                else {
                    response.json({ message: `message sent: ${info.messageId}` });
                }
            });
            defer.resolve(contactusdata)
        }
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });

    return defer.promise;
}
const Contactus = {
    get,
    post
};

export {
    Contactus
};