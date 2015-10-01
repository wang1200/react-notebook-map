var Baobab = require('baobab');
var branch = require('baobab-react/mixins').branch;
var React = require('react/addons');
require("./note.css");

var _Note = React.createClass({

  mixins: [branch],

  cursors: function () {
    return {
      notes: ['models', 'notes'],
      
      self: ['models', 'notes', this.props.id]
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

  render: function () {
    console.log(this.state);
    console.log(this.props);
    return (
      <div className ="note"> 
       <input type="text" value={this.state.self.text} onChange={this.textboxChanged}/>
	<button type="button" className="remove-button" onClick = {this.DeleteNote}> 
       Remove 
       </button>	
       </div>

    ); 
  }
});

module.exports = _Note;
