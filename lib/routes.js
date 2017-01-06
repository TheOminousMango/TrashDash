import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

function hook(b, layout) {
	try{
		if(b) {
			BlazeLayout.render(layout);
		} else {
			Router.go('/');
		}
	} catch(err) {
		Router.go('/');
	}
}

function canLogin(cn, pw) {
	try {		
		var can = Can.find({ can_name : cn }).fetch()[0];
		var password = {digest: Package.sha.SHA256(pw), algorithm: 'sha-256'};
		var user = Meteor.users.find({ username: can.owner }).fetch()[0];
		var result = Accounts._checkPassword(user, password);
		
		var correct = result.error == null;
		
		return correct;
		
	} catch(err) { 
		return false;
	}
}

Router.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});


Router.route('/profile', {
	name: 'profile',
	action() {
		hook(!!Meteor.user(), 'ProfileLayout');
	}
});

Router.route('/setRole', {
	name: 'setRole',
	action() {
		hook(Meteor.user().role == "superuser", 'RoleSetter');
	}
});

Router.route('/addCan', {
	name: 'addCan',
	action() {
		hook(Meteor.user().role == "superuser", 'CanCreator');
	}
});

Router.route('/canMap', {
	name: 'canMap',
	action() {
		hook(Meteor.user().role == "superuser", 'Map');
	}
});

Router.route('/viewCans', {
	name: 'viewCans',
	action() {
		hook(Meteor.user().role == "canowner", 'CanCreator');
	}
});

Router.route('/leaderboard', {
	name: 'leaderboard',
	action() {
		hook(Meteor.user().role == "player", 'Leaderboard');
	}
});



Router.route('/reset', {
	name: 'reset',
	action() {
		hook(!!Meteor.user(), 'ResetLayout');
	}
});

Router.route( '/verify-email/:token', {
  name: 'verify-email',
  action() {
    Accounts.verifyEmail( this.params.token, ( error ) =>{
      if ( error ) {
        alert( error.reason, 'danger' );
      } else {
		Router.go( '/' );
        alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});

Router.route('/redeem/:code', {
  name: 'redeem',
  action() {
    BlazeLayout.render('MainLayout', {code:this.params.code});
  }
});

Router.route('/download/:code', {
  name: 'download',
  action() {
    BlazeLayout.render('DownloadLayout');
  }
});

Router.route('/check_creds', { where: "server" })
.post(function() {
	var username = this.request.body.user;
	var password = this.request.body.pass;
	this.response.end(canLogin(username, password));	
});

Router.route('/updateCanStats', { where: "server" })
.post(function() {
	var username = this.request.body.user;
	var password = this.request.body.pass;
	var valid = canLogin(username, password);
	if(valid) {
		var can = Can.find({ can_name : username }).fetch()[0];
		//set if can is empty to this.request.body.empty;
	} else {
		
	}
});


Router.route('/generate_qr', { where: "server" })
.post(function() {	
	var password = this.request.body.pass;
  	var username = this.request.body.user;
	var valid = canLogin(username, password);
	if(valid) {
		var qr = QrCode.insert({});
		this.response.end(JSON.stringify(QrCode.find({ _id: qr }).fetch()[0]._id));
	} else {
		this.response.end(JSON.stringify("incorrect"));
	}
});
