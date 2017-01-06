Template.Signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
	
	if ($(event.target).prop("id") == "login") {
		
        var usernameVar = template.find( '[name="loginusername"]' ).value;
        var passwordVar = template.find( '[name="loginpassword"]' ).value;
		
        Meteor.loginWithPassword(usernameVar, passwordVar, function (err) {
			if (err) {
				$( "#loginError" ).append( "<p>" + err + "</p>" );
			} else {
				hideAll();
			}
		});
		
    } else if ($(event.target).prop("id") == "signup") {
		let user = {
		  username: template.find( '[name="username"]' ).value,
		  email: template.find( '[name="emailAddress"]' ).value,
		  password: template.find( '[name="password"]' ).value
		};
		
		
		Accounts.createUser( user, ( error ) => {
		  if ( error ) {
			 //replace with absolute div
			 alert(error, 'danger' );
		  } else {
			Meteor.call( 'sendVerificationLink', ( error, response ) => {
			  if ( error ) {
				//replace with absolute div
				alert( error.reason, 'danger' );
			  } else {
				//replace with absolute div
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
