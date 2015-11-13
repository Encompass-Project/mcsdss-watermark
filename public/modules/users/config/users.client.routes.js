(function() {
	'use strict';

	angular
		.module('users')
		.config(UsersRoutes);

		UsersRoutes.$inject =	['$stateProvider'];

		function UsersRoutes($stateProvider) {

      // Define states.
      var signup_state = {
        url: '/signup',
        templateUrl: 'modules/users/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'authorize'
      };

      var signin_state = {
        url: '/signin',
        templateUrl: 'modules/users/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'authorize'
      };

      var forgot_state = {
        url: '/password/forgot',
        templateUrl: 'modules/users/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'password'
      };

      var reset_invalid_state = {
        url: '/password/reset/invalid',
        templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
      };

      var reset_success_state = {
        url: '/password/reset/success',
        templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
      };

      var reset_state = {
        url: '/password/reset/:token',
        templateUrl: 'modules/users/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'password'
      };

      var signout_state = {
        url: '/auth/signout'
      };

      var profile_state = {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/users/views/profile.client.view.html',
        controller: 'ProfileViewController',
        controllerAs: 'profileView',
        data: {
          title: 'Profile'
        }
      };

      var profile_view_state = {
        abstract: false,
        url: '/view',
        templateUrl: 'modules/users/views/settings/view-profile.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_edit_state = {
        abstract: false,
        url: '/edit',
        templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_accounts_state = {
        abstract: false,
        url: '/accounts',
        templateUrl: 'modules/users/views/settings/social-accounts.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      var profile_password_state = {
        abstract: false,
        url: '/password',
        templateUrl: 'modules/users/views/settings/change-password.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      };

      // Populate provider.
			$stateProvider
  			.state('signup', signup_state)
  			.state('signin', signin_state)
  			.state('forgot', forgot_state)
  			.state('reset-invalid', reset_invalid_state)
  			.state('reset-success', reset_success_state)
        .state('reset', reset_state)
  			.state('signout', signout_state)
        .state('profile', profile_state)
        .state('profile.view', profile_view_state)
        .state('profile.edit', profile_edit_state)
        .state('profile.accounts', profile_accounts_state)
        .state('profile.password', profile_password_state);
		}
})();