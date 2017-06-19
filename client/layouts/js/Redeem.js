Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.Redeem.helpers({
  firstName: function() {
    return Meteor.user().points;
  }
});
