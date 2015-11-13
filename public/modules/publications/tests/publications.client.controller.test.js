(function() {
	'use strict';

	// Publications Controller Spec
	describe('Publications Controller Tests', function() {
		// Initialize global variables
		var PublicationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Publications controller.
			PublicationsController = $controller('PublicationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Publication object fetched from XHR', inject(function(Publications) {
			// Create sample Publication using the Publications service
			var samplePublication = new Publications({
				name: 'New Publication'
			});

			// Create a sample Publications array that includes the new Publication
			var samplePublications = [samplePublication];

			// Set GET response
			$httpBackend.expectGET('publications').respond(samplePublications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.publications).toEqualData(samplePublications);
		}));

		it('$scope.findOne() should create an array with one Publication object fetched from XHR using a publicationId URL parameter', inject(function(Publications) {
			// Define a sample Publication object
			var samplePublication = new Publications({
				name: 'New Publication'
			});

			// Set the URL parameter
			$stateParams.publicationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/publications\/([0-9a-fA-F]{24})$/).respond(samplePublication);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.publication).toEqualData(samplePublication);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Publications) {
			// Create a sample Publication object
			var samplePublicationPostData = new Publications({
				name: 'New Publication'
			});

			// Create a sample Publication response
			var samplePublicationResponse = new Publications({
				_id: '525cf20451979dea2c000001',
				name: 'New Publication'
			});

			// Fixture mock form input values
			scope.name = 'New Publication';

			// Set POST response
			$httpBackend.expectPOST('publications', samplePublicationPostData).respond(samplePublicationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Publication was created
			expect($location.path()).toBe('/publications/' + samplePublicationResponse._id);
		}));

		it('$scope.update() should update a valid Publication', inject(function(Publications) {
			// Define a sample Publication put data
			var samplePublicationPutData = new Publications({
				_id: '525cf20451979dea2c000001',
				name: 'New Publication'
			});

			// Mock Publication in scope
			scope.publication = samplePublicationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/publications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/publications/' + samplePublicationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid publicationId and remove the Publication from the scope', inject(function(Publications) {
			// Create new Publication object
			var samplePublication = new Publications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Publications array and include the Publication
			scope.publications = [samplePublication];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/publications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePublication);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.publications.length).toBe(0);
		}));
	});
}());