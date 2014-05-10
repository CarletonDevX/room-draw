Router.configure({
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('admin',
    {onBeforeAction: function() {return AccountsEntry.signInRequired(this);}});
  this.route('home',{path: '/', loadingTemplate:"loading"});
  //another option is typing /home
  this.route('home');
  this.route('soon');
  this.route('credits');
});

// Collections
Dorms = new Meteor.Collection("dorms");
Floors = new Meteor.Collection("floors");
Rooms = new Meteor.Collection("rooms");
DrawData = new Meteor.Collection("drawdata");