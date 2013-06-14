App.ContenteditableView = Em.View.extend({
	tagName: 'div',
	attributeBindings: ['contenteditable'],

	// Variables:
	contenteditable: 'true',
	isUserTyping: false,

	// Observers:
	valueObserver: (function() {
		if (!this.get('isUserTyping') && this.get('value')) {
			this._updateHtml();
		}
	}).observes('value'),

	// Events:
	didInsertElement: function() {
		this._updateHtml();
	},

	focusOut: function() {
		this.set('isUserTyping', false);
	},

	keyDown: function(event) {
		if (!event.metaKey) {
			this.set('isUserTyping', true);
		}
	},

	keyUp: function(event) {
		this.set('value', this.$().html());
	},
	
	_updateHtml: function() {
		this.$().html(this.get('value'));
	},


});
