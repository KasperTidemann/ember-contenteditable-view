App.ContenteditableView = Em.View.extend({
	tagName: 'div',
	attributeBindings: ['contenteditable'],
	
	// Toggle plain text inside the <div> element:
	plaintext: false,

	// Variables:
	contenteditable: 'true',
	isUserTyping: false,

	// Observers:
	valueObserver: (function() {
		if (!this.get('isUserTyping') && this.get('value')) {
			this.setContent();
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
		if (this.get('plaintext')) {
			this.set('value', this.$().text());
		} else {
			this.set('value', this.$().html());
		}
	},
	
	setContent: function() {
		this.$().html(this.get('value'));
	}

});
