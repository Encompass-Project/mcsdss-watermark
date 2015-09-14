'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Publication Schema
 */
var PublicationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Publication name',
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

mongoose.model('Publication', PublicationSchema);