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
      return 666;
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

if (Meteor.isServer) {

  // Initialize the database with a document to hold
  // the number currently being drawn.
  Meteor.startup(function () {
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