var Baobab = require('baobab');
var uuid = require('uuid');

var Tree = new Baobab({
	models: {
		notes: initial_notes(),
	},
	view: {
		mode: 'all',
		activetags: [],
	}
     });

function initial_notes(){
	var notes_list = {};
	for(var i = 1; i<3; i++) {
		var note = {
			text: 'why',
			tags: ['low areas'],
			fields: [],
		};
		if(i===2){
			note = {
				text: 'here',
				tags: ['high areas'],
				fileds: [],
			};
		}
		note.order = i;
		note.key = uuid.v4().replace('-','');
		notes_list[note.key] = note;
	}
	return notes_list;
  }

module.exports = Tree;


