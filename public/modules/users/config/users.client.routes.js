(function() {
	'use strict';

	angular
		.module('users')
		.config(UsersRoutes);

		UsersRoutes.$inject =	['$stateProvider'];

		function UsersRoutes($stateProvider) {
			$stateProvider
        .state('profile', {
          abstract: false,
          url: '/profile',
          templateUrl: 'modules/users/views/profile.client.view.html',
          controller: 'ProfileViewController'
        })
        .state('profile.view', {
          abstract: false,
          url: '/view',
          templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
          controller: 'SettingsController'
        })
        .state('profile.edit', {
          abstract: false,
          url: '/edit',
          templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
          controller: 'SettingsController'
        })
        .state('profile.accounts', {
          abstract: false,
          url: '/accounts',
          templateUrl: 'modules/users/views/settings/social-accounts.client.view.html',
          controller: 'SettingsController'
        })
        .state('profile.password', {
          abstract: false,
          url: '/password',
          templateUrl: 'modules/users/views/settings/change-password.client.view.html',
          controller: 'SettingsController'
        })
        // CRUD Generator states.
  			.state('signup', {
  				url: '/signup',
  				templateUrl: 'modules/users/views/authentication/signup.client.view.html',
  				controller: 'AuthenticationController'
  			})
  			.state('signin', {
  				url: '/signin',
  				templateUrl: 'modules/users/views/authentication/signin.client.view.html',
  				controller: 'AuthenticationController'
  			})
  			.state('forgot', {
  				url: '/password/forgot',
  				templateUrl: 'modules/users/views/password/forgot-password.client.view.html',
  				controller: 'PasswordController'
  			})
  			.state('reset-invalid', {
  				url: '/password/reset/invalid',
  				templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
  			})
  			.state('reset-success', {
  				url: '/password/reset/success',
  				templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
  			})
  			.state('reset', {
  				url: '/password/reset/:token',
  				templateUrl: 'modules/users/views/password/reset-password.client.view.html',
  				controller: 'PasswordController'
  			})
  			.state('signout', {
  				url: '/auth/signout',
  				templateUrl: '',
  				controller: ''
  			});
		}
})();