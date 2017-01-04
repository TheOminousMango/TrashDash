Deps.autorun(function(){
  Meteor.subscribe('leaderboard');
});

Template.Leaderboard.helpers({
  is_player: function() {
    if(!Meteor.user()) return false;
	else {
		return Meteor.user().role == "player";
	}
  }
});
