Template.TopBar.helpers({
  superuser: function() {
    return Meteor.user().role == "superuser";
  },
  canowner: function() {
    return Meteor.user().role == "canowner";
  },
  player: function() {
    return Meteor.user().role == "player";
  },
  username: function() {
	  return Meteor.user().username;
  }
});