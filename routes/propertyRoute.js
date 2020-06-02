import express from 'express';

import {
    Property as propertyController
} from './../controllers';
import {
Token
}from './../middleware/Verifytoken';
import {upload}  from './../middleware/Imageupload';
var router = express.Router();


router.get('/types', function (req, res, next) {
    propertyController.get()
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
router.route('/:login_id').post(function(req,res,next){
    propertyController.post(req)
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
router.route('/:login_id/:property_id').post( upload.any(), function (req, res, next) {
	const files = req.files
	if (!files) {
		const err = new Error('Please upload the files');
		err.httpStatusCode = 400
		return next(err)
	}
	propertyController.postImage(req, files).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/search').put(function (req, res, next) {
	propertyController.search(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/sendmail').get(function (req, res, next) {
	propertyController.sendMail(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
module.exports = router;
