import express from 'express';

import {
    Location as locationController
} from './../controllers';

var router = express.Router();


router.get('/', function (req, res, next) {
    locationController.get()
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
router.get('/:municipality_id', function (req, res, next) {
    locationController.get()
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

module.exports = router;
