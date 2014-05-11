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
        var dataID = DrawData.findOne()._id;
        var floor = Floors.findOne({_id: this.floorID});
        var dorm = Dorms.findOne({_id: floor.dormID});
        DrawData.update(dataID, {$set: {lastDorm: dorm.name}});
        DrawData.update(dataID, {$set: {lastRoom: this.name}});
      }
    }
  });

  /*
   * Last number drawn.
   */

  Template.aheader.lastNum = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastNum;
    return NaN;
  }

  Template.aheader.events({
    'click button#numUp': function() {
      var dataID = DrawData.findOne()._id;
      DrawData.update(dataID, {$inc: {lastNum: 1}});
    },
    'click button#numDown': function() {
      var dataID = DrawData.findOne()._id;
      DrawData.update(dataID, {$inc: {lastNum: -1}});
    },
    'keypress input#lastNum': function(event) {
      if (event.charCode == 13) {
        var dataID = DrawData.findOne()._id;
        var newValue = parseInt($( '#lastNum' ).val());
        DrawData.update(dataID, {$set: {lastNum: newValue}});
        $( '#lastNum' ).blur();
      }
    }
  });

  /*
   * Last dorm drawn.
   */

   Template.aheader.lastDorm = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastDorm;
    return "";
  }

  /*
   * Last room drawn.
   */

  Template.aheader.lastRoom = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastRoom;
    return "";
  }

}
