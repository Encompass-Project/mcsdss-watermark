'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Datum = mongoose.model('Datum'),
	_ = require('lodash');

/**
 * Create a Datum
 */
exports.create = function(req, res) {
	var datum = new Datum(req.body);
	datum.user = req.user;

	datum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datum);
		}
	});
};

/**
 * Show the current Datum
 */
exports.read = function(req, res) {
	res.jsonp(req.datum);
};

/**
 * Update a Datum
 */
exports.update = function(req, res) {
	var datum = req.datum ;

	datum = _.extend(datum , req.body);

	datum.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datum);
		}
	});
};

/**
 * Delete an Datum
 */
exports.delete = function(req, res) {
	var datum = req.datum ;

	datum.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datum);
		}
	});
};

/**
 * List of Data
 */
exports.list = function(req, res) { 
	Datum.find().sort('-created').populate('user', 'displayName').exec(function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(data);
		}
	});
};

/**
 * Datum middleware
 */
exports.datumByID = function(req, res, next, id) { 
	Datum.findById(id).populate('user', 'displayName').exec(function(err, datum) {
		if (err) return next(err);
		if (! datum) return next(new Error('Failed to load Datum ' + id));
		req.datum = datum ;
		next();
	});
};

/**
 * Datum authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.datum.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
