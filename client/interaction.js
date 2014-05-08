if (Meteor.isClient) {

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
   * Main interface
   **************************************/

  Template.header.events({
    'click .infoButton': function() {
      showOverlay('#info');
    }
  });

  Template.main.events({
    'click #queryField': function() {
      showOverlay('#queries');
    }
  });

  Template.main.events(function () {
    var selectedDorm = 0;

    var goToSelectedDorm = function() {
      margin = selectedDorm * -100;
      $( 'ul.dorms > li:first-child' ).css('margin-left', margin + '%');
    };

    return {
      'click #dormLeft': function() {
        if (selectedDorm > 0) {
          selectedDorm--;
          $( '#dormSelect' ).val(selectedDorm);
          goToSelectedDorm();
        }
      },
      'click #dormRight': function() {
        if (selectedDorm < Dorms.find().count() - 1) {
          selectedDorm++;
          $( '#dormSelect' ).val(selectedDorm);
          goToSelectedDorm();
        }
      },
      'change #dormSelect': function() {
        selectedDorm = $( '#dormSelect' ).val();
        goToSelectedDorm();
      }
    };}());

  /**************************************
   * Info screen interface
   **************************************/

  Template.info.events({
    'click button, click #info': function () {
      hideOverlay('#info');
    },
    'click #info .header, click #info .content': function(event) {
      event.stopPropagation();
    }
  });

  /**************************************
   * Queries logic and interface
   **************************************/

  Template.query.events({
    'click button.cancel, click #queries': function() {
      hideOverlay('#queries');
    },
    'click #queries .header, click #queries .content, click #queries .footer': function(event) {
      event.stopPropagation();
    },
    'click button:not(.cancel)': function() {
      hideOverlay('#queries');
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
      $('head').append('<style class="tempStyle">'+ classesString + '{display:none;}</style>');

      // Hide empty floors
      $('.floor').each(function(){
        if($(this).children('.rooms').children(':visible').length == 0) {
          $(this).hide();
        }
      });

      // Hide empty dorms
      $('.dorm').each(function(){
        if($(this).children('.floors').children(':visible').length == 0) {
          $(this).hide();
          dormName = $(this).children('h4').text();
          $('#dormSelect').children("option[value*='" + dormName + "']").attr("disabled", "yea");
        }
      });

    }
  });

   /**************************************
   * Bonus round
   **************************************/
   
  // Try to hide address bar on mobile
  window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);
  });

}
