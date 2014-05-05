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

  Template.aroom.id = function() {
    this._id.substring(6);
  }

}
