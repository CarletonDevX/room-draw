/*
 * Helper functions for manipulating the database through the console.
 */

function find(dorm, floor, room) {
    var did = Dorms.findOne({name: dorm})._id
    var f = Floors.findOne({number: floor, dormID: did})._id
    return Rooms.findOne({name: room, floorID: f})
}

var dormIDs = Dorms.find().fetch().map(function(dorm, index) {return dorm._id});
var floorsForDorm = function(dormID) {
    return Floors.find({dormID: dormID}).fetch().map(function(floor, index) {return floor._id});
}

var counts = function(roomsize) {
    return dormIDs.map(function(id, index) {
        var floorIDs = floorsForDorm(id);
        var rooms = Rooms.find({isDrawn: false, size: "" + roomsize, floorID: {$in: floorIDs}}).count()
        return rooms
    });
}

Array.prototype.sum = function(){
for(var i=0,sum=0;i<this.length;sum+=this[i++]);
return sum;
}

/*
 * Adjust probabilities
 */

var get = function(r) {
    room = find(dorm, floor, r)
    return room.chance
}

var setm = function(m, r) {
    var x = typeof r !== 'undefined' ? find(dorm, floor, r) : room;
    Rooms.update(x._id, {$set: {"chance.mean": m}});
}

var sets = function(s, r) {
    var x = typeof r !== 'undefined' ? find(dorm, floor, r) : room;
    Rooms.update(x._id, {$set: {"chance.stdev": s}});
}




var h = DrawData.findOne({key: "history"})._id
DrawData.update(h, {$set: {'value.172': '-------'}})

function hist_name(i, n) {
    var dict = {}
    dict['value.' + (i-1)] = n;
    DrawData.update(h, {$set: dict})
}

function hist_num(i, n) {
    var dict = {}
    dict['nums.' + (i-1)] = n;
    DrawData.update(h, {$set: dict})
}
