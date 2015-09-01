'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Datum = mongoose.model('Datum'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, datum;

/**
 * Datum routes tests
 */
describe('Datum CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Datum
		user.save(function() {
			datum = {
				name: 'Datum Name'
			};

			done();
		});
	});

	it('should be able to save Datum instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datum
				agent.post('/data')
					.send(datum)
					.expect(200)
					.end(function(datumSaveErr, datumSaveRes) {
						// Handle Datum save error
						if (datumSaveErr) done(datumSaveErr);

						// Get a list of Data
						agent.get('/data')
							.end(function(dataGetErr, dataGetRes) {
								// Handle Datum save error
								if (dataGetErr) done(dataGetErr);

								// Get Data list
								var data = dataGetRes.body;

								// Set assertions
								(data[0].user._id).should.equal(userId);
								(data[0].name).should.match('Datum Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Datum instance if not logged in', function(done) {
		agent.post('/data')
			.send(datum)
			.expect(401)
			.end(function(datumSaveErr, datumSaveRes) {
				// Call the assertion callback
				done(datumSaveErr);
			});
	});

	it('should not be able to save Datum instance if no name is provided', function(done) {
		// Invalidate name field
		datum.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datum
				agent.post('/data')
					.send(datum)
					.expect(400)
					.end(function(datumSaveErr, datumSaveRes) {
						// Set message assertion
						(datumSaveRes.body.message).should.match('Please fill Datum name');
						
						// Handle Datum save error
						done(datumSaveErr);
					});
			});
	});

	it('should be able to update Datum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datum
				agent.post('/data')
					.send(datum)
					.expect(200)
					.end(function(datumSaveErr, datumSaveRes) {
						// Handle Datum save error
						if (datumSaveErr) done(datumSaveErr);

						// Update Datum name
						datum.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Datum
						agent.put('/data/' + datumSaveRes.body._id)
							.send(datum)
							.expect(200)
							.end(function(datumUpdateErr, datumUpdateRes) {
								// Handle Datum update error
								if (datumUpdateErr) done(datumUpdateErr);

								// Set assertions
								(datumUpdateRes.body._id).should.equal(datumSaveRes.body._id);
								(datumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Data if not signed in', function(done) {
		// Create new Datum model instance
		var datumObj = new Datum(datum);

		// Save the Datum
		datumObj.save(function() {
			// Request Data
			request(app).get('/data')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Datum if not signed in', function(done) {
		// Create new Datum model instance
		var datumObj = new Datum(datum);

		// Save the Datum
		datumObj.save(function() {
			request(app).get('/data/' + datumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', datum.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Datum instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Datum
				agent.post('/data')
					.send(datum)
					.expect(200)
					.end(function(datumSaveErr, datumSaveRes) {
						// Handle Datum save error
						if (datumSaveErr) done(datumSaveErr);

						// Delete existing Datum
						agent.delete('/data/' + datumSaveRes.body._id)
							.send(datum)
							.expect(200)
							.end(function(datumDeleteErr, datumDeleteRes) {
								// Handle Datum error error
								if (datumDeleteErr) done(datumDeleteErr);

								// Set assertions
								(datumDeleteRes.body._id).should.equal(datumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Datum instance if not signed in', function(done) {
		// Set Datum user 
		datum.user = user;

		// Create new Datum model instance
		var datumObj = new Datum(datum);

		// Save the Datum
		datumObj.save(function() {
			// Try deleting Datum
			request(app).delete('/data/' + datumObj._id)
			.expect(401)
			.end(function(datumDeleteErr, datumDeleteRes) {
				// Set message assertion
				(datumDeleteRes.body.message).should.match('User is not logged in');

				// Handle Datum error error
				done(datumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Datum.remove().exec();
		done();
	});
});