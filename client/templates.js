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
    return Rooms.find({'floorID': this._id}, {sort: {'name': 1}});
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

  var classSizes = {1: 1000, 2: 1476, 3: 1945};

  Template.room.chanceCalc = function() {
    //return Math.round(Math.random() * 500)/10 + 50;
    //Calculate chance
    var vars = this.chance;
    var num = parseInt(Session.get('clientDrawNumber')) || 1000;
    var x = 1
    x = num - classSizes[Math.floor(num/1000)];
    //num = (absolutenum * 0.301); Former equation
    //Fuck it let's make a special case
    if(850<x && x<1200){
      num = -(0.00000000195991903266*Math.pow(x,4))+(0.00000649423765156087*Math.pow(x,3))-(0.00704213722960390000*Math.pow(x,2))+(2.79045453780418000000*x);
    } else {
      num = (-0.00000000027459092358*Math.pow(x,4))+(0.00000085467370941562*Math.pow(x,3))-(0.00084763810123911200*Math.pow(x,2))+(0.56056896982656200000*x); 
    }
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
        if (obj.value && obj.duration) {
          var alert = document.getElementById('alert');
          alert && alert.play();
        }
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

  /*
   * History
   */
  Template.history.history = function() {
    var hist = DrawData.findOne({key: 'history'});
    if (hist) {
      if ($('#history .content').scrollTop()+$('#history .content').height()==$('#history .content ol').height()) {
        console.log("okay go");
        setTimeout(function() {
          var scrollY = $("#history .content ol").height() - $("#history .content").height();
          $("#history .content").delay(300).animate({ scrollTop: scrollY}, 500);
        }, 0);
      }
      return hist.value.map(function(name, index) {
        var num = hist.nums[index];
        if (!num) num = ""
        return {room: name, num: num, index: index + 1};
      });
    }
    return [];
  }

  AccountsEntry.config({
    showSignupCode: true
  });
}
