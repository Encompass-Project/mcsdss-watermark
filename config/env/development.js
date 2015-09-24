'use strict';

var credentials = require('./secrets');

module.exports = {
	db: 'mongodb://localhost/mcsdss-dev',
	app: {
		title: 'MCSDSS - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID', //credentials.facebook.APP_ID, // 'APP_ID'
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET', //credentials.facebook.APP_SECRET, // 'APP_SECRET'
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY', //credentials.twitter.CONSUMER_KEY, // 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET', //credentials.twitter.CONSUMER_SECRET, // 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID', //credentials.google.APP_ID, // 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET', //credentials.google.APP_SECRET, // 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID', //credentials.linkedin.APP_ID, // 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET', //credentials.linkedin.APP_SECRET, // 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID', //credentials.github.APP_ID, // 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET', //credentials.github.APP_SECRET, // 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM', //credentials.mailer.MAILER_FROM, // 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER', //credentials.mailer.MAILER_SERVICE_PROVIDER, // 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID', //credentials.mailer.MAILER_EMAIL_ID, // 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD' //credentials.mailer.MAILER_PASSWORD // 'MAILER_PASSWORD'
			}
		}
	}
};
