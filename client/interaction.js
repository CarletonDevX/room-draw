if (Meteor.isClient) {

  /**************************************
   * Common
   **************************************/

  var showOverlay = function(name) {
    $(name).show();
    $(name + ' > div').hide().show(300);
    $(name).show(1).css({'background-color': 'rgba(0, 0, 0, 0.6)'});
  }

  var hideOverlay = function(name) {
    $(name + ' > div').hide(300);
    $(name).css({'background-color': 'rgba(0, 0, 0, 0)'}).delay(300).hide(1);
  }

  /**************************************
   * Header
   **************************************/

  Template.header.events({
    'click #headerLogo': function() {
      showOverlay('#info');
    }
  });

  /**************************************
   * Toolbox
   **************************************/

  // Make this neater eventually?
  var scrollHappened = false;

  // Show queries overlay.
  Template.main.events({
    'click #toolBox .left': function() {
      showOverlay('#info');
    },
    'click #toolBox .mid': function() {
      showOverlay('#queries');
      saveQueryState();
    },
    'click #toolBox .right': function() {
      showOverlay('#history');
      if (!scrollHappened) {
        console.log("GOOO")
        scrollHappened = true;
        var scrollY = $("#history .content ol").height() - $("#history .content").height();
        $("#history .content").delay(300).animate({ scrollTop: scrollY}, 500, 'easeInCubic');
      }
    }
  });

  /**************************************
   * Dorm select
   **************************************/

  var DORM_COUNT = 30; /* how not to do it right */

  Template.main.events(function () {
    Session.set("selectedDorm", 0);
    var goToDorm = function(newDorm) {
      if (newDorm >= 0 && newDorm < DORM_COUNT) {
        Session.set("selectedDorm", newDorm);
        $( '#dormSelect' ).val(newDorm);
        margin = newDorm * -100;
        $( 'ul.dorms > li:first-child' ).css('margin-left', margin + '%');
        $( '#dormLeft' ).show();
        $( '#dormRight' ).show();
        if (newDorm == 0) {
          $( '#dormLeft' ).hide();
        } else if (newDorm == DORM_COUNT - 1) {
          $( '#dormRight' ).hide();
        }
      }
      setTimeout(refreshEmpties, 0);
    };

    return {
      'click #dormLeft': function() {
        goToDorm(Session.get("selectedDorm") - 1);
      },
      'click #dormRight': function() {
        goToDorm(Session.get("selectedDorm") + 1);
      },
      'change #dormSelect': function() {
        goToDorm(parseInt($( '#dormSelect' ).val()));
      }
    };}());

  /**************************************
   * Info interface events
   **************************************/

  Template.info.events({
    'click button, click #info': function() {
      hideOverlay('#info');
      Session.set('clientDrawNumber', $("#myNumber").val());
    },
    'click #info .header, click #info .content': function(event) {
      event.stopPropagation();
    },
    'keypress #myNumber': function(event) {
      event.charCode == 13 && $( '#info button' ).click();
    }
  });

  /**************************************
   * Queries interface events
   **************************************/

  Template.query.events({
    'click button.cancel, click #queries': function() {
      if ($( window ).width() <= 480) {
        hideOverlay('#queries');
        loadQueryState();
      }
    },
    'click #queries .header, click #queries .content, click #queries .footer': function(event) {
      event.stopPropagation();
    },
    'click button.go': function() {
      hideOverlay('#queries');
      applyQueries();
    },
    'click #queries label': function() {
      if ($( window ).width() > 480) {
        setTimeout(applyQueries, 50);
      }
    }
  });

  /**************************************
   * History interface events
   **************************************/

  Template.history.events({
    'click button, click #history': function() {
      hideOverlay('#history');
    },
    'click #history .header, click #history .content': function(event) {
      event.stopPropagation();
    }
  })

   /**************************************
   * Bonus round
   **************************************/
   
  // // Try to hide address bar on mobile
  // window.addEventListener("load",function() {
  //   // Set a timeout...
  //   setTimeout(function(){
  //     // Hide the address bar!
  //     window.scrollTo(0, 1);
  //   }, 0);
  // });

  document.addEventListener('backbutton', function() {
    if (true) { // If overlay is visible
      // Hide the overlay
      console.log("Interrupted Android back button event.");
      return false;
    }
    else {
      navigator.app.exitApp();
    }
  });

}
