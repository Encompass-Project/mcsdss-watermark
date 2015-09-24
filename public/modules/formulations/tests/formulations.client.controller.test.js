'use strict';

(function() {
	// Formulations Controller Spec
	describe('Formulations Controller Tests', function() {
		// Initialize global variables
		var FormulationsController,
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

			// Initialize the Formulations controller.
			FormulationsController = $controller('FormulationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Formulation object fetched from XHR', inject(function(Formulations) {
			// Create sample Formulation using the Formulations service
			var sampleFormulation = new Formulations({
				name: 'New Formulation'
			});

			// Create a sample Formulations array that includes the new Formulation
			var sampleFormulations = [sampleFormulation];

			// Set GET response
			$httpBackend.expectGET('formulations').respond(sampleFormulations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.formulations).toEqualData(sampleFormulations);
		}));

		it('$scope.findOne() should create an array with one Formulation object fetched from XHR using a formulationId URL parameter', inject(function(Formulations) {
			// Define a sample Formulation object
			var sampleFormulation = new Formulations({
				name: 'New Formulation'
			});

			// Set the URL parameter
			$stateParams.formulationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/formulations\/([0-9a-fA-F]{24})$/).respond(sampleFormulation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.formulation).toEqualData(sampleFormulation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Formulations) {
			// Create a sample Formulation object
			var sampleFormulationPostData = new Formulations({
				name: 'New Formulation'
			});

			// Create a sample Formulation response
			var sampleFormulationResponse = new Formulations({
				_id: '525cf20451979dea2c000001',
				name: 'New Formulation'
			});

			// Fixture mock form input values
			scope.name = 'New Formulation';

			// Set POST response
			$httpBackend.expectPOST('formulations', sampleFormulationPostData).respond(sampleFormulationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Formulation was created
			expect($location.path()).toBe('/formulations/' + sampleFormulationResponse._id);
		}));

		it('$scope.update() should update a valid Formulation', inject(function(Formulations) {
			// Define a sample Formulation put data
			var sampleFormulationPutData = new Formulations({
				_id: '525cf20451979dea2c000001',
				name: 'New Formulation'
			});

			// Mock Formulation in scope
			scope.formulation = sampleFormulationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/formulations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/formulations/' + sampleFormulationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid formulationId and remove the Formulation from the scope', inject(function(Formulations) {
			// Create new Formulation object
			var sampleFormulation = new Formulations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Formulations array and include the Formulation
			scope.formulations = [sampleFormulation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/formulations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFormulation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.formulations.length).toBe(0);
		}));
	});
}());