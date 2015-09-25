'use strict';

angular.module('core').controller('AnalyzeViewController', ['$scope', '$location', 'Authentication',
    function($scope, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function(target) {
            console.log(target);
        };

        // leaflet-directive configs.
        $scope.rechargePanelVisible = false;
        $scope.wellsPanelVisible = false;
        $scope.springsPanelVisible = false;

        $scope.initialPosition = [49, -97];
        $scope.panOptionsInteractive = {
          'animate': true,
          'duration': 3,
          'easeLinearity': 0.25,
          'noMoveStart': 'false'
        };

        // angular-lealet-directive configs.
        // $scope.center = {};

        // angular.extend($scope, {
        //    london: {
        //         lat: 51.505,
        //         lng: -0.09,
        //         zoom: 10
        //     },
        //     markers: {
        //         main_marker: {
        //             lat: 51.5,
        //             lng: -0.09,
        //             focus: true,
        //             //message: 'Hey, drag me if you want',
        //             title: 'Marker',
        //             draggable: true,
        //             label: {
        //                 message: 'Hey, drag london if you want',
        //                 options: {
        //                     noHide: true
        //                 }
        //             }
        //         }
        //     }
        // });
    }
]);