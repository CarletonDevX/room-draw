if (Meteor.isClient) {

  Template.amain.dorms = function() {
    return Dorms.find({}, {sort: {name: 1}});
  }

  Template.adorm.floors = function() {
    return Floors.find({'dormID': this._id});
  }

  Template.afloor.rooms = function() {
    return Rooms.find({'floorID': this._id});
  }

  Template.aroom.events({
    'click input': function() {
      if (this.isDrawn) {
        Rooms.update(this._id, {$set: {isDrawn: false}});
      } else {
        Rooms.update(this._id, {$set: {isDrawn: true}});
        var floor = Floors.findOne({_id: this.floorID});
        var dorm = Dorms.findOne({_id: floor.dormID});
        var lastDormID = DrawData.findOne({key: 'lastDorm'})._id;
        var lastRoomID = DrawData.findOne({key: 'lastRoom'})._id;
        DrawData.update(lastDormID, {$set: {value: dorm.name}});
        DrawData.update(lastRoomID, {$set: {value: this.name}});
      }
    }
  });

  /*
   * Last number drawn.
   */

  Template.aheader.lastNum = function() {
    var obj = DrawData.findOne({key: 'lastNum'});
    if (obj) return obj.value;
    return NaN;
  }

  var updateLastNum = function(change) {
    var newValue = parseInt($( '#lastNum' ).val()) + change;
    var lastNumID = DrawData.findOne({key: 'lastNum'})._id;
    DrawData.update(lastNumID, {$set: {value: newValue}});
  }

  var updateLiveMessage = function(message, duration) {
    console.log("okay: (" + message + "," + duration + ")");
    var objID = DrawData.findOne({key: 'liveMessage'})._id;
    DrawData.update(objID, {$set: {
      value: message,
      duration: duration
    }});
  }

  Template.aheader.events({
    'click button#numUp': function() {
      updateLastNum(1);
    },
    'click button#numDown': function() {
      updateLastNum(-1);
    },
    'keypress input#lastNum': function(event) {
      if (event.charCode == 13) {
        updateLastNum(0);
        $( '#lastNum' ).blur();
      }
    },
    'keypress input#liveMessage': function(event) {
      if (event.charCode == 13) {
        var message = $( '#liveMessage' ).val();
        var duration = 3000;
        var matches = /(.+?)\s*\{(\-?\d+)\}/g.exec(message);
        if (matches) {
          message = matches[1];
          duration = parseInt(matches[2]);
        }
        updateLiveMessage(message, duration);
        $( '#liveMessage' ).val("");
        $( '#liveMessage' ).blur();
      }
    },
    'click button#clear': function() {
      updateLiveMessage("", 0);
    }
  });

  /*
   * Last dorm drawn, last room drawn
   */

   Template.aheader.lastDorm = function() {
    var obj = DrawData.findOne({key: 'lastDorm'});
    if (obj) return obj.value;
    return "";
  }

  Template.aheader.lastRoom = function() {
    var obj = DrawData.findOne({key: 'lastRoom'});
    if (obj) return obj.value;
    return "";
  }

}
