import {
    sequelize,
    logins,
    location,
    clients
} from './../models'

import * as jwt from 'jsonwebtoken';
import q from 'q';
const get = () => {
    let defer = q.defer();
    clients.findAll({
        where: {
        },
        order: [
            ['id', 'ASC']
        ],
    })
        .then(locationData => {

            defer.resolve(locationData);
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
    let data = req.body;
    if (!data.mobile_number) {
        defer.reject({
            status: 403,
            message: "Mobile Number is missing"
        });
        return defer.promise;
    }
    if (!data.email) {
        defer.reject({
            status: 403,
            message: "Email is missing"
        });
        return defer.promise;
    }
    if (data.mobile_number) {
        clients.findOne({
            where: {
                mobile_number: data.mobile_number
            }
        }).then(mobiledata => {
            if (mobiledata) {
                defer.reject({
                    status: 403,
                    message: "Mobile Number  already exists"
                });
                return defer.promise;
            } else {
                if (data.email) {
                    clients.findOne({
                        where: {
                            email: data.email
                        }
                    }).then(emaildata => {
                        if (emaildata) {
                            defer.reject({
                                status: 403,
                                message: "Email  already exists"
                            });
                            return defer.promise;
                        } else {
                            clients.create(data).then(logindata => {
                                if (logindata) {
                                    defer.resolve(logindata)
                                }
                            }).catch(error => {
                                defer.reject({
                                    status: 400,
                                    message: error.message
                                });
                                return defer.promise;
                            });
                        }

                    })
                }
            }
        })
    }
    return defer.promise;
}
const put = (req)=>{
    let defer = q.defer();
    let data = req.body;
    if (!data.id) {
        defer.reject({
            status: 403,
            message: "Id is missing"
        });
        return defer.promise;
    }
    clients.update(data,{where:{
        id:data.id}
    })
        .then(locationData => {
            clients.findOne({
                where:{
                    id:data.id
                }
            }).then(updateddata=>{
                defer.resolve(updateddata);

            }) .catch(error => {
                defer.reject({
                    status: 400,
                    message: error.message
                });
                return defer.promise;
            })
        })
        .catch(error => {
            defer.reject({
                status: 400,
                message: error.message
            });
            return defer.promise;
        })
    return defer.promise;
}
const getClientId = (req)=>{
    let defer = q.defer();
    let data = req.params;
    clients.findOne({
        where: {
            id:data.id
        }
    })
        .then(locationData => {

            defer.resolve(locationData);
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
const Clients = {
    get,
    post,
    put,
    getClientId
};

export {
    Clients
};