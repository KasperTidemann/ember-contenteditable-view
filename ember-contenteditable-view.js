App.ContenteditableView = Em.View.extend({
	tagName: 'div',
	attributeBindings: ['contenteditable'],

	// Variables:
	editable: false,
	isUserTyping: false,
	plaintext: false,

	// Properties:
	contenteditable: (function() {
		var editable = this.get('editable');

		if (editable) {
			return editable ? 'true' : 'false';
		} else {
			return 'true';
		}
	}).property('editable'),

	// Observers:
	valueObserver: (function() {
		if (!this.get('isUserTyping') && this.get('value')) {
			return this.setContent();
		}
	}).observes('value'),

	// Events:
	didInsertElement: function() {
		return this.setContent();
	},

	focusOut: function() {
		return this.set('isUserTyping', false);
	},

	keyDown: function(event) {
		if (!event.metaKey) {
			return this.set('isUserTyping', true);
		}
	},

	keyUp: function(event) {
		if (this.get('plaintext')) {
			return this.set('value', this.$().text());
		} else {
			return this.set('value', this.$().html());
		}
	},

	setContent: function() {
		return this.$().html(this.get('value'));
	}
});