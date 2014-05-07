if (Meteor.isClient) {

  /**************************************
   * Main interface
   **************************************/

  Template.header.events({
    'click .infoButton': function() {
      $('#info').show("fast");
    }
  });

  Template.main.events({
    'click #queryField': function() {
      $('#queries').show();
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
    'keyup input#myNumber': function(event) { //little bit
      var $el = $(event.target);
      var num = parseInt($el.val().slice(-4).replace(/\D/g,''));
      if (num == 0 || isNaN(num)){ num = ""; }
      $el.val(num);
      Session.set('clientDrawNumber', num);
    },
    'click button': function () {
      $('#info').hide("fast");
    },
    'click #info': function(event) {
      $(event.target).hide("fast");
    },
    'click #info>div': function(event) {
      event.stopPropagation();
    }
  });

  /**************************************
   * Queries logic and interface
   **************************************/

  Template.query.events({
    'click button:not(.cancel)': function() {
      $('#queries').hide();
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


}
