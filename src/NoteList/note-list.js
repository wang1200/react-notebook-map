var React = require('react');
var Note = require('../Note/note.js');
var _ = require('lodash');
var uuid = require('uuid');
var branch = require('baobab-react/mixins').branch;
var AddNoteButton = require('../AddNoteButton/add-note-button.js');
var SearchBar = require('../SearchBar/search-bar.js');
var TabsBar = require('../TabsBar/tabs-bar.js');
require("./note-list.css");

var _NoteList = React.createClass({
  mixins: [branch],

  cursors: function() {
    return {
    	notes:['models', 'notes'],
	};
  },


 addNote: function() {
    var id = uuid.v4().replace('-','');
    this.cursors.notes.set(id);
    var new_note = {   
      key: id,
      text: ' ',
      order: Object.keys(this.state.notes).length,
      tags: [],
      fields:[]
    };

    this.cursors.notes.set(id, new_note);
    this.context.tree.commit();
  },

  render: function () {
    var notes_array  = [];

      for(var i in this.state.notes){
	var n = this.state.notes[i];
	notes_array.push(<Note id={this.state.notes[i].key} key={n.key}/>);
    }

    return (
      <div id="NoteList" className = "notelist">
        <TabsBar />
	<SearchBar />
	{notes_array}
	<AddNoteButton addNoteButtonClick={this.addNote} />
      </div>
    ); 
  }
});
module.exports = _NoteList;
