if (Meteor.isClient) {
    Template.aroom.column = function() {
        n = this.name % 100 - 1;
        return "column" + Math.floor(n / 10) % 4 + 1;
    }
    Template.aroom.reset = function() {
        n = this.name % 100 - 1;
        return n % 10 == 0 && n > 0? "reset" : "";
    }
}
