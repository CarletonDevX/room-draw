if (Meteor.isClient) {

    Template.amain.dorms = function() {
        return DormData.find();
    };

    Template.aroom.events({
        'click input': function() {
            console.log(this._id);
            // DormData.update(this._id, {isDrawn: !this.isDrawn});
        }
    });

}
