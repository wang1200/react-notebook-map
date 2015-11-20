var React = require('react/addons');
var L = require('leaflet');

//var Map = require('../Map/map.js');
var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;

require('./geojsonLayer.css');

var marker;
var marker_list = [];

console.log("geojsonlayer ??");

// 
//var previouslyLayer = null;

var GeoJSONLayer_map = React.createClass({
	mixins: [branch], 
	
	/*
	cursors: function() {
		console.log("qwert");
		return {
		  notes: ['models', 'notes'],
		  //geojson: ['models', 'notes', 'noteIndex', 'geojson'],
		};
	},
	*/

	previouslyLayer: null,   // layer group

	currentLayer: null,	

	/*
	detectChangedInMap: function(e) {
		console.log('detectchanged??');
		console.log(this.props);
		console.log(this.props.map);
		console.log("event");
		console.log(e)

		//var test_map = L.map;
		console.log("test_map##################");
		//console.log(test_map);
		if(e === undefined){
			return;
		}	
	
		if(e.latlng === undefined){
			return;
		};
		
		//this.props.map.on('mousedown', drop_marker);
		//var self = this.props;
                var self = this;
		var drop_marker = function(e){
			console.log("drop marker function here");
			console.log("this.props in drop marker function");
			console.log(pass_drop_marker);
			console.log(e);

			

			marker = new L.marker([e.latlng.lat, e.latlng.lng], {
			draggable:true
			});		
			
			console.log("mouse down listener working ??");
			console.log("currentLayer");

			marker_list.push(marker);			
			self.currentLayer = L.layerGroup();
			
			console.log(self.currentLayer);

			self.currentLayer.addLayer(marker).addTo(self.props.map);	
			self.cursors.geojson.set(self.currentLayer.toGeoJSON());
			//self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
			self.context.tree.commit();		
			//
			var move_marker = function move_marker(e) {
				marker.setLatLng (L.latLng(e.latlng.lat, e.latlng.lng));
				self.cursors.geojson.set(self.currentLayer.toGeoJSON());
				self.context.tree.commit();
                        };
			self.props.map.on('mousemove', move_marker);
			self.props.map.on('mouseup', function(e) {
                                self.props.map.off('mousemove', move_marker);
				
				//self.cursors.geojson.set(self.previouslyLayer.toGeoJSON());
  	                        self.cursors.geojson.set(self.currentLayer.toGeoJSON());
				self.context.tree.commit();

			});
			
			//marker.addTo(self.props.map);
		};
		
		console.log('this.props before in drop_marker');
		console.log(this.props);
		//var pass_drop_marker = this.props;
		console.log(e);
		console.log(pass_drop_marker);	

		this.props.map.on('mousedown', drop_marker);
	},
	*/


	render: function() {
		console.log("geojson render");	
		console.log(event);
		
		//if(this.props.map !== undefined){
		//	this.detectChangedInMap(event);
		//}

		if (this.previouslyLayer!==null){
			this.map.removeLayer(previouslyLayer);
			this.previouslyLayer = null;
		};
	
		// draw the polygon based on geojson
                L.geoJson(this.props.geojson).addTo(this.props.map);
	
		return (
			<div>
			</div>
		);	
	}		

});

module.exports = GeoJSONLayer_map;
