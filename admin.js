if (Meteor.isClient) {

  Template.amain.dorms = function() {
    return Dorms.find();
  }

  Template.adorm.floors = function() {
    return Floors.find({'dormID': this._id});
  }

  Template.afloor.rooms = function() {
    return Rooms.find({'floorID': this._id});
  }

  Template.aroom.events({
    'click input': function() {
      Rooms.update(this._id, {$set: {isDrawn: !this.isDrawn}});
    }
  });

  /*
   * Last number drawn
   */

  Template.aheader.lastNum = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastNum;
    return NaN;
  }

  Template.aheader.events({
    'click button#numUp': function() {
      var numID = DrawData.findOne()._id;
      DrawData.update(numID, {$inc: {lastNum: 1}});
    },
    'click button#numDown': function() {
      var numID = DrawData.findOne()._id;
      DrawData.update(numID, {$inc: {lastNum: -1}});
    },
    'keypress input#lastNum': function(event) {
      if (event.charCode == 13) {
        var numID = DrawData.findOne()._id;
        var newValue = parseInt($( '#lastNum' ).val());
        DrawData.update(numID, {$set: {lastNum: newValue}});
        $( '#lastNum' ).blur();
      }
    }
  });

}
