'use strict';

(function() {
	// Decisions Controller Spec
	describe('Decisions Controller Tests', function() {
		// Initialize global variables
		var DecisionsController,
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

			// Initialize the Decisions controller.
			DecisionsController = $controller('DecisionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Decision object fetched from XHR', inject(function(Decisions) {
			// Create sample Decision using the Decisions service
			var sampleDecision = new Decisions({
				name: 'New Decision'
			});

			// Create a sample Decisions array that includes the new Decision
			var sampleDecisions = [sampleDecision];

			// Set GET response
			$httpBackend.expectGET('decisions').respond(sampleDecisions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.decisions).toEqualData(sampleDecisions);
		}));

		it('$scope.findOne() should create an array with one Decision object fetched from XHR using a decisionId URL parameter', inject(function(Decisions) {
			// Define a sample Decision object
			var sampleDecision = new Decisions({
				name: 'New Decision'
			});

			// Set the URL parameter
			$stateParams.decisionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/decisions\/([0-9a-fA-F]{24})$/).respond(sampleDecision);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.decision).toEqualData(sampleDecision);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Decisions) {
			// Create a sample Decision object
			var sampleDecisionPostData = new Decisions({
				name: 'New Decision'
			});

			// Create a sample Decision response
			var sampleDecisionResponse = new Decisions({
				_id: '525cf20451979dea2c000001',
				name: 'New Decision'
			});

			// Fixture mock form input values
			scope.name = 'New Decision';

			// Set POST response
			$httpBackend.expectPOST('decisions', sampleDecisionPostData).respond(sampleDecisionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Decision was created
			expect($location.path()).toBe('/decisions/' + sampleDecisionResponse._id);
		}));

		it('$scope.update() should update a valid Decision', inject(function(Decisions) {
			// Define a sample Decision put data
			var sampleDecisionPutData = new Decisions({
				_id: '525cf20451979dea2c000001',
				name: 'New Decision'
			});

			// Mock Decision in scope
			scope.decision = sampleDecisionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/decisions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/decisions/' + sampleDecisionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid decisionId and remove the Decision from the scope', inject(function(Decisions) {
			// Create new Decision object
			var sampleDecision = new Decisions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Decisions array and include the Decision
			scope.decisions = [sampleDecision];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/decisions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDecision);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.decisions.length).toBe(0);
		}));
	});
}());