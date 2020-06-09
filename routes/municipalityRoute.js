import express from 'express';

import {
    Location as locationController,
    Municipality as municipalityController
} from './../controllers';

var router = express.Router();

router.route('/').get(function (req, res, next) {
	municipalityController.get(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})
router.route('/:municipality_id').get(function (req, res, next) {
	municipalityController.getLocation(req).then((response) => {
		res.status(200);
		res.send({
			data: response
		});
	}).catch(err => {
		next(err);
	})
})

module.exports = router;
