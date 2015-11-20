var React = require('react/addons');
var L = require('leaflet');
var Baobab = require('baobab');
var GeoJSONLayer_map = require('../GeoJSONLayer/geojsonLayer.js');
var branch = require('baobab-react/mixins').branch;
require('./map.css');

var map = L.map;


var cur_mode;
var old_map_lock_mode;

//console.log("GeojsonLayer");
//console.log(GeoJSONLayer);
// for test
var a = 0;
var poly_list = [];
var tempLayer = null;

var _Map = React.createClass({
	mixins: [branch],

	cursors: function() {
                return {
                         notes: ['models', 'notes'],
                };
        },

	currentLayer: null,

	createMap: function(element) {
		console.log("createMap function");

		map = L.map(element, {
      		center: [38,-85.5], 
      		zoom: 5 
    		});
    		console.log("create map create map");
		console.log(map);

		var tiles = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
      			attribution: 'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
    		}).addTo(map);
		
		
		//
		console.log("compare map, this is the created map");
		console.log(map);

		map.dragging.disable();
		

		var drop_marker = function(e){
                        console.log("drop marker function here");
                        console.log("this.props in drop marker function");
                        //console.log(pass_drop_marker);
                        console.log(e);



                        marker = new L.marker([e.latlng.lat, e.latlng.lng], {
                        draggable:true
                        });

                        console.log("mouse down listener working ??");
                        console.log("currentLayer");

                        marker_list.push(marker);
                        this.tempLayer = L.layerGroup();

                        console.log(this.tempLayer);

                        this.tempLayer.addLayer(marker).addTo(map);
			// if ( this.whichIsSelected === true) {
                        this.cursors.geojson.set(this.tempLayer.toGeoJSON());
                        //self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
                        this.context.tree.commit();
                        //
                        var move_marker = function move_marker(e) {
                                marker.setLatLng (L.latLng(e.latlng.lat, e.latlng.lng));
				// if ( this.whichIsSelected === true) {
                                this.cursors.geojson.set(this.tempLayer.toGeoJSON());
                                this.context.tree.commit();
                        };
                        this.props.map.on('mousemove', move_marker);
                        this.props.map.on('mouseup', function(e) {
                                this.props.map.off('mousemove', move_marker);

                                //self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
				// if ( this.whichIsSelected === true)
                                this.cursors.geojson.set(this.tempLayer.toGeoJSON());
                                this.context.tree.commit();

                        });

                        //marker.addTo(self.props.map);
                };

		map.on('mousedown', drop_marker);

		return map;
	},

	//setupMap: function () {
        //	map.setView([this.props.lat, this.props.lon], this.props.zoom);        
    	//},

	polyCoorTrans: function(temp_layer){
		for (var i in temp_layer){
			var coordinate = i.getLatLng();
			poly_list.push(coordinate);	
			return poly_list;
		}
	},

	whichIsSelected: function (noteIndex){
		for ( var i in this.state.notes){
			if (noteIndex === i.noteIndex){
				return true;
			}
		}
		
		return false;
	},

	componentDidMount: function(e) {
                console.log("componentDidMount");
		
		var map_map
                if (this.props.createMap) {
                        map_map = this.props.createMap(this.getDOMNode, e);
                } else {
                        map_map = this.createMap(this.getDOMNode(), e);
                }

		//this.setupMap();
        },

	lockMap: function(){
                cur_mode = old_map_lock_mode;
                if(cur_mode===0){                       
                        map.dragging.disable();
                        cur_mode = 1;
                }else{
                        map.dragging.enable();
                        cur_mode = 0;
                }
                old_map_lock_mode = cur_mode;
        },
        
	render: function() {
		console.log("map render");

		console.log("this state notes");
		console.log(this.state);		

		//var mapp = this.createMap;

		console.log("what map is passed now?");
		console.log(map);

		var layers = [];


		for (var i in this.state.notes) {
			a=a+1;
			// check add a layer or not
			if ( this.whichIsSelected === true){
				layers.push(<GeoJSONLayer_map map={map}  geojson_data={this.state.notes[i].geojson} />);
			}
		}

		console.log("map layers");
		console.log(a);
		console.log(layers);
		return (
			<div id="map">
				<div id="button-wrapper" >
                    		   <input type="button" id="map-lock-button" value="lock-map" onClick={this.lockMap} />
                  		</div>

				{layers}
			</div>
		);
	}
});

module.exports= _Map;

