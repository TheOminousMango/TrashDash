Template.Signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
	
	console.log($(event.target).prop("id"));
	
	if ($(event.target).prop("id") == "login") {
		
        var usernameVar = template.find( '[name="loginusername"]' ).value;
        var passwordVar = template.find( '[name="loginpassword"]' ).value;
        Meteor.loginWithPassword(usernameVar, passwordVar, function (err) {
			if (err) {
				alert(err);
			}
		});
		hideAll();
		
    } else if ($(event.target).prop("id") == "signup") {
		let user = {
		  username: template.find( '[name="username"]' ).value,
		  email: template.find( '[name="emailAddress"]' ).value,
		  password: template.find( '[name="password"]' ).value
		};
		
		
		Accounts.createUser( user, ( error ) => {
		  if ( error ) {
			 alert(error, 'danger' );
		  } else {
			Meteor.call( 'sendVerificationLink', ( error, response ) => {
			  if ( error ) {
				alert( error.reason, 'danger' );
			  } else {
				alert( 'Welcome!', 'success' );
			  }
			});
		  }
		});
		
		hideAll();
    }
  }
});

Template.Signup.helpers({
  username: function() {
    return Meteor.user().username;
  }, 
  points: function() {
    return Meteor.user().points;
  } 
});
