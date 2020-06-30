import express from 'express';

import {
	Register as registerController,
	Login as loginController,
	Details as detailController
} from './../controllers';

var router = express.Router();
router.get('/', function (req, res, next) {
	res.status(200);
	res.send({
		status: 'running',
		message: 'Welcome to Partner Rubique api'
	});
});

router.post('/register', function (req, res, next) {
    registerController.post(req.body)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});
router.post('/login',function(req,res,next){
	loginController.post(req.body).then((response)=>{
		res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});
router.post('/forgotpassword',function(req,res,next){
	loginController.forgotpassword(req).then((response)=>{
		res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});
router.route('/users').get(function(req,res,next){
    detailController.getAllUsers(req)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
})
router.route('/user/:login_id').get(function(req,res,next){
    detailController.getPropertyByUser(req.params)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
})
module.exports = router;
