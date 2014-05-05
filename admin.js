if (Meteor.isClient) {
    Template.room.column = function() {
        n = this.name % 100 - 1;
        return "column" + Math.floor(n / 10) % 4 + 1;
    }
    Template.room.reset = function() {
        n = this.name % 100 - 1;
        return n % 10 == 0 && n > 0? "reset" : "";
    }
}
