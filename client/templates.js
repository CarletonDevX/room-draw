if (Meteor.isClient) {

  Session.set('queryLabel', 'All rooms');
  Template.main.queryLabel = function() {
    return Session.get('queryLabel');
  }

  // Template.main.isLoaded = function() {
  //   Meteor.setTimeout(function(){Template.main.isLoaded = function() {return true}}, 2000);
  //   return false;
  // }

  Template.main.dorms = function() {
    return Dorms.find({}, {sort: {'name': 1}}).map(function(dorm, index) {
      dorm.index = index;
      return dorm;
    });
  }

  Template.dorm.floors = function() {
    return Floors.find({'dormID': this._id});
  }

  Template.floor.rooms = function() {
    return Rooms.find({'floorID': this._id});
  }

  Template.floor.ordinal = function() {
    var n = this.number;
    switch(n) {
      case 0:
      	return 'Ground';
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return n + 'th';
    }
  }

  Template.room.chanceCalc = function() {
    //return Math.round(Math.random() * 500)/10 + 50;
     var vars = this.chance;
     var num = parseInt(Session.get('clientDrawNumber')) || 1000;
     var absolutenum = num - 1000 - ((Math.floor(num/1000)-1) * 470);
     num = (absolutenum * 0.291) + 29.364;
     var p = normalProb(num, vars.mean, vars.stdev);
     return Math.round((1-p)*100);
  }
  /*
   * Header info
   */
  Template.header.lastNum = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastNum;
    return "";
  }
  Template.header.lastDorm = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastDorm;
    return "";
  }
  Template.header.lastRoom = function() {
    var obj = DrawData.findOne();
    if (obj) return obj.lastRoom;
    return "";
  }

  AccountsEntry.config({
    showSignupCode: true
  });
}