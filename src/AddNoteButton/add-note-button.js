var React = require('react/addons');
require("./add-note-button.css");

var _AddNoteButton = React.createClass({
  onButtonClick: function (evt) {
    this.props.addNoteButtonClick();
  },

  render: function () {
    return (
      <button type= "button" onClick={this.onButtonClick} className="add-note-button">
      Add a  note
      </button>
    ); 
  },

});

module.exports = _AddNoteButton;


