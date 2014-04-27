// Mongo collection for all the data.
DrawData = new Meteor.Collection("drawdata");

if (Meteor.isClient) {

  // ID in the Mongo database for the document holding
  // the number currently being drawn.
  var cur_num_id;
  Template.main.cur_num = function() {
    cur_num = DrawData.find({type: "cur_num"}).fetch()[0];
    if (cur_num) {
      cur_num_id = cur_num._id;
      return cur_num.val;
    } else {
      return 666;
    }
  }

  // Define click events for the control buttons.
  Template.main.events({
    'click input.up': function () {
      DrawData.update(cur_num_id, {$inc: {val: 1}});
    },
    'click input.down': function () {
      DrawData.update(cur_num_id, {$inc: {val: -1}});
    }
  });

}

if (Meteor.isServer) {

  // Initialize the database with a document to hold
  // the number currently being drawn.
  Meteor.startup(function () {
    if (DrawData.find({type: "cur_num"}).count() === 0) {
      DrawData.insert({
        type: "cur_num",
        val: 0
      });
    }

  });

}
