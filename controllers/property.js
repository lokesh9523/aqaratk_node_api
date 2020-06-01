import {
    sequelize,
    logins,
    property,
    property_types
} from './../models';
import * as jwt from 'jsonwebtoken';
import q from 'q';
const get = () => {
    let defer = q.defer();
    property_types.findAll({
        where: {
            status: 1
        },
        order: [
            ['display_name', 'ASC']
        ],
    })
        .then(propertyData => {

            defer.resolve(propertyData);
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
    // let tokendata = req.tokendata;
    // if (tokendata.data.id != data.login_id) {
    //     defer.reject({
    //         status: 403,
    //         message: "User Id mismatch"
    //     });
    //     return defer.promise;
    // }
    if (!data.location_id) {
        defer.reject({
            status: 403,
            message: "Please Enter the location"
        });
        return defer.promise;
    }
    if (!data.property_id) {
        defer.reject({
            status: 403,
            message: "Please Enter the type of property"
        });
        return defer.promise;
    }
    property.create(data).then(propertydata => {
        if (propertydata) {
           // var path = "image";
           // var dir = path.concat('/cattle_' + propertydata.id);
           // if (!fs.existsSync(dir)) {
             //   fs.mkdirSync(dir);
            //}
            defer.resolve(propertydata)
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
const postImage = (req, imagedata) => {
    let defer = q.defer();
    let images = {};
    let data = req.params;
    console.log(imagedata);
    // if (imagedata.image_0) {
    //     images['0'] = imagedata.image_0['0'].path;
    // }
    // if (imagedata.image_1) {
    //     images['1'] = imagedata.image_1['0'].path;
    // }
    // if (imagedata.image_2) {
    //     images['2'] = imagedata.image_1['0'].path;
    // }
    // if (imagedata.image_3) {
    //     images['3'] = imagedata.image_1['0'].path;
    // }
    // if (imagedata.image_4) {
    //     images['4'] = imagedata.image_1['0'].path;
    // }
    imagedata.forEach((element, index) => {
        images[index] = element.path;
    });
    property.update({
        images
    }, {
        where: {
            id: data.property_id
        }
    }).then(imageResponse => {
        property.findOne({
            where: {
                id: data.property_id
            },
        })
            .then(propertyData => {
                defer.resolve(propertyData);
            })
            .catch(error => {
                defer.reject({
                    status: 400,
                    message: error.message
                });
                return defer.promise;
            });

    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const search = (req) => {
    let defer = q.defer();
    let data = req.body;
    var query = '';
    if (data.location_id) {
        if (query) {
            query = query + "and "
        }
        query = query + "p.location_id = :location_id  "
    }
    if (data.property_id) {
        if (query) {
            query = query + "and"
        }
        query = query + " p.property_id = :property_id "
    }
    if (data.no_of_bed_rooms) {
        if (query) {
            query = query + "and"
        }
        query = query + " p.no_of_bed_rooms = :no_of_bed_rooms "
    }
    if (data.furniture) {
        if (query) {
            query = query + "and"
        }
        query = query + " c.furniture = :furniture "
    }
 
  
    sequelize.query("select p.*,l.display_name as location_name,pt.display_name as property_name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id where  " + query + "  order by p.id desc ", {
        replacements: {
            location_id: data.location_id ? data.location_id : 'NULL',
            property_id: data.property_id ? data.property_id : 'NULL',
            no_of_bed_rooms: data.no_of_bed_rooms ? data.no_of_bed_rooms : 'NULL',
            furniture: data.furniture ? data.furniture : 'NULL'
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
const Property = {
        get,
        post,
        postImage,
        search
    };

    export {
        Property
    };
