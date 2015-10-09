var React = require('react/addons');
var L = require('leaflet');

var branch = require('baobab-react/mixins').branch;
require('./map.css');


var poly_list=[];
var old_polygon;

var _Map = React.createClass({
	mixins: [branch],
	
	createMap: function(element, e){
		var map = L.map(element, {
			center: [40,-87],
			zoom: 5
			});

		var tiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      			attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    		}).addTo(map);

		
		//map.on('click', this.updateMap(e));
		var onClickMap = function onClickMap(e){
		console.log("old poly");
                console.log(poly_list);
                var marker = new L.marker(e.latlng, {dragable:'true'}).addTo(map);
                poly_list.push([e.latlng.lat, e.latlng.lng]);

                console.log("new polygon coordinates");
                console.log(poly_list);

                if(old_polygon != undefined){ 
                        console.log(old_polygon);
                }
                else{
                        console.log("old_polygon is undefined");
                }

                if(old_polygon != undefined){
                        map.removeLayer(old_polygon);
                }

                var my_polygon = L.polygon(poly_list)
                my_polygon.addTo(map);

                old_polygon = my_polygon;
                //console.log("polygon");
                //console.log(polygon); 
		
		marker.on('dragend', function(event){
                        var marker = event.target;
                        var position = marker.getLatLng();
                        marker.setLatLng([position], {draggable:'true'}).bindPopup(position.update());
                });
                map.addLayer(marker);
                var polygon_layer = map.addLayer(my_polygon);

		};

		map.on('click', onClickMap);
    		return map;
	},

	/*	
	updateMap: function(e){
		console.log("reach here?");
                //console.log(e.latlng);
                console.log("old poly");
                console.log(poly_list);
                var marker = new L.marker(e.latlng, {dragable:'true'}).addTo(map);
                poly_list.push([e.latlng.lat, e.latlng.lng]);

                console.log("new polygon coordinates");
                console.log(poly_list);
                
                if(old_polygon != undefined){           
                        console.log(old_polygon);
                }
                else{
                        console.log("old_polygon is undefined");
                }

                if(old_polygon != undefined){
                        map.removeLayer(old_polygon);
                }

                var my_polygon = L.polygon(poly_list)
                my_polygon.addTo(map);

                old_polygon = my_polygon;
                //console.log("polygon");
                //console.log(polygon); 
		marker.on('dragend', function(event){
                        var marker = event.target;
                        var position = marker.getLatLng();
                        marker.setLatLng([position], {draggable:'true'}).bindPopup(position.update());
                });
                map.addLayer(marker);
                var polygon_layer = map.addLayer(my_polygon);
                
        },

	*/

        componentDidMount: function(e) {
                console.log("eet eet eet");
                console.log(e);

                if (this.props.createMap) {
                        this.map = this.props.createMap(this.getDOMNode, e);
                } else {
                        this.map = this.createMap(this.getDOMNode(), e);
                }
        },     


			
   	render: function() {
		console.log("map map map");
		//console.log(this.createMap);

		return (
      		<div id='map' >
      		  </div>
    		);
  	},
});
module.exports = _Map;
