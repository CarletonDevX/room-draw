// Mongo collection for all the data.
DormData = new Meteor.Collection("dormdata");

if (Meteor.isClient) {

  Template.main.dorms = function() {
    return DormData.find();
  }

  /*
   * Filter logic
   */
  Template.query.events({
    'click button#go': function() {
      hideClasses = []

      // Hide room sizes that aren't checked
      for (var i = 1; i < 6; i++) {
        if (!$( '#roomSize' + i ).is(':checked')) {
          hideClasses.push('.size' + i)
        }
      }

      // Hide according to subfree preferences
      if ($( '#subfreeYes' ).is(':checked')) {
        hideClasses.push('.notSubfree');
      } else if ($( '#subfreeNo' ).is(':checked')) {
        hideClasses.push('.subfree');
      }

      // Hide according to quiet preferences
      if ($( '#quietYes' ).is(':checked')) {
        hideClasses.push('.notQuiet');
      } else if ($( '#quietNo' ).is(':checked')) {
        hideClasses.push('.quiet');
      }

      // Hide according to gender preferences
      if ($( '#hideMale' ).is(':checked')) {
        hideClasses.push('.onlyMale');
      }
      if ($( '#hideFemale' ).is(':checked')) {
        hideClasses.push('.onlyFemale');
      }

      // Hide taken rooms if checked
      if ($( '#hideTaken' ).is(':checked')) {
        hideClasses.push('.isDrawn');
      }

      // Reset so that nothing is hidden.
      $(".tempStyle").each(function(){$(this).remove();})
      $('.dorm').each(function(){$(this).show();})
      $('.floor').each(function(){$(this).show();})
      $('#dormSelect').children().removeAttr('disabled');

      // Apply a new temporary stylesheet to hide things.
      classesString = hideClasses.join();
      console.log(classesString);
      $('head').append('<style class="tempStyle">'+ classesString + '{display:none;}</style>');

      // Hide empty floors
      $('.floor').each(function(){
        console.log($(this).children('.rooms').children(':visible').length);
        if($(this).children('.rooms').children(':visible').length == 0) {
          $(this).hide();
        }
      });

      // Hide empty dorms
      $('.dorm').each(function(){
        if($(this).children('.floors').children(':visible').length == 0) {
          $(this).hide();
          dormName = $(this).children('h4').text();
          console.log("option[value*='" + dormName + "']");
          $('#dormSelect').children("option[value*='" + dormName + "']").attr("disabled", "yea");
        }
      });

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
      "name": floorNum * 100 + i + 1,
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

  Meteor.startup(function () {

    // Clear the database when the server starts up.
    DormData.remove({});

    // Generate fake data for testing.
    // insertSampleData();

    // Use the actual JSON to load real data:
    if (DormData.find().count() === 0) {
      var roomData = {};
      // this comes from the file: /private/seed_room_data.json
      roomData = JSON.parse(Assets.getText("seed_room_data.json"));
      roomData.forEach(function (hall) {
        DormData.insert(hall);
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