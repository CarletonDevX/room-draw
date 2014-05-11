if (Meteor.isClient) {
  
  Session.set('queryLabel', 'All rooms');
  Template.main.queryLabel = function() {
    return Session.get('queryLabel');
  }

  Template.main.dorms = function() {
    return Dorms.find({}, {sort: {'name': 1}}).map(function(dorm, index) {
      dorm.index = index;
      return dorm;
    });
  }

  var DORM_COUNT = 30; /* how not to do it right */
  var orderedIDs = [];

  Template.main.floors = function() {
    orderedIDs.length == DORM_COUNT || (orderedIDs = Dorms.find({}, {sort: {'name': 1}}).fetch().map(function(dorm, index) {return dorm._id;}));
    var dormID = orderedIDs[Session.get("selectedDorm")];
    return Floors.find({'dormID': dormID});
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
    //Calculate chance
    var vars = this.chance;
    var num = parseInt(Session.get('clientDrawNumber')) || 1000;
    var absolutenum = num - 1000 - ((Math.floor(num/1000)-1) * 470);
    num = (absolutenum * 0.301); //Y-intercept to 0 or else no one can draw Nason
    var p = normalProb(num, vars.mean, vars.stdev);
    var chance = Math.round((1-p)*100);
    if (chance == 100){
    	chance = 99;
    }
    //Decide color
    var color = "#838383"; //Default is gray
    if(chance > 70){
      color = "#b2f67c";
    } else if(chance > 40){
      color = "#f6e77c";
    } else if(chance >= 0){
      color = "#f67c7c";
    } else if(isNaN(chance) && vars.stdev == -1){
      color = "#e0e0e0";
      chance = "??"
    }
    return {"color": color, "chance": chance};
  }

  /*
   * Header info
   */
  Template.header.lastNum = function() {
    var obj = DrawData.findOne({key: 'lastNum'});
    if (obj)
      if (isNaN(obj.value)) return "N/A";
      else return obj.value;
    else return "";
  }
  Template.header.lastDorm = function() {
    var obj = DrawData.findOne({key: 'lastDorm'});
    if (obj) return obj.value;
    return "";
  }
  Template.header.lastRoom = function() {
    var obj = DrawData.findOne({key: 'lastRoom'});
    setTimeout(function() {
      $( '#lastRoom' ).textfill({
        maxFontSize: 34,
        minFontSize: 8,
        step: 1
      });
    }, 0)
    if (obj) return obj.value;
    return "";
  }
  Template.header.liveMessage = function() {
    var obj = DrawData.findOne({key: 'liveMessage'});
    if (obj) {
      if (obj.value || !obj.duration) {
        $( '#live-message' ).css('top', 0);
        if (obj.duration >= 0) {
          setTimeout(function() {
            $( '#live-message' ).css('top', -28);
          }, obj.duration);
        }
      }
      return obj.value;
    }
    return "";
  }

  AccountsEntry.config({
    showSignupCode: true
  });
}
