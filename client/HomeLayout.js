Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.HomeLayout.helpers({
  firstName: function() {
    return Meteor.user().points;
  },
  
  superuser: function() {
	return Meteor.user().role == "superuser";
  },
  
  player: function() {
	  return Meteor.user().role == "player";
  }
});
