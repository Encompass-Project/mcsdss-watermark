'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Formulation = mongoose.model('Formulation'),
	_ = require('lodash');

/**
 * Create a Formulation
 */
exports.create = function(req, res) {
	var formulation = new Formulation(req.body);
	formulation.user = req.user;

	formulation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formulation);
		}
	});
};

/**
 * Show the current Formulation
 */
exports.read = function(req, res) {
	res.jsonp(req.formulation);
};

/**
 * Update a Formulation
 */
exports.update = function(req, res) {
	var formulation = req.formulation ;

	formulation = _.extend(formulation , req.body);

	formulation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formulation);
		}
	});
};

/**
 * Delete an Formulation
 */
exports.delete = function(req, res) {
	var formulation = req.formulation ;

	formulation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formulation);
		}
	});
};

/**
 * List of Formulations
 */
exports.list = function(req, res) { 
	Formulation.find().sort('-created').populate('user', 'displayName').exec(function(err, formulations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formulations);
		}
	});
};

/**
 * Formulation middleware
 */
exports.formulationByID = function(req, res, next, id) { 
	Formulation.findById(id).populate('user', 'displayName').exec(function(err, formulation) {
		if (err) return next(err);
		if (! formulation) return next(new Error('Failed to load Formulation ' + id));
		req.formulation = formulation ;
		next();
	});
};

/**
 * Formulation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.formulation.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
