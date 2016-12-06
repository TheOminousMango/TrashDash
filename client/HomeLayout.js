Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.HomeLayout.helpers({
  firstName: function() {
    return Meteor.user().points;
  }
});
