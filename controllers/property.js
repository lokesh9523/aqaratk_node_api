import {
    sequelize,
    logins,
    property,
    property_types,
    clients
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
            let temp = [];
            let others = {};
            propertyData.forEach((element,index) => {
                if(element.display_name === 'Others'){
                    others = element;
                }else{
                    temp.push(element)
                }
                if(propertyData.length === (index+1)){
                    temp.push(others)
                    defer.resolve(temp);

                }
            });
            // defer.resolve(propertyData);
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
const put = (req)=>{
    let defer = q.defer();
    let data = req.body;
   
    if (!data.property_id) {
        defer.reject({
            status: 403,
            message: "Please Enter the type of property"
        });
        return defer.promise;
    }
    console.log("iam here",data)
    property.update(data, {
        where: {
            id: data.property_id
        }

    }).then(propertydata => {
        if (propertydata) {
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
                sequelize.query("select p.*,l.display_name as location_name,pt.display_name as property_name,m.display_name as municipality_name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id  left join municipalitis m on p.municipality_id = m.id where  p.id=:id", {
                    replacements: {
                        id: data.property_id ? data.property_id : 'NULL'
                    },
                    type: sequelize.QueryTypes.SELECT
                }).then(searchdata => {
                    // const nodemailer = require('nodemailer');
                    // const Email = require('email-templates');
                    // const transporter = nodemailer.createTransport({
                    //     host: 'smtp.gmail.com',
                    //     port: 465,
                    //     secure: true,
                    //     auth: {
                    //         user: "lokeshbabu.gp21@gmail.com",
                    //         pass: "9963049529@"
                    //     }
                    // });
                    // const email = new Email({
                    //     transport: transporter,
                    //     send: true,
                    //     preview: false,
                    // });
                    // if(typeof searchdata[0].images === 'string'){
                    //     searchdata[0].images = JSON.parse(searchdata[0].images); 
                    //     if(typeof searchdata[0].images === 'string'){
                    //         searchdata[0].images = JSON.parse(searchdata[0].images);
                    //     }
                    // }
                    // email.send({
                    //     template: 'property',
                    //     message: {
                    //         to: 'lokeshbabu.gp95@gmail.com',
                    //     },
                    //     locals: {
                    //         // name: 'Elon',
                    //         municipality:searchdata[0].municipality_name,
                    //         location:searchdata[0].location_name,
                    //         Property:searchdata[0].property_name,
                    //         bedbrooms:searchdata[0].no_of_bed_rooms,
                    //         furniture:searchdata[0].furniture,
                    //         url: 'http://15.206.186.93:3001/'+searchdata[0].images['0']
                    //     }
                    // }).then(() => console.log('email has been sent!')).catch(error => {
                    //     console.log(error)
                    // });
                    defer.resolve(searchdata);

                });
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
    if (data.municipality_id) {
        if (query) {
            query = query + "and "
        }
        query = query + "p.municipality_id = :municipality_id  "
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
        query = query + " p.furniture = :furniture "
    }


    sequelize.query("select p.*,m.display_name as municipality_name,l.display_name as location_name,pt.display_name as property_name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id left join municipalitis m on p.municipality_id = m.id where  " + query + "  order by p.id desc ", {
        replacements: {
            location_id: data.location_id ? data.location_id : 'NULL',
            property_id: data.property_id ? data.property_id : 'NULL',
            no_of_bed_rooms: data.no_of_bed_rooms ? data.no_of_bed_rooms : 'NULL',
            furniture: data.furniture ? data.furniture : 'NULL',
            municipality_id:data.municipality_id ? data.municipality_id : 'NULL'
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
const sendMail = (req) => {
    let defer = q.defer();
    let images = {};
    let data = req.params;
    property.findOne({
        where: {
            id: data.property_id
        },
    })
        .then(propertyData => {
            sequelize.query("select p.*,l.display_name as location_name,pt.display_name as property_name,m.display_name as municipality_name from property p left join location l on p.location_id = l.id left join property_types pt on pt.id = p.property_id  left join municipalitis m on p.municipality_id = m.id where  p.id=:id", {
                replacements: {
                    id: data.property_id ? data.property_id : 'NULL'
                },
                type: sequelize.QueryTypes.SELECT
            }).then(searchdata => {
                const nodemailer = require('nodemailer');
                const Email = require('email-templates');
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: "lokeshbabu.gp21@gmail.com",
                        pass: "9963049529@"
                    }
                });
                const email = new Email({
                    transport: transporter,
                    send: true,
                    preview: false,
                });
                if(typeof searchdata[0].images === 'string'){
                    searchdata[0].images = JSON.parse(searchdata[0].images); 
                    if(typeof searchdata[0].images === 'string'){
                        searchdata[0].images = JSON.parse(searchdata[0].images);
                    }
                }
                clients.findAll().then(clientsdata=>{
                    if(clients){
                        let mails=[];
                        clientsdata.forEach((mail,index)=>{
                            mails.push(mail.email);
                            console.log(mails,"==============mails")
                            if(clientsdata.length === (index +1)){

                        defer.resolve({"data":"Sucess"})
                                email.send({
                                    template: 'property',
                                    message: {
                                        to: mails
                                    },
                                    locals: {
                                        // name: 'Elon',
                                        municipality:searchdata[0].municipality_name,
                                        location:searchdata[0].location_name,
                                        Property:searchdata[0].property_name,
                                        bedbrooms:searchdata[0].no_of_bed_rooms,
                                        furniture:searchdata[0].furniture,
                                        url: 'http://15.206.186.93:3001/'+searchdata[0].images['0']
                                    }
                                }).then(() => console.log('email has been sent!')).catch(error => {
                                    console.log(error)
                                });
                                // defer.resolve(clientsdata)
                            }
                        });
                    }else{
                        defer.resolve({"data":"Sucess"})
                    }

                }).catch(error=>{
                    defer.reject({
                        status: 400,
                        message: error.message
                    });
                    return defer.promise;

                })
                // defer.resolve(searchdata);

            });
        })
        .catch(error => {
            defer.reject({
                status: 400,
                message: error.message
            });
            return defer.promise;
        });
//     const nodemailer = require('nodemailer');
//     const Email = require('email-templates');
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: "lokeshbabu.gp21@gmail.com",
//             pass: "9963049529@"// mailtrap.io password
//         }
//     });
//     const email = new Email({
//         transport: transporter,
//         send: true,
//         preview: false,
//     });
// clients.findAlll({})
//     email.send({
//         template: 'property',
//         message: {
//             to: 'lokeshbabu.gp95@gmail.com',
//         },
//         locals: {
//             name: 'Elon',
//             url: 'http://localhost:3001/images/user_1/Screenshot from 2020-03-21 15-49-34.png'
//         }
//     }).then(() => console.log('email has been sent!')).catch(error => {
//         console.log(error)
//     });
return defer.promise;
}
const Property = {
    get,
    post,
    postImage,
    search, sendMail,put
};

export {
    Property
};
