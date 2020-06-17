import {
    sequelize,
    logins,
    location,
    municipalitis
} from './../models'

import * as jwt from 'jsonwebtoken';
import q from 'q';
const get = () => {
    let defer = q.defer();
    municipalitis.findAll({
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

const getLocation = (req) => {
    let defer = q.defer();
    let data = req.params
    location.findAll({
        where:{
            municipality_id:data.municipality_id,
            status:1
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
const Municipality = {
    get,
    getLocation
};

export {
    Municipality
};