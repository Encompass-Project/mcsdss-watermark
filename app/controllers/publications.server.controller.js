'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Publication = mongoose.model('Publication'),
	_ = require('lodash');

/**
 * Create a Publication
 */
exports.create = function(req, res) {
	var publication = new Publication(req.body);
	publication.user = req.user;

	publication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publication);
		}
	});
};

/**
 * Show the current Publication
 */
exports.read = function(req, res) {
	res.jsonp(req.publication);
};

/**
 * Update a Publication
 */
exports.update = function(req, res) {
	var publication = req.publication ;

	publication = _.extend(publication , req.body);

	publication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publication);
		}
	});
};

/**
 * Delete an Publication
 */
exports.delete = function(req, res) {
	var publication = req.publication ;

	publication.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publication);
		}
	});
};

/**
 * List of Publications
 */
exports.list = function(req, res) { 
	Publication.find().sort('-created').populate('user', 'displayName').exec(function(err, publications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(publications);
		}
	});
};

/**
 * Publication middleware
 */
exports.publicationByID = function(req, res, next, id) { 
	Publication.findById(id).populate('user', 'displayName').exec(function(err, publication) {
		if (err) return next(err);
		if (! publication) return next(new Error('Failed to load Publication ' + id));
		req.publication = publication ;
		next();
	});
};

/**
 * Publication authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.publication.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
