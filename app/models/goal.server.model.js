'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Goal Schema
 */
var GoalSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Goal name',
		trim: true
	},
	description: {
		type: String,
		default: ''
	},
	assumptions: [],
	objectives: [],
	constraints: [],
	measures: [],
	datasets: [],
	models: [],
	documents: [],
	publications: [],
	collaborators: [],
	updated: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Goal', GoalSchema);