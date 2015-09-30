angular.module('mcsdss')
.service('multipartForm', ['$http', function ($http) {
    this.post = function(uploadUrl, data) {
        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity, // prevent serialization of data.
            headers: {
                'Content-Type': undefined       // let browser handle data typing.
            }
        })
    }
}]);
