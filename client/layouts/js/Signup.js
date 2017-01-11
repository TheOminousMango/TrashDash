Template.Signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
	
	if ($(event.target).prop("id") == "signup") {
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
		
		Router.go('/');
    }
  }
});