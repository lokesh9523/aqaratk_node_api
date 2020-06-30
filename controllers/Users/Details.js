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
    
    return defer.promise;
}
const getAllUsers = (req)=>{
    let defer = q.defer();
    logins.findAll({}).then(loginsdata=>{

        defer.resolve(loginsdata)
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const getPropertyByUser = (data)=>{
    let defer = q.defer();
    // sequelize.query("select p.*,m.display_name as municipality_name,l.display_name as location_name,pt.display_name as property_name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id left join municipalitis m on p.municipality_id = m.id where  " + query + "  order by p.id desc ", {
        sequelize.query("select p.*,m.display_name as municipality_name,l.display_name as location_name,pt.display_name as property_name,lo.role,lo.adjective,lo.email,lo.mobile_number,lo.name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id left join municipalitis m on p.municipality_id = m.id left join logins lo on p.login_id = lo.id where p.login_id =:id ", {
        replacements: {
            id: data.login_id ? data.login_id : 'NULL',
        },
        type: sequelize.QueryTypes.SELECT
    }).then(searchdata => {
        defer.resolve(searchdata);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const Details = {
    get,
    post,
    getAllUsers,
    getPropertyByUser
};

export {
    Details
};