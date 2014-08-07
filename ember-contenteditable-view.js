Ember.ContenteditableView = Em.View.extend({
	tagName: 'div',
	attributeBindings: ['contenteditable'],

	// Variables:
	editable: false,
	isUserTyping: false,
	plaintext: false,

	// Properties:
	contenteditable: (function() {
		var editable = this.get('editable');

		return editable ? 'true' : undefined;
	}).property('editable'),
	
	// Processors:
    	processValue: function() {
    		if (!this.get('isUserTyping') && this.get('value')) {
    			return this.setContent();
    		}
    	},

	// Observers:
	alueObserver: (function() {
    		Ember.run.once(this, 'processValue');
    	}).observes('value', 'isUserTyping'),

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

	//render our own html so there are no metamorphs to get screwed up when the user changes the html
	render: function(buffer) {
		buffer.push( this.get('value') )
	},

	setContent: function() {
		return this.$().html(this.get('value'));
	}
});
