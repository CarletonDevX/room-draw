/*
 * queries.js
 *
 * Functions for handling filter logic:
 * – refreshEmpties() // called when query changes or dorm changes
 * – saveQueryState()
 * – loadQueryStat()
 * – applyQueries()
 */

if (Meteor.isClient) {

  var empty_message = 'no matches in this dorm';
  refreshEmpties = function() {
    // Refresh
    // $('.dorm').each(function(){$(this).show();})
    $('.floor').each(function(){$(this).show();})
    // $('#dormSelect').children().prop('disabled', false);
    console.log("Refresh.");
    $( '.empty-message' ).remove();
    // Hide empty floors
    $('.floor').each(function() {
      if($(this).children('.rooms').children(':visible').length == 0) {
        $(this).hide();
      }
    });
    // Show empty dorm message if empty
    $('.dorm').each(function() {
      if($(this).children('.floors').children(':visible').length == 0) {
        console.log("It''s empty!");
        $(this).children('.floors').prepend('<p class="empty-message"> (' + empty_message + ') </p>');
        // $(this).hide();
        // dormName = $(this).children('h4').text();
        // $('#dormSelect').children("option[value*='" + dormName + "']").prop("disabled", true);
      }
    });
  }

  // Saved checked state of inputs.
  var savedQueryState = {};

  // Remember checked state of inputs.
  saveQueryState = function() {
    $( '#queries .content input' ).each(function() {
      savedQueryState[$(this).attr('id')] = $(this).prop('checked');
    });
  }

  // Return the checked state of inputs to the stored values.
  loadQueryState = function() {
    for (var id in savedQueryState) {
      $( '#queries #' + id ).prop('checked', savedQueryState[id]);
    }
  }

  // Apply CSS to hide rooms according to the options selected in the query box.
  // Also, update the filter message on the main view.
  applyQueries = function() {
    
    // Determine which room classes to hide.
    hideClasses = []
    // Hide room sizes that aren't checked.
    for (var i = 1; i < 7; i++)
      if (!$( '#roomSize' + i ).prop('checked'))
        hideClasses.push('.size' + i)
    // Hide according to sub-free preferences.
    if ($( '#subFreeYes' ).prop('checked')) hideClasses.push('.notSubFree');
    else if ($( '#subFreeNo' ).prop('checked')) hideClasses.push('.subFree');
    // Hide according to quiet preferences.
    if ($( '#quietYes' ).prop('checked')) hideClasses.push('.notQuiet');
    else if ($( '#quietNo' ).prop('checked')) hideClasses.push('.quiet');
    // Hide according to gender preferences.
    if ($( '#hideMale' ).prop('checked')) hideClasses.push('.onlyMale');
    if ($( '#hideFemale' ).prop('checked')) hideClasses.push('.onlyFemale');
    // Hide taken rooms if checked.
    if ($( '#hideTaken' ).prop('checked')) hideClasses.push('.isDrawn');

    // Reset so that nothing is hidden.
    $(".tempStyle").each(function(){$(this).remove();})

    // Apply a new temporary stylesheet to hide things.
    classesString = hideClasses.join();
    $('head').append('<style class="tempStyle">'+ classesString + '{display:none;}</style>');

    refreshEmpties();

    // Update filter message on main view.
    Session.set('queryLabel', hideClasses.length? 'Filtered…' : 'All rooms');

  }

}