Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.MainLayout.helpers({
  firstName: function() {
    return Meteor.user().points;
  }
});
