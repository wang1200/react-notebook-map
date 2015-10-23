var Baobab = require('baobab');
var uuid = require('uuid');

var Tree = new Baobab({
	models: {
		notes: initial_notes(),
		allTags: ['low area', 'herbicide'],
	},
	view: {
		mode: 'all',
		activetags: [],
		tags_modal: false,
    		tags_modal_note_id: {},
    		tags_modal_completions: [],
    		sort_mode: 'all',
	}
     });

function initial_note(){
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

function initial_notes() { 

  var notes_list = {};

  for (var i = 1; i<4;i++) {
    var note = {
        text: 'ran low on herbicide and applied lower rate here',
        tags: ['herbicide'],
        fields: ['Smith40'],
        polygon: [[-85.5, 38.5], [-85.55, 38.55]],
    };
    if (i === 2) {
      note = {
        text: 'drown out; replanted 6/18/2015',
        tags: ['low area'],
        fields: ['Smith40'],
        polygon: [[[38.5, -85.5], [38.5, -85.55]]],
      };
    }
    if (i === 3) {
      note = {
        text: 'applied radioactive slug oil',
        tags: [],
        fields: ['Smith40'],
        polygon: [[[38.5, -85.5], [38.5, -85.55]]],
      };
    }
    note.order = i;
    note.key = uuid.v4().replace('-','');
    notes_list[note.key] = note;
  };
  return notes_list;
}

module.exports = Tree;


