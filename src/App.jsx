var React = require('react/addons');
var style = require('./App.css');
var NoteList = require('./NoteList/note-list.js');
var _ = require('lodash');
var uuid = require('uuid');

var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var Map = require('./Map/map.js');

var _App = React.createClass({
  
  mixins: [branch],
  
  cursors: {
    notes: ['models', 'notes'],
  },
  
  getInitialState:function() {
	return{
	};
  },

  getFirstNoteText: function() {
    var first_note = _.reduce(this.state.notes, function(acc, n) {
      if (acc.order < 0 || n.order < acc.order) return n;
      return acc;
    }, { order: -1 });
    return first_note.text;    
  },


  updateMapp: function(){
	console.log("kkkkkkkkkkkkkkkkk");
  },

  render: function() {
    return ( 
     <div className="app">

       <NoteList />
	<Map id="map-pane" />
	{this.getFirstNoteText()}  

      </div>

    );
  }
});

module.exports = _App;
