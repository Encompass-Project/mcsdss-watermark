angular.module('mcsdss')
.directive('fileModel', ['$parse', function ($parse) {
    // return directive object, restricted to attrib.
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);  // $scope.dataset.file
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                })
            })
        }
    }
}])