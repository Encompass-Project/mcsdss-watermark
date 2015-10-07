'use strict';

angular.module('core').controller('GraphViewController', ['$rootScope', '$scope', '$state', '$location', 'Authentication',
    function ($rootScope, $scope, $state, $location, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.clicked = function (target) {
            console.log(target);
        };

        $scope.updateView = function (data) {
            console.log('Graph view updated.');
            // console.log($scope.sourceData);
            $scope.visualization(data);
        };

        // WATERMARK.
        $scope.visualization = function (data) {
            // console.log(data);
            // console.log(data[0]);

            var graphPanel = document.getElementById('panel-pm');
            var graphPanelWidth = graphPanel.offsetWidth;
            var graphPanelHeight = graphPanel.offsetHeight;
            // console.log(graphPanelWidth, graphPanelHeight);

            // setup scales for graph layout.
            var graphWidthScale = .95;  //.65;
            var graphHeightScale = .91;  //.85;
            var width = graphPanelWidth * graphWidthScale;
            var height = graphPanelHeight * graphHeightScale;

            // console.log('graph dimensions are: ' + width, height);

            // data sources.
            var graph_dataSource = '../../../../data/Watermark_Master_Total_Wells_Heads_Zones_optimized.csv';
            var aquiferContinuum_dataSource = '../../../../data/AquiferYield_ContinuumData_BartonSprings.csv';

            // MODULE private methods.
            function drawGraph () {

                var dotRadius = 2;
                var dotStrokeWidth = 1;
                var dotStrokeColor = '#111'; // 333F48
                var dotColorOriginal = '#CD6AD4';
                var dotColorModified = '#8AE5F2';
                var dotActiveRadius = 13;
                var dotColorActive = 'rgba(233,174,12,0.7)'; //'#EC9688' #D2AF00;
                var dotActiveStrokeWidth = 7;
                var dotActiveStrokeColor = 'rgba(0,0,0,0.5)'; //'#E85840'; '#D28912';

                var correlateRuns = [];
                var correlateRunsTextColor = '#ffffff';

                var continuumStrokeWidth = 1;
                var continuumStrokeColor = 'rgba(113,178,201,0.7)';
                var continuumTextFill = '#ddd';

                var xScaleDomain_Lower = Math.pow(10, 9); // 0, 1000000000, Math.pow(10, 9)
                var xScaleDomain_Upper = Math.pow(10, 9.85); // 5250000000, 5500000000, Math.pow(10, 9.7)
                var yScaleDomain_Lower = 770;
                var yScaleDomain_Upper = 792;

                // Static Values.
                var animationDuration = 150;
                var tooltipPosX = 30; // width * 1.12; // dynamic values for moving tooltip.
                var tooltipPosY = 60; // height * 1.3; // dynamic values for moving tooltip.
                // Dynamic Values.
                // var tooltipPosXadjust = 5;
                // var tooltipPosYadjust = 15;
                // var tooltipPosXoffset = 0.5;
                // var tooltipPosYoffset = 0.5;

                var cfsDenominator = 315360000; // 315,360,000 seconds
                var decimalLimit = 5;

                /*
                 * value accessor - returns the value to encode for a given data object.
                 * scale - maps value to a visual display encoding, such as a pixel position.
                 * map function - maps from data value to display value
                 * axis - sets up axis
                 */

                // setup scales for graph.
                var xScale = d3.scale.linear().range([0, width]); // value -> display
                var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(10, 'e'); //.tickSubdivide(3).tickSize(20, 10, 0);

                var yScale = d3.scale.linear().range([height, 0]); // value -> display
                var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(10, 's');

                // setup x original
                var xValue_O = function (d) {
                        return d.value_O;
                    }, // data -> value
                    xMap_O = function (d) {
                        return xScale(xValue_O(d));
                    }; // data -> display

                // setup y original
                var yValue_O = function (d) {
                        return d.value_O_heads;
                    },
                    yMap_O = function (d) {
                        return yScale(yValue_O(d));
                    };

                // setup x modified
                var xValue_M = function (d) {
                        return d.value_M;
                    },
                    xMap_M = function (d) {
                        return xScale(xValue_M(d));
                    };

                // setup y modified
                var yValue_M = function (d) {
                        return d.value_O_heads;
                    },
                    yMap_M = function (d) {
                        return yScale(yValue_M(d));
                    };

                // setup x stakeholder
                var xValue_S = function (d) {
                        return d.Total_Pumping_Volume;
                    },
                    xMap_S = function (d) {
                        return xScale(xValue_S(d));
                    };

                // setup y stakeholder
                var yValue_S = function (d) {
                        return d.Average_Total_Storage;
                    },
                    yMap_S = function (d) {
                        return yScale(yValue_S(d));
                    };

                // setup x aquifer-continuum
                var xValue_A = function (d) {
                        return d.Graph_Value;
                    },
                    xMap_A = function (d) {
                        return xScale(xValue_A(d));
                    };

                // setup y aquifer-continuum
                var yValue_A = function (d) {
                        return d.Value;
                    },
                    yMap_A = function (d) {
                        return yScale(yValue_A(d));
                    };

                // add the graph canvas to the body of the webpage
                //var viewBoxArgs = ['0', '0', width, height];    // ['0', '0', '1152', '540'];
                var canvas = d3.select('#graph').append('svg:svg').attr('id', 'graphSVG').attr('width', width).attr('height', height); //.attr('viewBox', viewBoxArgs).attr('preserveAspectRatio', 'xMinYMid'); // xMinYMid

                d3.selection.prototype.moveToFront = function () {
                    return this.each(function () {
                        this.parentNode.appendChild(this);
                    });
                };

                d3.selection.prototype.moveToBack = function () {
                    return this.each(function () {
                        var firstChild = this.parentNode.firstChild;
                        if (firstChild) {
                            this.parentNode.insertBefore(this, firstChild);
                        }
                    });
                };

                var getCorrelatePair = function (d) {
                    // console.log(d);

                    var currentHash;
                    if (d instanceof Object) {
                        currentHash = d.dataSource;
                    } else {
                        currentHash = d;
                    }
                    // console.log(currentHash);

                    var originalNode = d3.selectAll('.dot-O').filter(function (d) {
                        return d.dataSource == currentHash;
                    });
                    var modifiedNode = d3.selectAll('.dot-M').filter(function (d) {
                        return d.dataSource == currentHash;
                    });
                    correlateRuns = [originalNode, modifiedNode];
                    // console.log(correlateRuns[0][0][0]);
                    // console.log(d3.select(correlateRuns[0][0][0]));

                    // graphInteractionStart(d);
                    graphInteractionStart(correlateRuns);
                };

                var graphInteractionStart = function (data) {
                    decorateSiblings(data);    // PubSub
                    // getCorrelatePair(d);
                    highlightPairs();
                    displayTooltip(data);
                    showData(data);
                };

                var graphInteractionStop = function (data) {
                    clearSiblings(data);       // PubSub
                    // var currentNode = d3.select(this);
                    unhighlightPairs();
                    hideTooltip();
                    clearData();
                };

                // PUB SUB.
                var decorateSiblings = function (d) {
                    $scope.$emit('currentGraphTarget', d);
                };
                var clearSiblings = function (d) {
                    $scope.$emit('clearGraphTarget', d);
                };

                var highlightPairs = function () {
                    // console.log(d3.select(correlateRuns[0][0][0]).attr('cx'), d3.select(correlateRuns[0][0][0]).attr('cy'));
                    var originalLabelPosX = d3.select(correlateRuns[0][0][0]).attr('cx');
                    var originalLabelPosY = d3.select(correlateRuns[0][0][0]).attr('cy');

                    correlateRuns[0].moveToFront();
                    correlateRuns[1].moveToFront();

                    correlateRuns[0].attr('r', dotActiveRadius).style({
                            'stroke-width': dotActiveStrokeWidth,
                            'stroke': dotActiveStrokeColor,
                            'fill': dotColorActive
                        })
                        .append('text', 'O')
                        .attr('font-size', '3em')
                        .attr('color', correlateRunsTextColor)
                        .attr('x', 200 + 'px') //originalLabelPosX
                        .attr('y', 50 + 'px'); //originalLabelPosY

                    correlateRuns[1].attr('r', dotActiveRadius).style({
                        'stroke-width': dotActiveStrokeWidth,
                        'stroke': dotActiveStrokeColor,
                        'fill': dotColorActive
                    });
                };

                var unhighlightPairs = function () {
                    correlateRuns[0].moveToBack();
                    correlateRuns[1].moveToBack();
                    correlateRuns[0].attr('r', dotRadius).style({
                        'stroke-width': dotStrokeWidth,
                        'stroke': dotActiveStrokeColor,
                        'fill': dotColorOriginal
                    });
                    correlateRuns[1].attr('r', dotRadius).style({
                        'stroke-width': dotStrokeWidth,
                        'stroke': dotActiveStrokeColor,
                        'fill': dotColorModified
                    });
                    correlateRuns = [];
                };

                var correlatePairLabel = function (d) {
                    var currentHash = d.dataSource;
                    var originalNode = d3.selectAll('.dot-O').filter(function (d) {
                        return d.dataSource == currentHash;
                    });
                    var modifiedNode = d3.selectAll('.dot-M').filter(function (d) {
                        return d.dataSource == currentHash;
                    });
                };

                // add the tooltip area to the webpage
                // var tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
                var tooltip = d3.select('#watermark').append('div').attr('class', 'watermark-tooltip').style('opacity', 0);

                var displayTooltip = function (d) {
                    // Tooltip
                    tooltip.transition().duration(animationDuration).style('opacity', 1);
                    tooltip.html('<div class="">'
                        + '<div class="pull-left label-total-storage"><strong>Total Storage (Both Runs):</strong></div><div class="pull-right"> ' + yValue_O(d) + ' ft</div><br/>'
                        + '<div class="pull-left label-original-run"><strong>Original Total Pumping:</strong></div><div class="pull-right"> ' + (xValue_O(d) / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>'
                        + '<div class="pull-left label-modified-run"><strong>Modified Total Pumping:</strong></div><div class="pull-right"> ' + (xValue_M(d) / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>'
                        + '<div class="pull-left label-pumping-delta"><strong>Total Pumping Delta:</strong></div><div class="pull-right"> ' + ((xValue_O(d) / cfsDenominator) - (xValue_M(d) / cfsDenominator)).toFixed(decimalLimit) + ' cfs</div><br/><br/>'
                        + '<div class="pull-left label-correlate-runs"><strong>Data Source:</strong></div><br/><div class="pull-right label-data-source"> ' + d.dataSource + '</div><br/><br/>'
                        + '<div class="zone-data"><strong>Pumping by Zones:</strong></div>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 1:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_1 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 2:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_2 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 3:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_3 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 4:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_4 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 5:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_5 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 6:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_6 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 7:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_7 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 8:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_8 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 9:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_9 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 10:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_10 + '</div><br/>'
                        + '<div class="pull-left zone-data-label"><strong>Zone 11:</strong></div><div class="pull-right zone-data-value"> ' + d.Zone_11 + '</div>'
                        + '</div>')
                        .style('right', tooltipPosX + 'px')
                        .style('top', tooltipPosY + 'px');
                        // Dynamic Positioning.
                        // .style('left', ((graphPanelWidth / tooltipPosXadjust) + (d3.event.pageX * tooltipPosXoffset)) + 'px')
                        // .style('top', ((graphPanelHeight / tooltipPosYadjust) + (d3.event.pageY * tooltipPosYoffset)) + 'px');
                };

                var hideTooltip = function () {
                    tooltip.transition().duration(animationDuration).style('opacity', 0);
                };

                var showData = function (d) {
                    // console.log(d);
                    // console.log(d[0].datum().dataSource);
                     // console.log(d[0][0][0]['__data__']['dataSource']);

                    var dataSource = d[0][0][0]['__data__']['dataSource'].toString();
                    // console.log(dataSource);

                    d3.select('#data-source').text(dataSource);
                    d3.select('#total-storage-o').text(xValue_O(d[0].datum()));
                    d3.select('#total-pumping-o').text(yValue_O(d[0].datum()));
                    d3.select('#total-storage-m').text(xValue_M(d[0].datum()));
                    d3.select('#total-pumping-m').text(yValue_M(d[0].datum()));
                    d3.select('#zone1').text(d[0].datum().Zone_1);
                    d3.select('#zone2').text(d[0].datum().Zone_2);
                    d3.select('#zone3').text(d[0].datum().Zone_3);
                    d3.select('#zone4').text(d[0].datum().Zone_4);
                    d3.select('#zone5').text(d[0].datum().Zone_5);
                    d3.select('#zone6').text(d[0].datum().Zone_6);
                    d3.select('#zone7').text(d[0].datum().Zone_7);
                    d3.select('#zone8').text(d[0].datum().Zone_8);
                    d3.select('#zone9').text(d[0].datum().Zone_9);
                    d3.select('#zone10').text(d[0].datum().Zone_10);
                    d3.select('#zone11').text(d[0].datum().Zone_11);

                    // d3.select('#data-source').text(d.dataSource);
                    // d3.select('#total-storage-o').text(xValue_O(d));
                    // d3.select('#total-pumping-o').text(yValue_O(d));
                    // d3.select('#total-storage-m').text(xValue_M(d));
                    // d3.select('#total-pumping-m').text(yValue_M(d));
                    // d3.select('#zone1').text(d.Zone_1);
                    // d3.select('#zone2').text(d.Zone_2);
                    // d3.select('#zone3').text(d.Zone_3);
                    // d3.select('#zone4').text(d.Zone_4);
                    // d3.select('#zone5').text(d.Zone_5);
                    // d3.select('#zone6').text(d.Zone_6);
                    // d3.select('#zone7').text(d.Zone_7);
                    // d3.select('#zone8').text(d.Zone_8);
                    // d3.select('#zone9').text(d.Zone_9);
                    // d3.select('#zone10').text(d.Zone_10);
                    // d3.select('#zone11').text(d.Zone_11);
                };

                var clearData = function () {
                    d3.select('#data-source').text('');
                    d3.select('#total-storage-o').text('');
                    d3.select('#total-pumping-o').text('');
                    d3.select('#total-storage-m').text('');
                    d3.select('#total-pumping-m').text('');
                    d3.select('#zone1').text('');
                    d3.select('#zone2').text('');
                    d3.select('#zone3').text('');
                    d3.select('#zone4').text('');
                    d3.select('#zone5').text('');
                    d3.select('#zone6').text('');
                    d3.select('#zone7').text('');
                    d3.select('#zone8').text('');
                    d3.select('#zone9').text('');
                    d3.select('#zone10').text('');
                    d3.select('#zone11').text('');
                };

                // load data
                // d3.csv($scope.sourceData, function (error, data) {
                d3.csv(graph_dataSource, function (error, data) {

                    // change string (from CSV) into number format
                    data.forEach(function (d) {
                        // console.log(d);
                        d.value_O = +d.value_O;
                        d.value_O_heads = +d.value_O_heads;
                        d.value_M = +d.value_M;
                        d.value_M_heads = +d.value_M_heads;
                    });

                    xScale.domain([xScaleDomain_Lower, xScaleDomain_Upper]);
                    yScale.domain([yScaleDomain_Lower, yScaleDomain_Upper]);

                    // x-axis
                    canvas.append('g')
                        .attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + (height - 30) + ')')
                        .call(xAxis)
                        .append('text')
                        // .attr('class', 'label')
                        .attr('x', (width - 50))
                        .attr('y', -10)
                        .style('text-anchor', 'end')
                        .style('fill', '#FFC0A9')
                        .text('Total Pumping in ft3 (for entire model)')
                        .attr('class', 'x-axis-label');

                    // y-axis
                    canvas.append('g')
                        .attr('class', 'y axis')
                        .call(yAxis)
                        .append('text')
                        // .attr('class', 'label')
                        .attr('transform', 'rotate(-90)')
                        .attr('y', 16)
                        .style('text-anchor', 'end')
                        .style('fill', '#C9D787')
                        .text('Total Storage Volume in ft (monthly ave)')
                        .attr('class', 'y-axis-label');

                    // draw dots
                    canvas.selectAll('.dot_O')
                        .data(data)
                        .enter().append('circle')
                        .attr('class', 'dot-O')
                        .attr('r', dotRadius)
                        .attr('cx', xMap_O)
                        .attr('cy', yMap_O)
                        .style('fill', dotColorOriginal)
                        .style('stroke', dotStrokeColor)
                        // .on('mouseover', graphInteractionStart)
                        .on('mouseover', getCorrelatePair)
                        .on('mouseout', graphInteractionStop);

                    canvas.selectAll('.dot_M')
                        .data(data)
                        .enter().append('circle')
                        .attr('class', 'dot-M')
                        .attr('r', dotRadius)
                        .attr('cx', xMap_M)
                        .attr('cy', yMap_M)
                        .style('fill', dotColorModified)
                        .style('stroke', dotStrokeColor)
                        // .on('mouseover', graphInteractionStart)
                        .on('mouseover', getCorrelatePair)
                        .on('mouseout', graphInteractionStop);
                });

                // Load Continuum Data.
                d3.csv(aquiferContinuum_dataSource, function (error, data) {
                    // change string (from CSV) into number format
                    data.forEach(function (d) {
                        d.Graph_Value = +d.Graph_Value;
                        d.Value = +d.Value;
                    });

                    xScale.domain([xScaleDomain_Lower, xScaleDomain_Upper]);
                    yScale.domain([yScaleDomain_Lower, yScaleDomain_Upper]);

                    // threshholds.
                    var continuum = canvas.selectAll('g')
                        .data(data)
                        .enter().append('g');

                    continuum.append('svg:line')
                        .attr('class', 'aquifer-continuum')
                        .attr('x1', xMap_A)
                        .attr('y1', 0)
                        .attr('x2', xMap_A)
                        .attr('y2', (height - 30))
                        .style('stroke-width', continuumStrokeWidth)
                        .style('stroke', continuumStrokeColor);

                    continuum.append('text')
                        .attr('class', 'continuum-label')
                        .attr('x', xMap_A)
                        .attr('y', 10)
                        .attr('transform', 'translate(2,-2)')
                        .style('fill', continuumTextFill)
                        .text(function (d) {
                            return d.Description;
                        });
                });

                // Datatable events to Graph.
                $rootScope.$on('newDatatableTarget', function (event, args) {
                    // console.log('you are touching the datatable!');
                    // console.log(args);
                    getCorrelatePair(args);
                });

                $rootScope.$on('removeDatatableTarget', function (event, args) {
                    // console.log('you stopped touching the datatable!');
                    graphInteractionStop(args);
                });
            };
            drawGraph();
        };

        $scope.$on('analysisDataLoaded', function () {
            // console.log('Graph View receiving broadcast');
            $scope.updateView($scope.sourceData);
        });

        // // Datatable events to Graph.
        // $rootScope.$on('newDatatableTarget', function (event, args) {
        //     // console.log('you are touching the datatable!');
        //     console.log(args);
        //     getCorrelatePair(args);
        // });

        // $rootScope.$on('removeDatatableTarget', function (event, args) {
        //     // console.log('you stopped touching the datatable!');
        // });
}]);