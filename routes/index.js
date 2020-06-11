'use strict';
import path from 'path';
import IndexRoute from './IndexRoute';
import LocationRoute from './locationRoute';
import PropertyRoute from './propertyRoute';
import MunicipalityRoute  from './municipalityRoute';
import ContactRoute from './contactRoute';
import {
	Router
} from 'express';

let router = Router();

/* Main Routes. */

module.exports = function (app) {
	router.use('/', IndexRoute);
	router.use('/location',LocationRoute);
	router.use('/property',PropertyRoute);
	router.use('/municipality',MunicipalityRoute);
	router.use('/contact',ContactRoute);
	return router;
}
