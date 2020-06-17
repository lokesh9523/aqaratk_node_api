import {
    sequelize,
    logins
} from './../../models';
import * as jwt from 'jsonwebtoken';
import q from 'q';
var md5 = require('md5');
const get = (data) => {
    let defer = q.defer();
    defer.resolve({
        "message": "done"
    });
    return defer.promise;
}
const post = (data) => {
    let defer = q.defer();
    if (!data.user_name) {
        defer.reject({
            status: 403,
            message: "Username is missing"
        });
        return defer.promise;
    }
    if (!data.password) {
        defer.reject({
            status: 403,
            message: "Password is missing"
        });
        return defer.promise;
    }
    let md5Password = md5(data.password);

    logins.findOne({
        where: {
            password: md5Password,
            $or: [
                {
                    user_name:
                    {
                        $eq: data.user_name
                    }
                },
                {
                    email:
                    {
                        $eq: data.user_name
                    }
                },
            ]
        },
    })
        .then(logindata => {
            if (logindata) {
                let token = jwt.sign({ data: logindata }, 'aqaratk');
                logindata.dataValues.token = token;
                // console.log(logindata);
                defer.resolve(logindata)
            } else {
                defer.reject({
                    status: 400,
                    message: "Username or Password incorrect"
                });
                return defer.promise;
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
const forgotpassword = (req)=>{
    let defer = q.defer();
    const nodemailer = require('nodemailer');
    let data = req.body;
    if (!data.email) {
        defer.reject({
            status: 403,
            message: " Email is missing"
        });
        return defer.promise;
    }
    var otpnumber = Math.floor(1000 + Math.random() * 9000);

    logins.findOne({
        where: {
            email: data.email,
        },
    })
        .then(logindata => {
            if (logindata) {
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
                var htmlBody = `<h2>Forgot Password For Your Account In Aqaratk</h2><p>Hii ${logindata.name},</p><p>${otpnumber} is the password for your account Please Login with your new password</p>`;
                var mail = {
                    from: "lokeshbabu.gp21@gmail.com", // sender address
                    to: data.email, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
                    subject: "Forgot Password For Your Account In Aqaratk", // Subject line
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
                        var password = md5(otpnumber);
                        console.log(password)
                        logins.update({password},{where:{
                            email:data.email
                        }
                    }) .then(logindataa => {
                        defer.resolve({"data":"Sucess"})
                    }).catch(error => {
                        defer.reject({
                            status: 400,
                            message: error.message
                        });
                        return defer.promise;
                    });
                    }
                });
            } else {
                defer.reject({
                    status: 400,
                    message: "Email is not registered"
                });
                return defer.promise;
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
const Login = {
    get,
    post,
    forgotpassword
};

export {
    Login
};