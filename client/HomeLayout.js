Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.HomeLayout.helpers({
  username: function() {
    return Meteor.user().username;
  },

  points: function() {
    return Meteor.user().points;
  },
  
  superuser: function() {
	return Meteor.user().role == "superuser";
  },
  
  player: function() {
	  return Meteor.user().role == "player";
  },
  
  canowner: function() {
	  return Meteor.user().role == "canowner";
  }
});
