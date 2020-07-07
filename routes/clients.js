import express from 'express';

import {
    Clients as clientController
} from './../controllers';

var router = express.Router();

router.route('/').get(function (req, res, next) {
	clientController.get(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/').post(function (req, res, next) {
	clientController.post(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/').put(function (req, res, next) {
	clientController.put(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/:id').get(function (req, res, next) {
	clientController.getClientId(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
module.exports = router;
// ALTER TABLE `aqaratk`.`clients` 
// ADD COLUMN `mobile_number1` INT(15) NOT NULL AFTER `email`;
