'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notebook Schema
 */
var NotebookSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Notebook name',
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

mongoose.model('Notebook', NotebookSchema);