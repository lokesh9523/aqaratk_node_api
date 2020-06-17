import {
	sequelize,
	logins,

} from './../../models';
var md5 = require('md5');
import q from 'q';

const get = (data) => {
	let defer = q.defer();
	defer.resolve({
		"message": "done"
	});
	return defer.promise;
}
const post = (data) => {
	console.log(data)
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

	if (!data.adjective) {
		defer.reject({
			status: 403,
			message: "Adjective is missing"
		});
		return defer.promise;
	}	
	if (!data.mobile_number) {
		defer.reject({
			status: 403,
			message: "mobile number is missing"
		});
		return defer.promise;
	}
	if (data.mobile_number) {
		logins.findOne({
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
					logins.findOne({
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
							if (data.user_name) {
								logins.findOne({
									where: {
										user_name: data.user_name
									}
								}).then(userdata => {
									if (userdata) {
										defer.reject({
											status: 403,
											message: "Username  already exists"
										});
										return defer.promise;
									} else {

										data.password = md5(data.password);

										logins.create(data).then(logindata => {
											if (logindata) {
												var fs = require('fs');
												var path = "images";
												var dir = path.concat('/user_' + logindata.id);
												if (!fs.existsSync(dir)) {
													fs.mkdirSync(dir);
												}
									
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
			}
		})
	}




	return defer.promise;
}

const Register = {
	get,
	post
};

export {
	Register
};