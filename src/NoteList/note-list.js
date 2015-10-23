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
	sortMode: ['view', 'sort_mode'],
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
    if (this.state.sortMode === 'all') {
      for (var i in this.state.notes) {
        notes_array.push(<Note id={this.state.notes[i].key} key={this.state.notes[i].key} deleteNote={this.deleteNote} />);
        }
    } else {
      var note_groups = _.groupBy(this.state.notes, this.state.sortMode);
      var self = this;
      _.each(note_groups, function(group, key) {
        notes_array.push(<h1>{key}</h1>);
        notes_array.push(<hr/>);
        for (var i in group) {
          notes_array.push(<Note id={group[i].key} key={group[i].key} deleteNote={self.deleteNote} />);
        }
      });
    }
    return (
      <div className="notelist">
        <TabsBar className="tabs-bar"/>
        <SearchBar />
        {notes_array}
        <button type= "button" onClick={this.addNote} className="new-note-button">
        Add Note
        </button>
      </div>
    );
  }
});
module.exports = _NoteList;


/*
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
  */
