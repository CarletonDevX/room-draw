// Mongo collection for all the data.
DormData = new Meteor.Collection("dormdata");

if (Meteor.isClient) {

  // ID in the Mongo database for the document holding
  // the number currently being drawn.
  var cur_num_id;
  Template.main.cur_num = function() {
    cur_num = DormData.find({type: "cur_num"}).fetch()[0];
    if (cur_num) {
      cur_num_id = cur_num._id;
      return cur_num.val;
    } else {
      return NaN;
    }
  }

  // Define click events for the control buttons.
  Template.main.events({
    'click input.up': function () {
      DormData.update(cur_num_id, {$inc: {val: 1}});
    },
    'click input.down': function () {
      DormData.update(cur_num_id, {$inc: {val: -1}});
    }
  });

  Template.main.dorms = function() {
    return DormData.find();
  }

  Template.query.events({
    'click button.go': function() {
      // @TODO: Make JS array of classes that should be hidden

      // Remove the old temporary stylesheet.
      $(".tempStyle").each(function(){$(this).remove();})

      // @TODO: Hide it like this:
      // $('head').append('<style class="tempStyle">thing1,thing2,etc{display:none;}</style>');
    }
  })

}

/*
 * Test functions to insert sample data that can be used to
 * test the interfaces.
 *
 * A quarter of the rooms are randomly initialized as having
 * been drawn.
 *
 * A dorm has a 25% chance of being a house. A floor has
 * a 25% chance of being sub-free as well as a 25% chance
 * of being a quiet floor and a 25% chance of being all female.
 *
 * A dorm has between 1 and 5 floors. A floor has between
 * 10 and 40 rooms.
 *
 * by Ken
 */

function generateRooms(numRooms, floorNum) {
  rooms = [];
  for (var i = 0; i < numRooms; i++) {
    size = Math.floor(Math.random() * 5) + 1;
    room = {
      "size": size,
      "subFree": Math.random() < 0.25,
      "quiet": Math.random() < 0.25,
      "onlyFemale": Math.random() < 0.25,
      "onlyMale": Math.random() < 0.25,
      "number": floorNum * 100 + i + 1,
      "chance": {},
      "isDrawn": Math.random() < 0.25
    }
    rooms.push(room);
  }
  return rooms;
}

function generateFloors(numFloors) {
  floors = [];
  for (var i = 0; i < numFloors; i++) {
    floor = {
      "number": i + 1,
      "rooms": generateRooms(Math.floor(Math.random() * 31) + 10, i + 1)
    };
    floors.push(floor);
  }
  return floors;
}

function generateFakeDorm(dormName) {
  return {
    "name": dormName,
    "isHouse": Math.random() < 0.25,
    "floors": generateFloors(Math.floor(Math.random() * 5) + 1)
  };
}

function insertSampleData() {
  if (DormData.find().count() === 0) {
    fakeDormNames = ["Armenia", "Bulgaria", "Cyprus", "Denmark", "Estonia"];
    for (i in fakeDormNames) {
      DormData.insert(generateFakeDorm(fakeDormNames[i]));
    }
  }
}

if (Meteor.isServer) {

  // Initialize the database with a document to hold
  // the number currently being drawn.
  Meteor.startup(function () {

    // Clear the database when the server starts up.
    DormData.remove({});

    // Generate fake data for testing.
    insertSampleData();

    /* When the JSON is ready, use this to load data from JSON:
    var roomData = {};
    // this comes from the file: /private/seed_room_data.json
    roomData = JSON.parse(Assets.getText("seed_room_data.json"));
    roomData.forEach(funtion (hall) {
      DormData.insert(hall);
    });
    */

    // Old code to insert a current number counter in the database.
    if (DormData.find({type: "cur_num"}).count() === 0) {
      DormData.insert({
        type: "cur_num",
        val: 0
      });
    }

  });

}


// Problem: we need to filter the rooms based on various queries. This will be highly annoying if we
// want to use reactive templating, as far as I know. the best solution I can think of is hiding the
// rooms NOT in the current query with CSS, and using a pinch of JQuery to clean up floors and dorms
// with all hidden rooms. A super clever way would be to make use of the fact that divs collapse when
// all their contents are floated, but I have not yet been successful there. 
// See http://jsbin.com/toxigaho/1/edit?html,css,output

// //hide floors containing no visible elements
// $('.floor').each(function(){
//  if($(this).children(':visible').length == 0) {
//    $(this).hide();
//  }
// });

// //or just add, remove separate <style></style> tags on the head. Hacky but oh so clean.
// //adding
//$('head').append('<style class="tempStyle">p:hover{color:red;}</style>');
// //removing
//$(".tempStyle").each(function(){$(this).remove();})