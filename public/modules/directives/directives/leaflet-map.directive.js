(function() {
  'use strict';

  angular
    .module('mcsdss.directives') // core
    .directive('leafletMap', LeafletMap);

  LeafletMap.$inject = ['$rootScope'];

  function LeafletMap($rootScope) {

    var directiveDefinitionObject = {
      compile: false,
      controller: false,
      controllerAs: false,
      link: false,
      priority: 0,
      require: false,
      restrict: 'E',
      scope: {},
      template: false,
      templateUrl: false,
      terminal: false,
      transclude: false,
      type: false
    };

    directiveDefinitionObject.link = function postLink(scope, element) {

      // Base Tile Layers.
      // These are hard coded into the directive and will remain sttaic unless new baseTile layers are needed.
      var mqLink = '<a href="http://www.mapquest.com/">MapQuest</a>';
      var mqPic = '<img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
      var mqArialUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg';
      var mqosmUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';
      var mqArialAttrib = 'Tiles courtesy of ' + mqLink + mqPic;
      var mqosmAttrib = 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. Tiles courtesy of ' + mqLink + mqPic;
      var mqArialMap = L.tileLayer(mqArialUrl, {
        attribution: mqArialAttrib,
        subdomains: '1234'
      });
      var mqosmMap = L.tileLayer(mqosmUrl, {
        attribution: mqosmAttrib,
        subdomains: '1234'
      });

      var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib = '&copy; ' + osmLink + ' Contributors';
      var osmMap = L.tileLayer(osmUrl, {
        attribution: osmAttrib
      });

      var osmBwLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      var osmBwUrl = 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
      var osmBwAttrib = '&copy; ' + osmBwLink + ' Contributors';
      var osmBwMap = L.tileLayer(osmBwUrl, {
        attribution: osmBwAttrib
      });

      var thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
      var thunLandscapeUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
      var thunOutdoorsUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
      var thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;
      var thunLandscapeMap = L.tileLayer(thunLandscapeUrl, {
        attribution: thunAttrib
      });
      var thunOutdoorsMap = L.tileLayer(thunOutdoorsUrl, {
        attribution: thunAttrib
      });

      var stamenLink = '<a href="http://stamen.com">Stamen Design</a>';
      var stamenUrl = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
      var stamenAttrib = '&copy; ' + mqLink + ' Contributors & ' + stamenLink;
      var stamenMap = L.tileLayer(stamenUrl, {
        attribution: stamenAttrib
      });

      var esriLink = '<a href="http://www.esri.com/">Esri</a>';
      var esriWhoLink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
      var esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      var esriAttrib = '&copy; ' + esriLink + ', ' + esriWhoLink;
      var esriMap = L.tileLayer(esriUrl, {
        attribution: esriAttrib
      });

      // Colors.
      var color_black = '#000000';
      var color_grey = '#4D4B5B';
      var color_white = '#FFFFFF';
      var color_brown = '#C9985B';
      var color_purple = '#91278D';
      var color_blue = '#539CBE';
      var color_green = '#018752';
      var color_lime = '#C9FA58';
      var color_yellow = '#F9E555';
      var color_gold = '#FAA635';
      var color_orange = '#F2572A';
      var color_red = '#D21245';

      // EAA Colors
      var color_eaa_Blue = '#425968';
      var color_eaa_Orange = '#AB650D';
      var color_eaa_Gold = '#8F8100';
      var color_eaa_Tan = '#E6D395';
      var color_eaa_Stone = '#8E8C7A';
      var color_eaa_Lake = '#71B2C9';
      var color_eaa_Amber = '#C6930A';
      var color_eaa_Orange = '#D15B05';
      var color_eaa_Brown = '#6D4F47';
      var color_eaa_Melon = '#AADD6D';
      var color_eaa_Teal = '#00B28C';
      var color_eaa_Sky = '#4298B5';

      // Styles for geojson layers.

      var weight = 1.0;
      var opacity = 1.0;
      var fillOpacity = 0.6;
      var fillOpacityHover = 0.8;

      var baseStyle = {
        'clickable': true,
        'color': color_black,
        'fillColor': color_grey,
        'weight': weight,
        'opacity': opacity,
        'fillOpacity': fillOpacity
      };
      var baseStyleHover = {
        'fillOpacity': fillOpacityHover
      };

      // var usaStyle = { 'fillColor': color_eaa_Blue };
      var usaStyle = {};
      var usaStyleHover = {};

      // var texasStyle = {'fillColor': color_eaa_Orange, 'fillOpacity': 0.0, 'color': color_eaa_Orange, 'weight': '3px'};
      // var texasStyleHover = { 'fillOpacity': 0.0 };
      var texasStyle = {
        'fillColor': color_eaa_Orange
      };
      var texasStyleHover = {};

      // var majorAquiferStyle = { 'fillColor': color_eaa_Lake };
      var majorAquiferStyle = {};
      var majorAquiferStyleHover = {};

      // var eaaBoundaryZonesStyle = { 'fillColor': color_eaa_Gold };
      var eaaBoundaryZonesStyle = {};
      var eaaBoundaryZonesStyleHover = {};

      // var aquiferZonesStyle = { 'fillColor': color_eaa_Melon };
      var aquiferZonesStyle = {};
      var aquiferZonesStyleHover = {};

      var bsgamZonesStyle = {};
      var bsgamZonesStyleHover = {};

      var bsgamZonesMergedStyle = {};
      var bsgamZonesMergedStyleHover = {};

      // Geojson to display.
      var usaGeojson = './data/geojson/USA.geo.json';
      var texasGeojson = './data/geojson/TX.geo.json';
      var majorAquifersGeojson = './data/geojson/NEW_major_aquifers_dd_reduced100.geo.json';
      var eaaBoundaryZonesGeojson = './data/geojson/eaa_boundary_EPSG-3081.geo.json';
      var aquiferZonesGeojson = './data/geojson/eaa-aquifer-zones-2014.geo.json';
      var bsgam_kzonesGeojson = './data/geojson/BSGAMKZ.geo.json';
      var bsgam_kzones_mergedGeojson = './data/geojson/BSGAMKZones.merged.WGS84.lco15.geo.json';

      // GeoJSON Layers.
      var usaLayer = new L.LayerGroup();
      var texasLayer = new L.LayerGroup();
      var majorAquifersLayer = new L.LayerGroup();
      var aquiferZonesLayer = new L.LayerGroup();
      var eaaBoundaryLayer = new L.LayerGroup();
      var bsgam_kzonesLayer = new L.LayerGroup();
      var bsgam_kzones_mergedLayer = new L.LayerGroup();

      // Marker Layers.
      // Look into using the MarkerClusterGroup.
      var allMarkersLayer = new L.LayerGroup();

      // Merges two objects. Note: Earlier objects override later objects.
      var mergeObjects = function() {
        var o = {};
        for (var i = arguments.length - 1; i >= 0; i--) {
          var s = arguments[i];
          for (var k in s) {
            o[k] = s[k];
          }
        }
        return o;
      };

      // Geojson interaction.
      var geojsonHandler = function(feature, layer, style, styleHover) {
        if (feature.properties) {
          // console.log(feature.properties);
          var popupString = '<div class="popup">';
          var layerClassName = {};
          for (var k in feature.properties) {
            var v = feature.properties[k];
            popupString += k + ': ' + v + '<br />';
            layerClassName = k + '-' + v;
          }
          popupString += '</div>';
          layer.bindPopup(popupString);
          layer.setStyle({
            'className': layerClassName
          });
        }

        if (!(layer instanceof L.Point)) {
          layer.on('mouseover', function() {
            var thisStyleHover = mergeObjects(styleHover, baseStyleHover);
            layer.setStyle(thisStyleHover);
          });
          layer.on('mouseout', function() {
            var thisStyle = mergeObjects(style, baseStyle);
            layer.setStyle(thisStyle);
          });
        }
      };

      // Load geojson.
      var processGeojson = function(data, layerGroup, layerStyle, layerStyleHover) {
        var geojson = L.geoJson(data, {
          style: function(feature, layer) {
            var thisStyle = mergeObjects(layerStyle, baseStyle);
            return thisStyle;
          },
          onEachFeature: function(feature, layer) {
            // console.log(feature);
            geojsonHandler(feature, layer, layerStyle, layerStyleHover);
          }
        });
        geojson.addTo(layerGroup);
      };

      $.getJSON(usaGeojson, function(data) {
        processGeojson(data, usaLayer, usaStyle, usaStyleHover);
      });

      $.getJSON(texasGeojson, function(data) {
        processGeojson(data, texasLayer, texasStyle, texasStyleHover);
      });

      $.getJSON(majorAquifersGeojson, function(data) {
        processGeojson(data, majorAquifersLayer, majorAquiferStyle, majorAquiferStyleHover);
      });

      $.getJSON(aquiferZonesGeojson, function(data) {
        processGeojson(data, aquiferZonesLayer, aquiferZonesStyle, aquiferZonesStyleHover);
      });

      $.getJSON(eaaBoundaryZonesGeojson, function(data) {
        var geojson = L.geoJson(data, {
          style: function(feature, layer) {
            var thisStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
            return thisStyle;
          },
          onEachFeature: function(feature, layer) {
            var popupString = '<div class="popup">Edwards Aquifer Association Boundary Zone</div>';
            layer.bindPopup(popupString);

            if (!(layer instanceof L.Point)) {
              layer.on('mouseover', function() {
                var eaaStyleHover = mergeObjects(eaaBoundaryZonesStyleHover, baseStyleHover);
                layer.setStyle(eaaStyleHover);
              });
              layer.on('mouseout', function() {
                var eaaStyle = mergeObjects(eaaBoundaryZonesStyle, baseStyle);
                layer.setStyle(eaaStyle);
              });
            }
          }
        });
        geojson.addTo(eaaBoundaryLayer);
      });

      $.getJSON(bsgam_kzonesGeojson, function(data) {
        processGeojson(data, bsgam_kzonesLayer, bsgamZonesStyle, bsgamZonesStyleHover);
      });

      $.getJSON(bsgam_kzones_mergedGeojson, function(data) {
        processGeojson(data, bsgam_kzones_mergedLayer, bsgamZonesMergedStyle, bsgamZonesMergedStyleHover);
      });

      var getColor = function(d) {
        return d >= 2.0 ? '#400026' :
          d > 1.8 ? '#800026' :
          d > 1.6 ? '#BD0026' :
          d > 1.4 ? '#E31A1C' :
          d > 1.2 ? '#FC4E2A' :
          d > 1.0 ? '#FD8D3C' :
          d > 0.8 ? '#FEB24C' :
          d > 0.6 ? '#FED976' :
          d > 0.4 ? '#FFEDA0' :
          d > 0.2 ? '#FFFEBA' :
          '#FFFFFF';
      };

      var encodeZones = function(d) {
        // console.log(d);
        // console.log(d.Zone_1,d.Zone_2,d.Zone_3,d.Zone_4,d.Zone_5,d.Zone_6,d.Zone_7,d.Zone_8,d.Zone_9,d.Zone_10,d.Zone_11);

        // Define colors for pumping scalars.
        // var pumpingScalarColors = d3.scale.category20();
        //
        // Styles require a map object with corresponding zones to color code.
        // $('.Kzone-1')[0].style.fill = pumpingScalarColors(d.Zone_1);
        // $('.Kzone-2')[0].style.fill = pumpingScalarColors(d.Zone_2);
        // $('.Kzone-3')[0].style.fill = pumpingScalarColors(d.Zone_3);
        // $('.Kzone-4')[0].style.fill = pumpingScalarColors(d.Zone_4);
        // $('.Kzone-5')[0].style.fill = pumpingScalarColors(d.Zone_5);
        // $('.Kzone-6')[0].style.fill = pumpingScalarColors(d.Zone_6);
        // $('.Kzone-7')[0].style.fill = pumpingScalarColors(d.Zone_7);
        // $('.Kzone-8')[0].style.fill = pumpingScalarColors(d.Zone_8);
        // $('.Kzone-9')[0].style.fill = pumpingScalarColors(d.Zone_9);
        // $('.Kzone-10')[0].style.fill = pumpingScalarColors(d.Zone_10);
        // $('.Kzone-11')[0].style.fill = pumpingScalarColors(d.Zone_11);

        // console.log(d[0][0][0]['__data__']);
        // console.log(d[0][0][0]['__data__']['dataSource']);
        // console.log(d[0][0][0]['__data__']['Zone_1']);

        $('.Kzone-1')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_1']);
        $('.Kzone-2')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_2']);
        $('.Kzone-3')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_3']);
        $('.Kzone-4')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_4']);
        $('.Kzone-5')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_5']);
        $('.Kzone-6')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_6']);
        $('.Kzone-7')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_7']);
        $('.Kzone-8')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_8']);
        $('.Kzone-9')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_9']);
        $('.Kzone-10')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_10']);
        $('.Kzone-11')[0].style.fill = getColor(d[0][0][0]['__data__']['Zone_11']);
      };

      var decodeZones = function() {
        // console.log('zones decoded.');
        $('.Kzone-1')[0].style.fill = color_grey;
        $('.Kzone-2')[0].style.fill = color_grey;
        $('.Kzone-3')[0].style.fill = color_grey;
        $('.Kzone-4')[0].style.fill = color_grey;
        $('.Kzone-5')[0].style.fill = color_grey;
        $('.Kzone-6')[0].style.fill = color_grey;
        $('.Kzone-7')[0].style.fill = color_grey;
        $('.Kzone-8')[0].style.fill = color_grey;
        $('.Kzone-9')[0].style.fill = color_grey;
        $('.Kzone-10')[0].style.fill = color_grey;
        $('.Kzone-11')[0].style.fill = color_grey;
      };

      // Populate Map Controls.
      var baseLayers = {
        'MapQuest Open Arial': mqArialMap,
        'MapQuest-OSM': mqosmMap,
        'Open Street Map': osmMap,
        // 'Open Street Map (Black and White)': osmBwMap,   // Not performant.
        'ESRI World Imagery': esriMap,
        'Thunderforest Landscape': thunLandscapeMap,
        'Thunderforest Outdoors': thunOutdoorsMap,
        'Stamen Watercolor': stamenMap
      };

      var overlays = {
        // 'EAA Monitoring Stations': allMarkersLayer,
        // 'USA': usaLayer,
        // 'Texas': texasLayer,
        'Major Aquifers': majorAquifersLayer,
        'Aquifer Zones': aquiferZonesLayer,
        // 'EAA Boundary Zone': eaaBoundaryLayer,
        'bsgam kzones': bsgam_kzonesLayer,
        'bsgam kzones merged': bsgam_kzones_mergedLayer
      };

      // Map Panning/Zooming.

      var zoomOptions = {
        'animate': 'true'
      };
      var panOptions = {
        'animate': true,
        'duration': 5,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var zoomPanOptions = {
        'reset': false,
        'pan': panOptions,
        'zoom': zoomOptions,
        'animate': 'true'
      };
      var fitBoundsOptions = {
        'paddingTopLeft': [0, 0],
        'paddingBottomRight': [0, 0],
        'maxZoom': 16
      };
      var panOptionsInitial = {
        'animate': true,
        'duration': 3,
        'easeLinearity': 0.50,
        'noMoveStart': 'false'
      };
      var panOptionsInteractive = {
        'animate': true,
        'duration': 2,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var panOptionsMarkers = {
        'animate': true,
        'duration': 3,
        'easeLinearity': 0.25,
        'noMoveStart': 'false'
      };
      var panByPoint = new L.Point(-350, 0);

      // Build Map.

      // Map config inputs.
      // var targetPosition = [30, -99];
      // var initialZoom = 6;
      var targetPosition = [30.15, -97.85];
      var initialZoom = 11;
      // Derive map config.
      var offsetConstant = 10; //100;
      var baseOffset = offsetConstant / initialZoom;
      var initialPanLatOffset = targetPosition[0]; // + baseOffset;
      var initialPanLonOffset = targetPosition[1] - baseOffset;
      var initialPosition = [initialPanLatOffset, initialPanLonOffset];

      var map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        inertia: false,
        keyboard: true,
        dragging: true,
        scrollWheelZoom: true,
        zoomAnimation: true,
        click: true,
        layers: [thunOutdoorsMap] // mqArialMap, only add one!
      }).setView(initialPosition, initialZoom);

      map.on('popupopen', function(centerMarker) {
        var cM = map.project(centerMarker.popup._latlng);
        cM.y -= centerMarker.popup._container.clientHeight / 2;
        var cZ = map.getZoom();
        map.setView(map.unproject(cM), cZ, {
          animate: true
        });
      });

      L.Browser.touch = true;
      L.Icon.Default.imagePath = './styles/images';

      // Map Controls.
      L.control.zoom({
        position: 'topleft'
      }).addTo(map);

      L.control.scale({
        position: 'bottomleft'
      }).addTo(map);

      L.control.layers(baseLayers, overlays, {
        position: 'topright' //'topleft'
      }).addTo(map);

      // Add layer control to a different div.
      // Has z-index issues... See: https://groups.google.com/forum/#!topic/leaflet-js/rKMZX3PKFuI
      // var layerControl = L.control.layers(baseLayers, overlays, { position: 'topright' });
      // layerControl.addTo(map);
      // layerControl._container.remove();
      // document.getElementById('map-controls-layer').appendChild(layerControl.onAdd(map));

      L.control.attribution({
        position: 'bottomright'
      }).addTo(map);

      // Append attribution to different layer.
      // Also has z-index issues, but could be positioned well enough.
      // var layerControl = L.control.attribution({ position: 'bottomright' });
      // layerControl.addTo(map);
      // layerControl._container.remove();
      // document.getElementById('map-controls-layer').appendChild(layerControl.onAdd(map));

      // Setup Initial Visible Layers.
      // texasLayer.addTo(map);
      // eaaBoundaryLayer.addTo(map);
      // allMarkersLayer.addTo(map);
      // bsgam_kzonesLayer.addTo(map);
      bsgam_kzones_mergedLayer.addTo(map);

      // Trigger Initial Animation.
      map.panTo(targetPosition, panOptionsInitial);

      // console.log(map._layers);
      // console.log(map.getPanes());

      // Graph events to Map.
      $rootScope.$on('addMapTarget', function(event, args) {
        // console.log('you are touching the graph!');
        // console.log(args);
        if (map.hasLayer(bsgam_kzones_mergedLayer)) {
          encodeZones(args);
        } // else { /* no kzone layer */ }
      });

      $rootScope.$on('removeMapTarget', function(event, args) {
        // console.log('you stopped touching the graph!');
        if (map.hasLayer(bsgam_kzones_mergedLayer)) {
          decodeZones();
        } // else { /* no kzone layer */ }
      });
    };

    return directiveDefinitionObject;
  }
})();