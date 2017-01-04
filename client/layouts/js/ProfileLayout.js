Template.ProfileLayout.events({
  'submit form' ( event, template ) {
    event.preventDefault();
	
	if ($(event.target).prop("id") == "changePassword") {
		
        var oldpass = template.find( '[name="oldpassword"]' ).value;
        var newpass = template.find( '[name="newpassword"]' ).value;
        
		Accounts.changePassword(oldpass, newpass);
		
    }
  }
});

Template.ProfileLayout.helpers({
  username: function() {
    return Meteor.user().username;
  }
});