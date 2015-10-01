'use strict';

angular.module('core').controller('DatatableViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // $scope.headers = [
        //     { "order": 1, "width": 0, "label": "ID", "data": "id", "type": "string", "visible": true },
        //     { "order": 2, "width": 120, "label": "Last Name", "data": "lastName", "type": "string", "visible": true },
        //     { "order": 3, "width": 129, "label": "First Name", "data": "firstName", "type": "string", "visible": true },
        //     { "order": 4, "width": 200, "label": "Email Address", "data": "email", "type": "string", "visible": true },
        //     { "order": 5, "width": 120, "label": "Phone Number", "data": "phoneNumber", "type": "string", "visible": true },
        //     { "order": 6, "width": 80, "label": "Username", "data": "username", "type": "string", "visible": true },
        //     { "order": 7, "width": 100, "label": "Last Login", "data": "lastLoginDate", "type": "date", "visible": true }
        // ];

        $scope.users = [
            { "id": "1", "lastName": "Test1", "firstName": "Test", "email": "test1@example.com", "phoneNumber": "(555) 111-0001", "username": "ttest1", lastLoginDate: "12/28/2012 3:51 PM" },
            { "id": "2", "lastName": "Test2", "firstName": "Test", "email": "test2@example.com", "phoneNumber": "(555) 222-0002", "username": "ttest2", lastLoginDate: "12/28/2012 3:52 PM" },
            { "id": "3", "lastName": "Test3", "firstName": "Test", "email": "test3@example.com", "phoneNumber": "(555) 333-0003", "username": "ttest3", lastLoginDate: "12/28/2012 3:53 PM" },
            { "id": "4", "lastName": "Test4", "firstName": "Test", "email": "test4@example.com", "phoneNumber": "(555) 444-0004", "username": "ttest4", lastLoginDate: "12/28/2012 3:54 PM" },
            { "id": "5", "lastName": "Test5", "firstName": "Test", "email": "test5@example.com", "phoneNumber": "(555) 555-0005", "username": "ttest5", lastLoginDate: "12/28/2012 3:55 PM" }
        ];

        $scope.headers = [
            {'order':1, 'width':0, 'label':'ID', 'data':'id', 'type':'string' ,'visible':false},
            {'order':2, 'width':20, 'label':'Run Name', 'data':'runName', 'type':'string' ,'visible':true},
            {'order':3, 'width':20, 'label':'Attribute 1', 'data':'attrName', 'type':'string' ,'visible':true},
            {'order':4, 'width':20, 'label':'Value', 'data':'attrValue', 'type':'string' ,'visible':true},
            {'order':5, 'width':20, 'label':'Spark Line', 'data':'attrSparkline', 'type':'string' ,'visible':true},
            {'order':6, 'width':20, 'label':'SUF Score', 'data':'attrSufScore', 'type':'string' ,'visible':true},
            {'order':7, 'width':20, 'label':'Attribute 2', 'data':'attrName', 'type':'string' ,'visible':true},
            {'order':8, 'width':20, 'label':'Value', 'data':'attrValue', 'type':'string' ,'visible':true},
            {'order':9, 'width':20, 'label':'Spark Line', 'data':'attrSparkline', 'type':'string' ,'visible':true},
            {'order':10, 'width':20, 'label':'SUF Score', 'data':'attrSufScore', 'type':'string' ,'visible':true},
            {'order':11, 'width':20, 'label':'Attribute 3', 'data':'attrName', 'type':'string' ,'visible':true},
            {'order':12, 'width':20, 'label':'Value', 'data':'attrValue', 'type':'string' ,'visible':true},
            {'order':13, 'width':20, 'label':'Spark Line', 'data':'attrSparkline', 'type':'string' ,'visible':true},
            {'order':14, 'width':20, 'label':'SUF Score', 'data':'attrSufScore', 'type':'string' ,'visible':true},
            {'order':15, 'width':20, 'label':'MUF Score', 'data':'runMufScore', 'type':'string' ,'visible':true}
        ];

        $scope.datasets = [
            {''}
        ];

        // $scope.counter = 0;

        $scope.headerOrder = 'order';

        $scope.headerFilter = function(header) {
            return header.visible;
        };

        $scope.userOrder = function(key) {
            console.log("key="+key);    //prints: "key=undefined"

            angular.forEach($scope.headers, function(header){
                console.log("key="+key);
                if(header.data == key) {
                    if(header.visible) {
                        return header.order;
                    }
                }
            });
            return -1;
        };

        $scope.rowClicked = function(user) {
            console.log("Username: " + user.username);
        };

    }
]);