'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Formulation Schema
 */
var FormulationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Formulation name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Formulation', FormulationSchema);