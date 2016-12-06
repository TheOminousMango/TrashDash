Deps.autorun(function(){
  Meteor.subscribe('userData');
});

Template.HomeLayout.helpers({
  firstName: function() {
    return Meteor.user().points;
  },
  
  superuser: function() {
	  if(Meteor.user().role == "superuser") return true;
	  else return false;
  }
});
