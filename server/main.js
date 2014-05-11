if (Meteor.isServer) {

  Meteor.startup(function () {

    // Clear the database when the server starts up.
    Dorms.remove({});
    Floors.remove({});
    Rooms.remove({});
    DrawData.remove({});

    Rooms.allow({
      'update': function(userId, docs, fields, modifier) {
        if(userId) {
          return true;
        }
        return false;
      }
    });

    DrawData.allow({
      'update': function(userId, docs, fields, modifier) {
        if(userId) {
          return true;
        }
        return false;
      }
    });

    // Generate fake data for testing.
    if (Dorms.find().count() === 0) {
      // insertSampleData();
    };
    if (DrawData.find().count() === 0) {
      DrawData.insert({key: "lastNum", value: NaN});
      DrawData.insert({key: "lastDorm", value: "N/A"});
      DrawData.insert({key: "lastRoom", value: ""});
      DrawData.insert({key: "liveMessage", value: "", duration: 0});
    };

    // Use the actual JSON to load real data:
    if (Dorms.find().count() === 0) {
      var roomData = {};
      // this comes from the file: /private/seed_room_data.json
      roomData = JSON.parse(Assets.getText("seed_room_data.json"));
      roomData.forEach(function (hall) {
        var dormID = Dorms.insert({
          "name": hall["name"]
        });
        hall["floors"].forEach(function (floor) {
          var floorID = Floors.insert({
            "number": floor["number"],
            "dormID": dormID
          });
          floor["rooms"].forEach(function (room) {
            room["floorID"] = floorID;
            Rooms.insert(room);
          });
        });
      });
    }

    AccountsEntry.config({
      signupCode: 's3cr3t'
    });
  });

};

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
      var numRooms = Math.floor(Math.random() * 1) + 10;
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
          "chance": {"mean": Math.random() * 100, "stddev": 1 + Math.random() * 3}
        });
      }
    }
  }
}