'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Decision = mongoose.model('Decision'),
	_ = require('lodash');

/**
 * Create a Decision
 */
exports.create = function(req, res) {
	var decision = new Decision(req.body);
	decision.user = req.user;

	decision.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(decision);
		}
	});
};

/**
 * Show the current Decision
 */
exports.read = function(req, res) {
	res.jsonp(req.decision);
};

/**
 * Update a Decision
 */
exports.update = function(req, res) {
	var decision = req.decision ;

	decision = _.extend(decision , req.body);

	decision.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(decision);
		}
	});
};

/**
 * Delete an Decision
 */
exports.delete = function(req, res) {
	var decision = req.decision ;

	decision.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(decision);
		}
	});
};

/**
 * List of Decisions
 */
exports.list = function(req, res) { 
	Decision.find().sort('-created').populate('user', 'displayName').exec(function(err, decisions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(decisions);
		}
	});
};

/**
 * Decision middleware
 */
exports.decisionByID = function(req, res, next, id) { 
	Decision.findById(id).populate('user', 'displayName').exec(function(err, decision) {
		if (err) return next(err);
		if (! decision) return next(new Error('Failed to load Decision ' + id));
		req.decision = decision ;
		next();
	});
};

/**
 * Decision authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.decision.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
