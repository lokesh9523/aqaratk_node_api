'use strict';
import path from 'path';
import IndexRoute from './IndexRoute';
import {
	Router
} from 'express';

let router = Router();

/* Main Routes. */

module.exports = function (app) {
	router.use('/', IndexRoute);
	return router;
}
