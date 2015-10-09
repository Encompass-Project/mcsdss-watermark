'use strict';

angular.module('core').controller('DatatableViewController', ['$scope', 'Authentication', '$filter', 'ngTableParams',
    function($scope, Authentication, $filter, ngTableParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log(event, args);
            // console.log('Datatable View receiving broadcast.');
            $scope.updateView(args);
        });

        $scope.headerFilter = function(target) {
            return target.visible;
        };

        $scope.datasetOrder = function(key) {
            // console.log(key);
            // console.log("key="+key);    //prints: "key=undefined"

            angular.forEach($scope.headers, function (target){
                // console.log("key="+key);
                if (target.data == key) {
                    if (target.visible) {
                        return target.order;
                    }
                }
            });
            return -1;
        };

        $scope.rowClicked = function (target) {
            console.log("Dataset: " + target.runName);
        };

        $scope.decorateSiblings = function (target) {
            // console.log('data row touched, sending emission.');
            $scope.$emit('currentDatatableTarget', target);
        };

        $scope.clearSiblings = function (target) {
            // console.log('datarow cleared, sending all clear.');
            $scope.$emit('clearDatatableTarget', target);
        };

        $scope.updateView = function (data) {
            // console.log('datatableViewCtrl.updateView(data): ', data);
            // console.log(data);
            // $scope.preferences = [ ];
            // $scope.limit = 50;
            $scope.allTabledata = data;
            // console.log($scope.allTabledata);
            // $scope.headerData = $scope.allTabledata.splice(0,1);     // Need to remove index 0 from data before populating table.
            $scope.tabledata = $scope.allTabledata;
            // console.log($scope.allTabledata);
            // console.log($scope.headerData);
            // console.log($scope.tabledata);

            // ngTable
            $scope.dataTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.tabledata.length,
                    counts: [10, 25, 50, 100, 250],
                    defaultSort: 'asc',
                    getData: function ($defer, params) {
                       $scope.data = params.sorting() ? $filter('orderBy')($scope.tabledata, params.orderBy()) : $scope.tabledata;
                       $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data);
                    }
                }
            );
        };
    }
]);