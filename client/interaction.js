if (Meteor.isClient) {
  Template.info.events({
    'keydown input#myNumber': function() {
      Session.set('clientDrawNumber', $('#myNumber').val());
    }
  });
}