// Mongo collection for all the data.
DrawData = new Meteor.Collection("drawdata");

if (Meteor.isClient) {

  // ID in the Mongo database for the document holding
  // the number currently being drawn.
  var cur_num_id;
  Template.main.cur_num = function() {
    cur_num = DrawData.find({type: "cur_num"}).fetch()[0];
    if (cur_num) {
      cur_num_id = cur_num._id;
      return cur_num.val;
    } else {
      return NaN;
    }
  }

  // Define click events for the control buttons.
  Template.main.events({
    'click input.up': function () {
      DrawData.update(cur_num_id, {$inc: {val: 1}});
    },
    'click input.down': function () {
      DrawData.update(cur_num_id, {$inc: {val: -1}});
    }
  });

}

/*
 * Test functions to insert sample data that can be used to
 * test the interfaces.
 *
 * A quarter of the rooms are randomly initialized as having
 * been drawn.
 *
 * A dorm has a 25% chance of being a house. A floor has
 * a 25% chance of being sub-free as well as a 25% chance
 * of being a quiet floor and a 25% chance of being all female.
 *
 * A dorm has between 1 and 5 floors. A floor has between
 * 10 and 40 rooms.
 *
 * by Ken
 */

function generateRooms(numRooms, floorNum) {
  rooms = [];
  size = Math.floor(Math.random() * 5) + 1;
  for (var i = 0; i < numRooms; i++) {
    room = {
      "size": size,
      "number": floorNum * 100 + i + 1,
      "breakdown": [size],
      "chance": {},
      "residents": "any", // This may conflict with an all-female floor.
      "isDrawn": Math.random() < 0.25
    }
    rooms.push(room);
  }
  return rooms;
}

function generateFloors(numFloors) {
  floors = [];
  for (var i = 0; i < numFloors; i++) {
    floor = {
      "number": i + 1,
      "subFree": Math.random() < 0.25,
      "quiet": Math.random() < 0.25,
      "allFem": Math.random() < 0.25,
      "rooms": generateRooms(Math.floor(Math.random() * 31) + 10, i + 1)
    };
    floors.push(floor);
  }
  return floors;
}

function generateFakeDorm(dormName) {
  return {
    "name": dormName,
    "isHouse": Math.random() < 0.25,
    "floors": generateFloors(Math.floor(Math.random() * 5) + 1)
  };
}

function insertSampleData() {
  if (DrawData.find().count() === 0) {
    fakeDormNames = ["Armenia", "Bulgaria", "Cyprus", "Denmark", "Estonia"];
    for (i in fakeDormNames) {
      DrawData.insert(generateFakeDorm(fakeDormNames[i]));
    }
  }
}

/*
 * Remove all data from the databse.
 */

 function removeAllData() {
  DrawData.remove({});
 }


if (Meteor.isServer) {

  // Initialize the database with a document to hold
  // the number currently being drawn.
  Meteor.startup(function () {

    // Clear the database when the server starts up.
    removeAllData();

    // Generate fake data for testing.
    insertSampleData();

    /* When the JSON is ready, use this to load data from JSON:
    var roomData = {};
    // this comes from the file: /private/seed_room_data.json
    roomData = JSON.parse(Assets.getText("seed_room_data.json"));
    roomData.forEach(funtion (hall) {
      DrawData.insert(hall);
    });
    */

    // Old code to insert a current number counter in the database.
    if (DrawData.find({type: "cur_num"}).count() === 0) {
      DrawData.insert({
        type: "cur_num",
        val: 0
      });
    }

  });

}


// Problem: we need to filter the rooms based on various queries. This will be highly annoying if we
// want to use reactive templating, as far as I know. the best solution I can think of is hiding the
// rooms NOT in the current query with CSS, and using a pinch of JQuery to clean up floors and dorms
// with all hidden rooms. A super clever way would be to make use of the fact that divs collapse when
// all their contents are floated, but I have not yet been successful there. 
// See http://jsbin.com/toxigaho/1/edit?html,css,output

// //hide floors containing no visible elements
// $('.floor').each(function(){
//  if($(this).children(':visible').length == 0) {
//    $(this).hide();
//  }
// });

// //modify embedded stylesheet
// //see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.insertRule and .deteRule
// function( $ ){
//   $.style = {
//     insertRule:function(selector,rules,contxt){
//       var context=contxt||document,stylesheet;

//       if(typeof context.styleSheets=='object'){
//         if(context.styleSheets.length){
//           stylesheet=context.styleSheets[context.styleSheets.length-1];
//         }
//         if(context.styleSheets.length){
//           if(context.createStyleSheet){
//             stylesheet=context.createStyleSheet();
//           }
//           else{
//             context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
//             stylesheet=context.styleSheets[context.styleSheets.length-1];
//           }
//         }
//         if(stylesheet.addRule){
//           for(var i=0;i<selector.length;++i){
//             stylesheet.addRule(selector[i],rules);
//           }
//         }
//       else{
//           stylesheet.insertRule(selector.join(',') + '{' + rules + '}', stylesheet.cssRules.length);  
//         }
//       }
//     }
//   };
// }
// )( jQuery );
// $(document).ready(
//     function()
//     {
//         $.style.insertRule(['p','h1'],'color:red;');
//         $.style.insertRule(['p'],'text-decoration:line-through;');
//         $.style.insertRule(['div p'],'text-decoration:none;color:blue');
//     }
// );

// //or just add, remove separate <style></style> tags on the head. Hacky but oh so clean.
// //adding
//$('head').append('<style class="tempStyle">p:hover{color:red;}</style>');
// //removing
//$(".tempStyle").each(function(){$(this).remove();})