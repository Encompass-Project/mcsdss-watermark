'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Geojson = mongoose.model('Geojson'),
	_ = require('lodash');

/**
 * Create a Geojson
 */
exports.create = function(req, res) {
	// var geojson = new Geojson(req.body);
	var geojson = new Geojson({
		name: req.body.name,
		description: req.body.description
	});
	geojson.user = req.user;

	geojson.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(geojson);
		}
	});
};

/**
 * Show the current Geojson
 */
exports.read = function(req, res) {
	res.jsonp(req.geojson);
};

/**
 * Update a Geojson
 */
exports.update = function(req, res) {
	var geojson = req.geojson ;

	geojson = _.extend(geojson , req.body);

	geojson.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(geojson);
		}
	});
};

/**
 * Delete an Geojson
 */
exports.delete = function(req, res) {
	var geojson = req.geojson ;

	geojson.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(geojson);
		}
	});
};

/**
 * List of Geojsons
 */
exports.list = function(req, res) {
	Geojson.find().sort('-created').populate('user', 'displayName').exec(function(err, geojsons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(geojsons);
		}
	});
};

/**
 * Geojson middleware
 */
exports.geojsonByID = function(req, res, next, id) {
	Geojson.findById(id).populate('user', 'displayName').exec(function(err, geojson) {
		if (err) return next(err);
		if (! geojson) return next(new Error('Failed to load Geojson ' + id));
		req.geojson = geojson ;
		next();
	});
};

/**
 * Geojson authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.geojson.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
