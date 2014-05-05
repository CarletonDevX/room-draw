Router.map(function () {
  this.route('admin', {onBeforeAction: function() {return AccountsEntry.signInRequired(this);}
  });
  this.route('home',{path: '/'});
  //another option is typing /home
  this.route('home');
});

// Collections
Dorms = new Meteor.Collection("dorms");
Floors = new Meteor.Collection("floors");
Rooms = new Meteor.Collection("rooms");
DrawData = new Meteor.Collection("drawdata");

if (Meteor.isClient) {

  Template.main.dorms = function() {
    return Dorms.find();
  }

  Template.dorm.floors = function() {
    return Floors.find({'dormID': this._id});
  }

  Template.floor.rooms = function() {
    return Rooms.find({'floorID': this._id});
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
AccountsEntry.config({
  showSignupCode: true
});

}

/*
 * Test functions to insert sample data that can be used to
 * test the interfaces. A quarter of the rooms are randomly initialized as having
 * been drawn.
 */
function insertSampleData() {
  fakeDormNames = ["Armenia", "Bulgaria", "Cyprus", "Denmark", "Estonia"];
  for (i in fakeDormNames) {
    var dormID = Dorms.insert({
      "name": fakeDormNames[i]
    });
    var numFloors = Math.floor(Math.random() * 5) + 1;
    for (var j = 0; j < numFloors; j++) {
      var floorID = Floors.insert({
        "number": j + 1,
        "dormID": dormID
      });
      var numRooms = Math.floor(Math.random() * 31) + 10;
      for (var k = 0; k < numRooms; k++) {
        Rooms.insert({
          "name": "" + ((j + 1) * 100 + k + 1),
          "floorID": floorID,
          "isDrawn": Math.random() < 0.25,
          "size": Math.floor(Math.random() * 5) + 1,
          "subFree": Math.random() < 0.25,
          "quiet": Math.random() < 0.25,
          "onlyMale": Math.random() < 0.25,
          "onlyFemale": Math.random() < 0.25,
          "chance": {}
        });
      }
    }
  }
}

if (Meteor.isServer) {

  Meteor.startup(function () {

    // Clear the database when the server starts up.
    Dorms.remove({});
    Floors.remove({});
    Rooms.remove({});
    DrawData.remove({});

    // Generate fake data for testing.
    if (Dorms.find().count() === 0) {
      insertSampleData();
    }
    if (DrawData.find().count() === 0) {
      DrawData.insert({
        "lastNum": 0,
        "lastRoom": "",
        "lastDorm": ""
      })
    }

    // Use the actual JSON to load real data:
    // if (DormData.find().count() === 0) {
    //   var roomData = {};
    //   // this comes from the file: /private/seed_room_data.json
    //   roomData = JSON.parse(Assets.getText("seed_room_data.json"));
    //   roomData.forEach(function (hall) {
    //     DormData.insert(hall);
    //   });
    // }
    
	AccountsEntry.config({
    signupCode: 's3cr3t',
    defaultProfile: {
    	someDefault: 'default'
    	}
  	});
  });

}
