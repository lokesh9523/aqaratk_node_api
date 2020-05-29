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
            message: "Username Or Email is missing"
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

const Login = {
    get,
    post
};

export {
    Login
};