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

    // WATERMARK.
    $scope.watermarkSubpanelSU = false;
    $scope.watermarkSubpanelPM = true;
    $scope.watermarkSubpanelPI = false;

    $scope.initialPosition = [49, -97];
    $scope.panOptionsInteractive = {
      'animate': true,
      'duration': 3,
      'easeLinearity': 0.25,
      'noMoveStart': 'false'
    };

    $scope.resetView = function() {
      $location.hash('.geography');
      $anchorScroll();
    };

    $scope.togglePanel = function(target) {
      $(target).toggleClass('open-panel');
    };

    $scope.toggleSlide = function(target) {
      $(target).toggleClass('open');
    };

    $scope.closeAllPanels = function() {
      if ($scope.rechargePanelVisible) {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = false;
      }
      if ($scope.wellsPanelVisible) {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = false;
      }
      if ($scope.springsPanelVisible) {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = false;
      }
      if ($scope.watermarkPanelVisible) {
        $scope.togglePanel('#data-panel-watermark');
        $scope.watermarkPanelVisible = false;
        $scope.watermarkSubpanelSU = true;
        $scope.watermarkSubpanelPM = false;
        $scope.watermarkSubpanelPI = false;
      }
    };

    $scope.closePanel = function(event) {
      console.log('closing panel.');
      $scope.closeAllPanels();
    };

    $scope.displayRechargePanel = function() {
      $scope.closeAllPanels();
      if (!$scope.rechargePanelVisible) {
        $scope.togglePanel('#data-panel-recharge');
        $scope.rechargePanelVisible = true;
      }
    };

    $scope.displayWellsPanel = function() {
      $scope.closeAllPanels();
      if (!$scope.wellsPanelVisible) {
        $scope.togglePanel('#data-panel-wells');
        $scope.wellsPanelVisible = true;
      }
    };

    $scope.displaySpringsPanel = function() {
      $scope.closeAllPanels();
      if (!$scope.springsPanelVisible) {
        $scope.togglePanel('#data-panel-springs');
        $scope.springsPanelVisible = true;
      }
    };

    $scope.displayWatermarkPanel = function() {
      $scope.closeAllPanels();
      if (!$scope.watermarkPanelVisible) {
        $scope.togglePanel('#data-panel-watermark');
        $scope.watermarkPanelVisible = true;
      }
    };

    $scope.tabSelect = function(event) {
      var targetButtonName = event.target.parentElement;
      if ($(targetButtonName).hasClass('active')) {
        // console.log('already active');
      } else {
        $scope.clearNavPills();
        $(targetButtonName).toggleClass('active');
      }
      var targetPanelName = event.target.id;
      $scope.toggleSubpanel(targetPanelName);
    };

    $scope.clearNavPills = function() {
      var element = document.getElementById('watermark-navbar');
      var subelements = element.getElementsByTagName('li');
      for (var i = 0; i < subelements.length; i++) {
        $(subelements[i]).removeClass('active');
      }
    };

    $scope.toggleSubpanel = function(target) {
      $scope.watermarkSubpanelSU = false;
      $scope.watermarkSubpanelPM = false;
      $scope.watermarkSubpanelPI = false;

      switch (target) {
        case 'nav-su':
          $scope.watermarkSubpanelSU = true;
          break;
        case 'nav-pm':
          $scope.watermarkSubpanelPM = true;
          break;
        case 'nav-pi':
          $scope.watermarkSubpanelPI = true;
          break;
        default:
          $scope.watermarkSubpanelPM = true;
          break;
      }
    };

    $scope.visualization = function() {

      var graphPanel = document.getElementById('panel-pm');
      var graphPanelWidth = graphPanel.offsetWidth;
      var graphPanelHeight = graphPanel.offsetHeight;
      // console.log(graphPanelWidth, graphPanelHeight);

      // setup scales for graph layout.
      var graphWidthScale = .65;
      var graphHeightScale = .85;
      var width = graphPanelWidth * graphWidthScale;
      var height = graphPanelHeight * graphHeightScale;

      // console.log('graph dimensions are: ' + width, height);

      // data sources.
      var graph_dataSource = '../../../../data/Watermark_Master_Total_Wells_Heads_Zones_optimized.csv';
      var aquiferContinuum_dataSource = '../../../../data/AquiferYield_ContinuumData_BartonSprings.csv';
      //var stakeholder_dataSource = './data/watermark/stakeholders.csv';
      var bsgam_kzones = '../../../../data/geojson/BSGAMKZ.geo.json';
      var bsgam_kzones_merged = '../../../../data/geojson/BSGAMKZones.merged.WGS84.lco15.geo.json';

      // MODULE private methods.
      function drawGraph() {

        var dotRadius = 2;
        var dotStrokeWidth = 1;
        var dotStrokeColor = '#111'; // 333F48
        var dotColorOriginal = '#CD6AD4';
        var dotColorModified = '#8AE5F2';
        // var dotStakeholderRadius = 8;
        // var dotColorStakeholder = '#F2A900'; //43695B
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
        var tooltipPosX = width * 1.12;
        var tooltipPosY = height * 1.3;
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
        var xValue_O = function(d) {
            return d.value_O;
          }, // data -> value
          xMap_O = function(d) {
            return xScale(xValue_O(d));
          }; // data -> display

        // setup y original
        var yValue_O = function(d) {
            return d.value_O_heads;
          },
          yMap_O = function(d) {
            return yScale(yValue_O(d));
          };

        // setup x modified
        var xValue_M = function(d) {
            return d.value_M;
          },
          xMap_M = function(d) {
            return xScale(xValue_M(d));
          };

        // setup y modified
        var yValue_M = function(d) {
            return d.value_O_heads;
          },
          yMap_M = function(d) {
            return yScale(yValue_M(d));
          };

        // setup x stakeholder
        var xValue_S = function(d) {
            return d.Total_Pumping_Volume;
          },
          xMap_S = function(d) {
            return xScale(xValue_S(d));
          };

        // setup y stakeholder
        var yValue_S = function(d) {
            return d.Average_Total_Storage;
          },
          yMap_S = function(d) {
            return yScale(yValue_S(d));
          };

        // setup x aquifer-continuum
        var xValue_A = function(d) {
            return d.Graph_Value;
          },
          xMap_A = function(d) {
            return xScale(xValue_A(d));
          };

        // setup y aquifer-continuum
        var yValue_A = function(d) {
            return d.Value;
          },
          yMap_A = function(d) {
            return yScale(yValue_A(d));
          };

        // add the graph canvas to the body of the webpage
        //var viewBoxArgs = ['0', '0', width, height];    // ['0', '0', '1152', '540'];
        var canvas = d3.select('#graph').append('svg:svg').attr('id', 'graphSVG').attr('width', width).attr('height', height); //.attr('viewBox', viewBoxArgs).attr('preserveAspectRatio', 'xMinYMid'); // xMinYMid

        d3.selection.prototype.moveToFront = function() {
          return this.each(function() {
            this.parentNode.appendChild(this);
          });
        };

        d3.selection.prototype.moveToBack = function() {
          return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
              this.parentNode.insertBefore(this, firstChild);
            }
          });
        };

        var showData = function(d) {
          d3.select('#data-source').text(d.dataSource);
          d3.select('#total-storage-o').text(xValue_O(d));
          d3.select('#total-pumping-o').text(yValue_O(d));
          d3.select('#total-storage-m').text(xValue_M(d));
          d3.select('#total-pumping-m').text(yValue_M(d));
          d3.select('#zone1').text(d.Zone_1);
          d3.select('#zone2').text(d.Zone_2);
          d3.select('#zone3').text(d.Zone_3);
          d3.select('#zone4').text(d.Zone_4);
          d3.select('#zone5').text(d.Zone_5);
          d3.select('#zone6').text(d.Zone_6);
          d3.select('#zone7').text(d.Zone_7);
          d3.select('#zone8').text(d.Zone_8);
          d3.select('#zone9').text(d.Zone_9);
          d3.select('#zone10').text(d.Zone_10);
          d3.select('#zone11').text(d.Zone_11);
        };

        var clearData = function() {
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

        // add the tooltip area to the webpage
        var tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

        var displayTooltip = function(d) {
          tooltip.transition().duration(350).style('opacity', 1.0);
          tooltip.html('<p>'
              // + '<div class="pull-left label-correlate-runs"><strong>Correlate Run Values</strong></div><br/><br/>'
              + '<div class="pull-left label-total-storage"><strong>Total Storage (Both Runs):</strong></div><div class="pull-right"> ' + yValue_O(d) + ' ft</div><br/>'
              // + '<div class="pull-left label-original-run"><strong>Original Run Values</strong></div><br/>'
              + '<div class="pull-left label-original-run"><strong>Original Total Pumping:</strong></div><div class="pull-right"> ' + (xValue_O(d) / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>'
              // + '<div class="pull-left"><strong>Total Storage:</strong></div><div class="pull-right"> ' + yValue_O(d) + ' feet</div><br/><br/>'
              // + '<div class="pull-left label-modified-run"><strong>Modified Run Values</strong></div><br/>'
              + '<div class="pull-left label-modified-run"><strong>Modified Total Pumping:</strong></div><div class="pull-right"> ' + (xValue_M(d) / cfsDenominator).toFixed(decimalLimit) + ' cfs</div><br/>'
              // + '<div class="pull-left"><strong>Total Storage:</strong></div><div class="pull-right"> ' + yValue_M(d) + ' feet</div><br/><br/>'
              + '<div class="pull-left label-pumping-delta"><strong>Total Pumping Delta:</strong></div><div class="pull-right"> ' + ((xValue_O(d) / cfsDenominator) - (xValue_M(d) / cfsDenominator)).toFixed(decimalLimit) + ' cfs</div><br/>' + '<div class="pull-left label-correlate-runs"><strong>Data Source:</strong></div><br/><div class="pull-right label-data-source"> ' + d.dataSource + '</p>')
            // + '<br/><strong>Pumping by Zones</strong>'
            // + '<ul><li><strong>Zone 1:</strong> ' + d.Zone_1
            // + '</li><li><strong>Zone 2:</strong> ' + d.Zone_2
            // + '</li><li><strong>Zone 3:</strong> ' + d.Zone_3
            // + '</li><li><strong>Zone 4:</strong> ' + d.Zone_4
            // + '</li><li><strong>Zone 5:</strong> ' + d.Zone_5
            // + '</li><li><strong>Zone 6:</strong> ' + d.Zone_6
            // + '</li><li><strong>Zone 7:</strong> ' + d.Zone_7
            // + '</li><li><strong>Zone 8:</strong> ' + d.Zone_8
            // + '</li><li><strong>Zone 9:</strong> ' + d.Zone_9
            // + '</li><li><strong>Zone 10:</strong> ' + d.Zone_10
            // + '</li><li><strong>Zone 11:</strong> ' + d.Zone_11
            // + '</li></ul></p>')
            // Static Positioning.
            .style('left', tooltipPosX + 'px')
            .style('top', tooltipPosY + 'px');
          // Dynamic Positioning.
          // .style('left', ((graphPanelWidth / tooltipPosXadjust) + (d3.event.pageX * tooltipPosXoffset)) + 'px')
          // .style('top', ((graphPanelHeight / tooltipPosYadjust) + (d3.event.pageY * tooltipPosYoffset)) + 'px');
        };

        var hideTooltip = function() {
          tooltip.transition().duration(350).style('opacity', 0);
          // tooltip.style('opacity', 0);
        };

        var getCorrelatePair = function(d) {
          var currentHash = d.dataSource;
          var originalNode = d3.selectAll('.dot-O').filter(function(d) {
            return d.dataSource == currentHash;
          });
          var modifiedNode = d3.selectAll('.dot-M').filter(function(d) {
            return d.dataSource == currentHash;
          });
          correlateRuns = [originalNode, modifiedNode];
          encodeZones(d);
        };

        var highlightPairs = function() {
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

        var unhighlightPairs = function() {
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
          decodeZones();
        };

        var correlatePairLabel = function(d) {
          var currentHash = d.dataSource;
          var originalNode = d3.selectAll('.dot-O').filter(function(d) {
            return d.dataSource == currentHash;
          });
          var modifiedNode = d3.selectAll('.dot-M').filter(function(d) {
            return d.dataSource == currentHash;
          });
        };

        var encodeZones = function(d) {
          var target = d;
          // console.log(d);
          //console.log(d.Zone_1,d.Zone_2,d.Zone_3,d.Zone_4,d.Zone_5,d.Zone_6,d.Zone_7,d.Zone_8,d.Zone_9,d.Zone_10,d.Zone_11);

          // Define colors for pumping scalars.
          var pumpingScalarColors = d3.scale.category20();

          // WORKS.
          $('.zone-1')[0].style.fill = pumpingScalarColors(d.Zone_1);
          $('.zone-2')[0].style.fill = pumpingScalarColors(d.Zone_2);
          $('.zone-3')[0].style.fill = pumpingScalarColors(d.Zone_3);
          $('.zone-4')[0].style.fill = pumpingScalarColors(d.Zone_4);
          $('.zone-5')[0].style.fill = pumpingScalarColors(d.Zone_5);
          $('.zone-6')[0].style.fill = pumpingScalarColors(d.Zone_6);
          $('.zone-7')[0].style.fill = pumpingScalarColors(d.Zone_7);
          $('.zone-8')[0].style.fill = pumpingScalarColors(d.Zone_8);
          $('.zone-9')[0].style.fill = pumpingScalarColors(d.Zone_9);
          $('.zone-10')[0].style.fill = pumpingScalarColors(d.Zone_10);
          $('.zone-11')[0].style.fill = pumpingScalarColors(d.Zone_11);
        };

        var decodeZones = function() {
          console.log('set them back.');
        };

        // add the stakeholder info area to the webpage
        // var stakeholder = d3.select('body').append('div')
        //     .attr('class', 'stakeholder-info')
        //     .style('opacity', 0);

        // var displayStakeholderInfo = function(d) {
        //     stakeholder.style('opacity', 1.0);
        //     stakeholder.html('<p>' + '<div class="pull-left"><strong>Stakeholder Information</strong></div><br/><br/>' + '<div class="pull-left"><strong>Stakeholder_Values:</strong></div><div class="pull-right"> ' + d.Stakeholder_Values + '</div><br/>' + '<div class="pull-left"><strong>Average_Total_Storage:</strong></div><div class="pull-right"> ' + d.Average_Total_Storage + ' in ft3</div><br/>' + '<div class="pull-left"><strong>Minimum_Spring_Flow:</strong></div><div class="pull-right"> ' + d.Minimum_Spring_Flow + ' in feet (monthly average)</div><br/>' + '<div class="pull-left"><strong>Total_Pumping_Volume:</strong></div><div class="pull-right"> ' + d.Total_Pumping_Volume + ' in ft3</div><br/>' + '</p>')
        //         .style('left', ((window.innerWidth / 5) + (d3.event.pageX * 0.35)) + 'px')
        //         .style('top', ((window.innerHeight / 20) + (d3.event.pageY * 0.25)) + 'px')
        // };

        // var hideStakeholderInfo = function() {
        //     stakeholder.style('opacity', 0);
        // };

        // load data
        d3.csv(graph_dataSource, function(error, data) {

          // change string (from CSV) into number format
          data.forEach(function(d) {
            // console.log(d);
            d.value_O = +d.value_O;
            d.value_O_heads = +d.value_O_heads;
            d.value_M = +d.value_M;
            d.value_M_heads = +d.value_M_heads;
          });

          // console.log('=========================');
          // console.log(data);

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
            .on('mouseover', function(d) {
              getCorrelatePair(d);
              highlightPairs();
              displayTooltip(d);
              showData(d);
            })
            .on('mouseout', function(d) {
              var currentNode = d3.select(this);
              unhighlightPairs();
              hideTooltip();
              clearData();
            });

          canvas.selectAll('.dot_M')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot-M')
            .attr('r', dotRadius)
            .attr('cx', xMap_M)
            .attr('cy', yMap_M)
            .style('fill', dotColorModified)
            .style('stroke', dotStrokeColor)
            .on('mouseover', function(d) {
              getCorrelatePair(d);
              highlightPairs();
              displayTooltip(d);
              showData(d);
            })
            .on('mouseout', function(d) {
              var currentNode = d3.select(this);
              unhighlightPairs();
              hideTooltip();
              clearData();
            });
        });

        // Load Continuum Data.
        d3.csv(aquiferContinuum_dataSource, function(error, data) {
          // change string (from CSV) into number format
          data.forEach(function(d) {
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
            .text(function(d) {
              return d.Description;
            });
        });

        // Load Stakeholder Data.
        // d3.csv(stakeholder_dataSource, function(error, data) {
        //     // change string (from CSV) into number format
        //     data.forEach(function(d) {
        //         // console.log(d);
        //         d.Average_Total_Storage = +d.Average_Total_Storage;
        //         d.Minimum_Spring_Flow = +d.Minimum_Spring_Flow;
        //         d.Total_Pumping_Volume = +d.Total_Pumping_Volume;
        //     });

        //     xScale.domain([xScaleDomain_Lower, xScaleDomain_Upper]);
        //     yScale.domain([yScaleDomain_Lower, yScaleDomain_Upper]);

        //     canvas.selectAll('.dot_S')
        //         .data(data)
        //         .enter().append('circle')
        //         .attr('class', 'dot-S')
        //         .attr('r', dotStakeholderRadius)
        //         .attr('cx', xMap_S)
        //         .attr('cy', yMap_S)
        //         .style('fill', dotColorStakeholder)
        //         .style('stroke', dotStrokeColor)
        //         .on('mouseover', function(d) {
        //             d3.select(this).moveToFront();
        //             // console.log(d.Stakeholder_Values);
        //             displayStakeholderInfo(d);
        //         })
        //         .on('mouseout', function(d) {
        //             d3.select(this).moveToBack();
        //             hideStakeholderInfo();
        //         });
        // });

        // Configure Map.
        var mapwidth = width * 0.48;
        var mapheight = height * 0.96;
        var colors = d3.scale.category20c();

        // // Build Map.
        var kzones_svg = d3.select('#kzones').append('svg').attr('id', 'mapSVG').attr('width', mapwidth).attr('height', mapheight); // #kzones (panel-pm), #geotest (panel-su)

        d3.json(bsgam_kzones_merged, function(json) {

          // 1. Create a projection and d3.geo.path
          // 2. Calculate the bounds of the current projection
          // 3. Use these bounds to calculate the scale and translation
          // 4. Recreate the projection

          // create a first guess for the projection
          var center = d3.geo.centroid(json)
          var scale = 120;
          var offset = [width / 2, height / 2];
          var projection = d3.geo.mercator().scale(scale).center(center).translate(offset);

          // create the path
          var path = d3.geo.path().projection(projection);

          // using the path determine the bounds of the current map and use
          // these to determine better values for the scale and translation
          var bounds = path.bounds(json);
          var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
          var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
          //var scale   = (hscale < vscale) ? hscale : vscale; // 82944.55625683897
          var scale = 60000;

          var w_off = 1.3; //2
          var h_off = 1.65; //2
          var offset = [width - (bounds[0][0] + bounds[1][0]) / w_off, height - (bounds[0][1] + bounds[1][1]) / h_off];
          // new projection
          projection = d3.geo.mercator().center(center).scale(scale).translate(offset);
          path = path.projection(projection);

          kzones_svg.selectAll("path").data(json.features).enter().append("path").attr("d", path)
            .attr('class', function(d) {
              var zoneClass = 'zone-' + d.properties.Kzone;
              return zoneClass;
            })
            .style('fill', function(d, i) {
              return colors(d.properties.Kzone);
              // return '#555';
            })
            // .style('opacity','0.3')
            .on('mouseover', function(d, i) {
              console.log(d);
              // console.log(d.HydroID);
              // console.log(d.properties.Kzone);
            });
        });
      };

      drawGraph();
    };

    $scope.visualization();
  }
]);
