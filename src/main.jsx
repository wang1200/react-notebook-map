var React = require('react');
var App = require('./App.jsx');

var root = require('baobab-react/mixins').root;
var Baobab = require('baobab');


var Tree = new Baobab({
  models: {
    notes: {
      'hahahaha': {
        key: 'hahahaha',
        text: 'hello!',
        order: 1,
        tags: ['low areas'],
    
      },
      'heyheyhey': {
        key: 'heyheyhey',
        text: 'world!',
        order: 2,
        tags: ['high areas'],
        
      }
    }
  }
});

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

