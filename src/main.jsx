var React = require('react');
var App = require('./App.jsx');

var root = require('baobab-react/mixins').root;
var Baobab = require('baobab');
var style = require('./reset.css');
var Tree = require('./statetree.js');

/*
var Tree = new Baobab({
  models: {
    notes: {
      'hahahaha': {
        key: 'hahahaha',
        text: 'hhhhello!',
        order: 1,
        tags: ['low areas'],
    
      },
      'heyheyhey': {
        key: 'heyheyhey',
        text: 'wwworld!',
        order: 2,
        tags: ['high areas'],
        
      }
    }
  }
});
*/


var Main = React.createClass({

  mixins: [root],  
  render: function() {
    return (
      <div>
        <App />  
      </div>
    );
  }
});

React.render(<Main tree={Tree}/>,document.getElementById('app-container'));

