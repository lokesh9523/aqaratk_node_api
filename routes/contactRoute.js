import express from 'express';

import {
    Contactus as contactController
} from './../controllers';

var router = express.Router();

router.route('/').get(function (req, res, next) {
	contactController.get(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/').post(function (req, res, next) {
	contactController.post(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})

module.exports = router;
