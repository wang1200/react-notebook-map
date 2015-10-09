var React = require('react/addons');
require('./search-bar.css');

var _SearchBar = React.createClass({
  render: function() {
    return(
      <div id="search-bar">
        <input type="text" /> 
      </div>
    );  
  },
});

module.exports = _SearchBar;

