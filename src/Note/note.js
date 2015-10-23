var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var React = require('react/addons');
var TagsModal = require('../TagsModal/tags-modal.js');
require("./note.css");

var _Note = React.createClass({

  mixins: [branch],

  cursors: function () {
    return {
      notes: ['models', 'notes'],      
      self: ['models', 'notes', this.props.id],
      tagsModalBool: ['view', 'tags_modal'],
      tagsModalNoteId: ['view', 'tags_modal_note_id'],
      allTags: ['model', 'allTags'],
    };
  },

  textboxChanged: function(evt) {
    this.cursors.self.set('text', evt.target.value),
    this.context.tree.commit();
  },

  DeleteNote: function(evt) {
    this.cursors.self.unset();
    //this.context.tree.commit();
  },

  openTagsModal: function() {
    this.cursors.tagsModalBool.set(true);
//    this.context.tree.select('view', 'tags_modal_note_id').set(this.props.id);
    this.cursors.tagsModalNoteId.set(this.props.id);
    this.context.tree.commit();
  },

  render: function () {
    console.log(this.state);
    console.log(this.props);
    return (
      <div className ="note"> 
       <textarea value={this.state.self.text} onChange={this.textboxChanged}/>
	<button type="button" className="remove-note-button" onClick = {this.DeleteNote}> 
       Remove 
       </button>
       
       <button type="button" className="tags" onClick={this.openTagsModal}>
          tags
        </button>	
       </div>

    ); 
  }
});

module.exports = _Note;
