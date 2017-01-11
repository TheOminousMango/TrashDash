Template.Login.events({
  'submit form' ( event, template ) {
    event.preventDefault();
	
	if ($(event.target).prop("id") == "login") {
		
        var usernameVar = template.find( '[name="loginusername"]' ).value;
        var passwordVar = template.find( '[name="loginpassword"]' ).value;
		
        Meteor.loginWithPassword(usernameVar, passwordVar, function (err) {
			if (err) {
				$( "#loginError" ).html( "<p>" + err + "</p>" );
			} else {
				Router.go('/');
			}
		});
	 }
  }
});