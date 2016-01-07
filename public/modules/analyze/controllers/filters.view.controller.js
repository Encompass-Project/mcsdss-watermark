(function() {
    'use strict';

    angular
        .module('analyze')
        .controller('FiltersViewController', FiltersViewController);

    FiltersViewController.$inject = ['$scope', 'Authentication', 'maufConfig']; // , 'BsDropdown'

    function FiltersViewController($scope, Authentication, maufConfig) { // BsDropdown
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.updateView = updateView;
        $scope.setCurrentDataset = setCurrentDataset;
        // $scope.outputUpdate = outputUpdate;
        $scope.suf1Update = suf1Update;
        $scope.suf2Update = suf2Update;
        $scope.suf3Update = suf3Update;
        $scope.mufUpdate = mufUpdate;

        $scope.$on('analysisDataLoaded', function (event, args) {
            // console.log('analysisData event received by FiltersViewCTRL. Using the following config data: ');
            // console.log(args);

            $scope.maufConfig = maufConfig;
            // console.log($scope.maufConfig);

            // $scope.updateView(args);
            // $scope.updateView($scope.maufConfig);
        });

        function updateView(data) {
            // console.log('FiltersView updating with new data:' , data);
        }

        // Weighting filters interaction.
        $scope.statuses = [{
            id: 1,
            name: "Original"
        }, {
            id: 2,
            name: "Modified"
        }];
        $scope.selected_status = 1;

        // document.getElementById('current-dataset-toggle').onchange = function() { setCurrentDataset(this.value) };

        function setCurrentDataset() {
            console.log('Dataset changed.');
        }

        // document.getElementById('suf-weight-dim1').oninput = function() { outputUpdate(this.value) };

        // function outputUpdate(weight) {
        //     console.log('The value of the input field was changed to:', weight);
        //     document.getElementById('suf-weight-dim1-value').value = weight;
        // }

        // This is the hardcoded hack to filter the display data for the demos.
        // Need to convert this into a generalized method for handling all the range inputs uniformly here.
        // Refactor - No need for unique method per dimension.

        document.getElementById('suf-weight-dim1').oninput = function() { suf1Update(this.value) };
        document.getElementById('suf-weight-dim2').oninput = function() { suf2Update(this.value) };
        document.getElementById('suf-weight-dim3').oninput = function() { suf3Update(this.value) };
        document.getElementById('muf-weight').oninput = function() { mufUpdate(this.value) };

        function suf1Update(weight) {
            document.getElementById('suf-weight-dim1-value').value = weight;
            $scope.$emit('SUFWeightDim1Update', weight);
            // console.log('The value of the suf 1 weight was changed to:', weight);
        }

        function suf2Update(weight) {
            document.getElementById('suf-weight-dim2-value').value = weight;
            $scope.$emit('SUFWeightDim2Update', weight);
            // console.log('The value of the suf 2 weight was changed to:', weight);
        }

        function suf3Update(weight) {
            document.getElementById('suf-weight-dim3-value').value = weight;
            $scope.$emit('SUFWeightDim3Update', weight);
            // console.log('The value of the suf 3 weight was changed to:', weight);
        }

        function mufUpdate(weight) {
            if (weight == 0) {
                document.getElementById('muf-weight-value').value = weight + ' (minimal utility)';
            } else if (weight == 1) {
                document.getElementById('muf-weight-value').value = weight + ' (maximal utility)';
            } else {
                document.getElementById('muf-weight-value').value = weight;
            }

            $scope.$emit('MUFWeightUpdate', weight);
            // console.log('The value of the muf weight was changed to:', weight);
        }

    }
})();