'use strict';

angular.module('core').controller('DatatableViewController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.headerFilter = function(target) {
            return target.visible;
        };

        $scope.datasetOrder = function(key) {
            console.log(key);
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
            // console.log(data);
            $scope.preferences = [ ];
            $scope.limit = 500;
            $scope.tabledata = data;
            $scope.headers = $scope.tabledata[0];

            // $scope.headers = [
            //     {'order':1, 'width':0, 'label':'ID', 'data':'id', 'type':'string' ,'visible':false},
            //     {'order':2, 'width':20, 'label':'Run Name', 'data':'runName', 'type':'string' ,'visible':true},
            //     {'order':3, 'width':20, 'label':'Attribute 1', 'data':'attrName_0', 'type':'string' ,'visible':true},
            //     {'order':4, 'width':20, 'label':'Value', 'data':'attrValue_0', 'type':'string' ,'visible':true},
            //     {'order':5, 'width':20, 'label':'Spark Line', 'data':'attrSparkline_0', 'type':'string' ,'visible':true},
            //     {'order':6, 'width':20, 'label':'SUF Score', 'data':'attrSufScore_0', 'type':'string' ,'visible':true},
            //     {'order':7, 'width':20, 'label':'Attribute 2', 'data':'attrName_1', 'type':'string' ,'visible':true},
            //     {'order':8, 'width':20, 'label':'Value', 'data':'attrValue_1', 'type':'string' ,'visible':true},
            //     {'order':9, 'width':20, 'label':'Spark Line', 'data':'attrSparkline_1', 'type':'string' ,'visible':true},
            //     {'order':10, 'width':20, 'label':'SUF Score', 'data':'attrSufScore_1', 'type':'string' ,'visible':true},
            //     {'order':11, 'width':20, 'label':'Attribute 3', 'data':'attrName_2', 'type':'string' ,'visible':true},
            //     {'order':12, 'width':20, 'label':'Value', 'data':'attrValue_2', 'type':'string' ,'visible':true},
            //     {'order':13, 'width':20, 'label':'Spark Line', 'data':'attrSparkline_2', 'type':'string' ,'visible':true},
            //     {'order':14, 'width':20, 'label':'SUF Score', 'data':'attrSufScore_2', 'type':'string' ,'visible':true},
            //     {'order':15, 'width':20, 'label':'MUF Score', 'data':'runMufScore', 'type':'string' ,'visible':true}
            // ];

            // $scope.datasets = [
            //     {'id':'1', 'runName':'hash_tag_file_01', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'2', 'runName':'hash_tag_file_02', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'3', 'runName':'hash_tag_file_03', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'4', 'runName':'hash_tag_file_04', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'5', 'runName':'hash_tag_file_05', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'6', 'runName':'hash_tag_file_06', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'7', 'runName':'hash_tag_file_07', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'8', 'runName':'hash_tag_file_08', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'9', 'runName':'hash_tag_file_09', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'10', 'runName':'hash_tag_file_10', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'11', 'runName':'hash_tag_file_11', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'1', 'runName':'hash_tag_file_01', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'2', 'runName':'hash_tag_file_02', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'3', 'runName':'hash_tag_file_03', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'4', 'runName':'hash_tag_file_04', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'5', 'runName':'hash_tag_file_05', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'6', 'runName':'hash_tag_file_06', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'7', 'runName':'hash_tag_file_07', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'8', 'runName':'hash_tag_file_08', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'9', 'runName':'hash_tag_file_09', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'10', 'runName':'hash_tag_file_10', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'},
            //     {'id':'11', 'runName':'hash_tag_file_11', 'attrName_0':'ATTR 0', 'attrValue_0':'attr 0 value', 'attrSparkline_0': 'graph here', 'attrSufScore_0':'attr 0 suf score', 'attrName_1':'ATTR 1', 'attrValue_1':'attr 1 value', 'attrSparkline_1': 'graph here', 'attrSufScore_1':'attr 1 suf score', 'attrName_2':'ATTR 2', 'attrValue_2':'attr 2 value', 'attrSparkline_2': 'graph here', 'attrSufScore_2':'attr 2 suf score', 'runMufScore':'run muf score'}
            // ];

            // $scope.headerOrder = $scope.tabledata[0][0]; // 'datasource';
            // $scope.counter = 0;

            console.log('Datatable view updated.');
        };

        $scope.$on('analysisDataLoaded', function () {
            // console.log($scope.this, 'receiving broadcast');
            console.log('Datatable View receiving broadcast');
            // console.log($scope.sourceData);
            $scope.updateView($scope.sourceData);
        });

    }
]);