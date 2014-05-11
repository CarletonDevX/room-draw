Router.configure({
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('admin',
    {onBeforeAction: function() {return AccountsEntry.signInRequired(this);}});
  this.route('home',{
  	path: '/', loadingTemplate:"loading",
  	waitOn: function() {
  		return [Meteor.subscribe('Floors'),Meteor.subscribe('Rooms'),Meteor.subscribe('Dorms')];
  	}
  });
  //another option is typing /home
  this.route('home');
  this.route('soon');
  this.route('credits');
  this.route('loading');
});

// Collections
Dorms = new Meteor.Collection("dorms");
Floors = new Meteor.Collection("floors");
Rooms = new Meteor.Collection("rooms");
DrawData = new Meteor.Collection("drawdata");