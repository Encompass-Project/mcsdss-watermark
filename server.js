'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')();
var	config = require('./config/config');
var	mongoose = require('mongoose');
var	chalk = require('chalk');



/* START TESTING UPLOADS */

// SIMPLE TEST.
// var express = require('express');
// var multer = require('multer');

// COMPLEX TEST.
var multer = require('multer');
var upload = multer({ dest: './uploads/'});

/* END TESTING UPLOADS */



/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();



/* START TESTING UPLOADS */

// SIMPLE TEST.
// app.use(multer({dest: './uploads/'}));
// app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));
// var uploads = express.Router();
// require('./app/routes/uploads.server.routes.js')(uploads);
// app.use('/uploads', uploads);

// MORE MULTIPART FILE UPLOAD TESTS.
app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));
// app.use(multer({dest:'./uploads/'}).array('multiInputFileName'));
// examples:
// app.use(multer({dest:'./uploads/'}).single(...));
// app.use(multer({dest:'./uploads/'}).array(...));
// app.use(multer({dest:'./uploads/'}).fields(...));

// COMPLEX TEST.
// app.use(multer({dest: './uploads/'}));
// app.use('/uploads', express.static(__dirname + &quot;/uploads&quot;));
// app.use('/uploads', express.static(__dirname + '&quot;/uploads&quot'));

// app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));

/* END TESTING UPLOADS. */


// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);