var React = require('react/addons');
var L = require('leaflet');

var branch = require('baobab-react/mixins').branch;
require('./map.css');

var marker_list = new Array();

var poly_list= new Array();
var old_polygon;
var old_map_lock_mode = 1;

var _Map = React.createClass({
	mixins: [branch],
	
	cursors: function() {
    		return {
     			 notes: ['model', 'notes'],
    		};
  	},

	createMap: function(element, e){
		var map = L.map(element, {
			center: [40,-87],
			zoom: 5
			});

		var tiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      			attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    		}).addTo(map);

		//var info = L.control();
		//info.addTo(map);
		//info.getContainer(function() {
		map.dragging.disable();
		//});
				
		var onClickMap = function onClickMap(e){
		console.log("old poly");
                console.log(poly_list);
                var marker = new L.marker(e.latlng, {draggable:'true'}).addTo(map);
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
		
		marker.on('dragstart', function(event){
                        var marker = event.target;
                        var position = marker.getLatLng();
                        marker.setLatLng([position], {draggable:'true'}).bindPopup(position.update());
                });
                map.addLayer(marker);
                var polygon_layer = map.addLayer(my_polygon);

		};

		var drop_marker = function drop_marker(e) {
			var marker = new L.marker([e.latlng.lat, e.latlng.lng], {
			draggable:true
			});
			
			marker_list.push(marker);

			console.log(e.latlng);
			var move_marker = function move_marker(e){
				marker.setLatLng (L.latLng(e.latlng.lat, e.latlng.lng));
			};
			map.on('mousemove', move_marker);
			map.on('mouseup', function(e) {
				map.off('mousemove', move_marker);
				console.log("marker list");
				console.log(marker_list);      
				//var new_coord = marker.getLatLng();
				var a = 1;
				for(var each_marker in marker_list) {
					a=a+1;
					console.log("each marker");
					console.log(each_marker);
					console.log(marker_list[each_marker]);
					var new_coord = marker_list[each_marker].getLatLng();
					console.log(new_coord);
					poly_list[each_marker] = marker_list[each_marker].getLatLng();
					//poly_list.push([new_coord.lat, new_coord.lng]);
					console.log("poly list aaaaa");
					console.log(poly_list);
				}
				console.log("a count");
				console.log(a);

				if(old_polygon != undefined){
                                        map.removeLayer(old_polygon);
                                };

				console.log("poly list before plot");
				console.log(poly_list);
				var my_polygon = L.polygon(poly_list);
	                	my_polygon.addTo(map);

				//this.context.tree.commit();

				old_polygon = my_polygon;
				var polygon_layer = map.addLayer(my_polygon);
	
			});
			
			
			//marker.update();
			marker.addTo(map);

			//marker.on('drag', function(e){
                        //	var marker = e.target;
                        //	var position = marker.getLatLng();
                        //	marker.setLatLng([position], {draggable:'true'}).bindPopup(position.update());
                	//});
                	//map.addLayer(marker);
		};
		if(old_map_lock_mode===1){
			map.on('mousedown', drop_marker);

		};


		//var my_polygon = L.polygon(poly_list);
                //my_polygon.addTo(map);

		
		//map.on('mousedown', onClickMap);
    		return map;
	},

	/*	
	updateMap: function(e){
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


	lockMap: function(){
		var cur_mode;
		cur_mode = old_map_lock_mode;
		if(cur_mode===0){			
			this.map.dragging.disable();
			cur_mode = 1;
		}else{
			this.map.dragging.enable();
			cur_mode = 0;
		}
		old_map_lock_mode = cur_mode;
	},
	
		
   	render: function() {
		console.log("map map map");
		//console.log(this.createMap);
		//console.log("ploy listt");
                //console.log(poly_list);

		for(var each_marker in marker_list) {
                        console.log(each_marker);
                        poly_list.push([marker_list[each_marker].getLatLng().lat, marker_list[each_marker].getLatLng().lng]);
 	               console.log("ploy listt");
        	        console.log(poly_list);
                };
		

		return (
		<div id="map-wrapper">
      		  <div id="button-wrapper" >
                    <input type="button" id="map-lock-button" value="lock-map" onClick={this.lockMap} />
		  </div>
		  <div id="map">
 		  </div>
		</div>
    		);
  	},
});
module.exports = _Map;
