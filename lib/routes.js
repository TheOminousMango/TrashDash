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
		
		return correct + "";
		
	} catch(err) { 
		return false + "";
	}
}

Router.route('/', {
  name: 'home',
  action() {
	BlazeLayout.render('HomeLayout');
  }
});

Router.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('Login');
	}
});

Router.route('/signup', {
	name: 'signup',
	action() {
		BlazeLayout.render('Signup');
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
		hook(Meteor.user().role == "canowner", 'CanViewer');
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
    BlazeLayout.render('Redeem', {code:this.params.code});
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
	console.log(this.request.body)
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
		
		if(this.request.body.empty == "true") var empty = true;
		if(this.request.body.empty == "false") var empty = false;
		
		var can = Can.update({ can_name : username } , { $set: { empty: empty } } );
		this.response.end(true + "");
	} else {
		this.response.end(false + "");
	}
});

Router.route('/test', {
  where: 'server',
  name: 'test',
  action() {	
	
	var tst = "";
	
	function QRImg(callback) {
			
			var qr = QrCode.insert({});
			var QRCode = require('qrcode')
			
			QRCode.toDataURL('12345', function (err, url) {
				var getPixels = require("get-pixels")
				
				getPixels(url, function(err, pixels) {
				  var p = "";
				  
				  //console.log("1");
				  if(err) {
					console.log("Bad image path");
					//callback("error");
				  }
				  for(var i = 0; i < pixels.data.length; i++) {
					if (pixels.data[i] == 255) p += "1";
					else p += "0";
				  }
				  
				  //console.log("2");
				  //return(p);
				  tst = p;
				  callback(null);
				})
				
				//console.log("3");
				//callback(null,);
			})
	}
	
	var ugh = Meteor.wrapAsync(QRImg);
	ugh();
	//console.log("5");
	this.response.end(tst);
	
  }
});
 
/*
Router.route('/generate_qr', { where: "server" })
.post(function() {	
	var password = this.request.body.pass;
  	var username = this.request.body.user;
	var valid = canLogin(username, password);
	if(valid) {
		
			var tst = "";
			
			function QRImg(callback) {
					
					var qr = QrCode.insert({});
					var QRCode = require('qrcode')
					
					QRCode.toDataURL(qr, function (err, url) {
						var getPixels = require("get-pixels")
						
						getPixels(url, function(err, pixels) {
						  var p = "";
						  
						  //console.log("1");
						  if(err) {
							console.log("Bad image path");
							//callback("error");
						  }
						  for(var i = 0; i < pixels.data.length; i++) {
							if (pixels.data[i] == 255) p += "1";
							else p += "0";
						  }
						  
						  //console.log("2");
						  //return(p);
						  tst = p;
						  callback(null);
						})
						
						//console.log("3");
						//callback(null,);
					})
			}
			
			var ugh = Meteor.wrapAsync(QRImg);
			ugh();
			//console.log("5");
		//prev return val JSON.stringify(QrCode.find({ _id: qr }).fetch()[0].Value;
		this.response.end(JSON.stringify(tst));
	} else {
		this.response.end(JSON.stringify("incorrect"));
	}
});
*/
Router.route('/generate_qr', { where: "server" })
.post(function() {	
	this.response.end(JSON.stringify("4683"));
});
