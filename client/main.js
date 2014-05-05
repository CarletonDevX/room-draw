if (Meteor.isClient) {
  Template.main.queryLabel = function() {
    return "All rooms";
  }

  Template.main.dorms = function() {
    return Dorms.find();
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
    var vars = this.chance;
    var num = parseInt(Session.get('clientDrawNumber')) || 0;
    var p = normalProb(num, vars.mean, vars.stddev);
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
  });

  AccountsEntry.config({
    showSignupCode: true
  });
}