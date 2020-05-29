import {
    sequelize,
    logins,
    location
} from './../models'

import * as jwt from 'jsonwebtoken';
import q from 'q';
const get = () => {
    let defer = q.defer();
    location.findAll({
        where: {
            status: 1
        },
        order: [
            ['display_name', 'ASC']
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


const Location = {
    get
};

export {
    Location
};