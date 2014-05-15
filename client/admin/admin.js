if (Meteor.isClient) {

  Template.amain.dorms = function() {
    return Dorms.find({}, {sort: {name: 1}});
  }

  Template.adorm.floors = function() {
    return Floors.find({'dormID': this._id});
  }

  Template.adorm.rooms = function() {
    return Rooms.find({'floorID': this._id});
  }

  Template.adorm.dormName = function() {
    return Dorms.findOne({_id: Floors.findOne({_id: this.floorID}).dormID}).name;
  }

  Template.adorm.events({
    'click input': function() {
      var floor = Floors.findOne({_id: this.floorID});
      var dorm = Dorms.findOne({_id: floor.dormID});
      var lastDormID = DrawData.findOne({key: 'lastDorm'})._id;
      var lastRoomID = DrawData.findOne({key: 'lastRoom'})._id;
      var hist = DrawData.findOne({key: 'history'});
      if (this.isDrawn) {
        Rooms.update(this._id, {$set: {isDrawn: false}});
        var val = dorm.name + " " + this.name;
        var i = hist.value.indexOf(val);
        var num = hist.nums[i];
        var dict = {};
        dict['nums.' + i] = -1;
        DrawData.update(hist._id, {$pull: {value: val}});
        DrawData.update(hist._id, {$set: dict});
        DrawData.update(hist._id, {$pull: {nums: -1}});
      } else {
        Rooms.update(this._id, {$set: {isDrawn: true}});
        DrawData.update(lastDormID, {$set: {value: dorm.name}});
        DrawData.update(lastRoomID, {$set: {value: this.name}});
        DrawData.update(hist._id, {$push: {value: dorm.name + " " + this.name}});
        DrawData.update(hist._id, {$push: {nums: 0}});
      }
    }
  });

  /*
   * Last number drawn and other things.
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
    var objID = DrawData.findOne({key: 'liveMessage'})._id;
    DrawData.update(objID, {$set: {
      value: message,
      duration: duration
    }});
  }

  var updateLastTakenBy = function(num) {
    var historyID = DrawData.findOne({key: 'history'})._id;
    DrawData.update(historyID, {$pop: {nums: 1}});
    DrawData.update(historyID, {$push: {nums: num}});
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
    'keypress input#takenBy': function(event) {
      if (event.charCode == 13) {
        var num = parseInt($( '#takenBy' ).val());
        updateLastTakenBy(num);
        $( '#takenBy' ).val("");
        $( '#takenBy' ).blur();
      }
    },
    'click button#clear': function() {
      updateLiveMessage("", 0);
    },
    'click button#reset': function() {
      updateLastNum(NaN);
      var lastDormID = DrawData.findOne({key: 'lastDorm'})._id;
      var lastRoomID = DrawData.findOne({key: 'lastRoom'})._id;
      DrawData.update(lastDormID, {$set: {value: ''}});
      DrawData.update(lastRoomID, {$set: {value: 'N/A'}});
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
