(function() {
  'use strict';

  angular
    .module('mcsdss.directives')
    .directive('fileModel', FileModel);

  FileModel.$inject = ['$parse'];

  function FileModel($parse) {

    var directiveDefinitionObject = {
      // compile: false,
      // controller: false,
      // controllerAs: false,
      // link: false,
      // priority: 0,
      // require: false,
      restrict: 'A',
      // scope: {},
      // template: false,
      // templateUrl: false,
      // terminal: false,
      // transclude: false,
      // type: false
    };

    directiveDefinitionObject.link = postLink;

    function postLink(scope, element, attrs) {

      var model = $parse(attrs.fileModel); // $scope.dataset.file
      var modelSetter = model.assign;

      element.bind('change',
        function() {
          scope.$apply(
            function() {
              modelSetter(scope, element[0].files[0]);
            }
          );
        }
      );
    }

    return directiveDefinitionObject;

    // Return the directive object, restricted to attribute.
    // return {
    //   restrict: 'A',
    //   link: function(scope, element, attrs) {
    //     var model = $parse(attrs.fileModel); // $scope.dataset.file
    //     var modelSetter = model.assign;

    //     element.bind('change', function() {
    //       scope.$apply(function() {
    //       modelSetter(scope, element[0].files[0]);
    //     });
    //   })
    // };
})();  // Throwing unexpected syntax error on first ) which makes no sense. Not using this code right now so resolve later if at all.