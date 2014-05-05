if (Meteor.isClient) {

  Template.info.events({
    'keydown input#myNumber': function() {
      Session.set('clientDrawNumber', $('#myNumber').val());
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

}
