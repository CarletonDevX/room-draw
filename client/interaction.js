if (Meteor.isClient) {
  console.log("SECOND");

  /**************************************
   * Common
   **************************************/

  var showOverlay = function(name) {
    $(name).show();
    $('# .header, # .contentbox, # .footer'.replace(/#/g, name)).hide().show(300);
    $(name).show(1).css({'background-color': 'rgba(0, 0, 0, 0.6)'});
  }

  var hideOverlay = function(name) {
    $('# .header, # .contentbox, # .footer'.replace(/#/g, name)).hide(300);
    $(name).css({'background-color': 'rgba(0, 0, 0, 0)'}).delay(300).hide(1);
  }

  /**************************************
   * Main interface events
   **************************************/

  // Show info overlay.
  Template.header.events({
    'click .infoButton': function() {
      showOverlay('#info');
    }
  });

  // Show queries overlay.
  Template.main.events({
    'click #queryField': function() {
      showOverlay('#queries');
      saveQueryState();
    }
  });

  Template.main.events(function () {
    var selectedDorm = 0;
    var goToDorm = function(newDorm) {
      var dormCount = Dorms.find().count();
      if (newDorm >= 0 && newDorm < dormCount) {
        selectedDorm = newDorm;
        $( '#dormSelect' ).val(newDorm);
        margin = selectedDorm * -100;
        $( 'ul.dorms > li:first-child' ).css('margin-left', margin + '%');
        $( '#dormLeft' ).show();
        $( '#dormRight' ).show();
        if (newDorm == 0) {
          $( '#dormLeft' ).hide();
        } else if (newDorm == dormCount - 1) {
          $( '#dormRight' ).hide();
        }
      }
    };

    return {
      'click #dormLeft': function() {
        goToDorm(selectedDorm - 1);
      },
      'click #dormRight': function() {
        goToDorm(selectedDorm + 1);
      },
      'change #dormSelect': function() {
        selectedDorm = $( '#dormSelect' ).val();
        goToDorm(selectedDorm);
      }
    };}());

  /**************************************
   * Info interface events
   **************************************/

  Template.info.events({
    'click button, click #info': function() {
      hideOverlay('#info');
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
      hideOverlay('#queries');
      loadQueryState();
    },
    'click #queries .header, click #queries .content, click #queries .footer': function(event) {
      event.stopPropagation();
    },
    'click button.go': function() {
      if($( window ).width() <= 480){ //smallest media query
        hideOverlay('#queries');
      }
      applyQueries();
    }
  });

  //  /**************************************
  //  * Bonus round
  //  **************************************/
   
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
