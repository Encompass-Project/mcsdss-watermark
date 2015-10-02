'use strict';

angular.module('core').controller('AnalyzeViewController', ['$scope', '$state', '$location', 'Authentication', 'httpq',
    function($scope, $state, $location, Authentication, $httpq) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $state.go('dashboard.analyze.layout'); // Required to get nested named views to populate correctly. Not routing correctly from routes.js without this.

        $scope.sourceFile = './data/BSGAM_Heads_Wells_Drains_Zones_Master.csv';

        /*
        // Need a way to manage sharing async data between controllers in order to populate child views properly and not repeat http requests.
        // See: http://stackoverflow.com/questions/18377348/share-async-data-between-controllers-without-making-multiple-requests
        // http://stackoverflow.com/questions/18004298/angular-ui-router-get-asynchronous-data-with-resolve
        // http://stackoverflow.com/questions/31272074/passing-scope-variable-to-child-controller
        */

        $httpq.get($scope.sourceFile)
            .then(function(data) {
                $scope.parseCsvData(data);
            })
            .catch(function(data, status) {
                console.error('Load error', response.status, response.data);
            })
            .finally(function() {
                console.log($scope.sourceData); // Data is available here to inject into sub0controllers for Graph, Map and Datatable.
            });

        $scope.clicked = function(target) {
            console.log(target);
        };

        $scope.traceData = function(data) {
            // console.log(data);
            $scope.sourceData = data;
        };

        $scope.parseCsvData = function(csvData) {
            Papa.parse(csvData, {
                complete: function(results) {
                    // console.log(results.data);
                    var newData = results.data;
                    $scope.traceData(newData);
                }
            });
        };
    }
]);
