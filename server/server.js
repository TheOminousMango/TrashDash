import { Meteor } from 'meteor/meteor'
import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll( '*.com' );
BrowserPolicy.content.allowFontDataUrl( '*.com' );
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.allowEval();
BrowserPolicy.content.allowInlineStyles();
//BrowserPolicy.content.allowFrameOrigin( '*' );
BrowserPolicy.framing.allowAll();

Accounts.onCreateUser(function(options, user) {
	user.role = "player";
	user.points = 0;
	return user;
});

if(Meteor.isServer) {

  Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find({_id:this.userId});
  });

  Meteor.publish('leaderboard', function() {
	return Meteor.users.find({role:"player"}, { sort: { score: -1 }, fields: {'points': 1, 'username': 1}});
  });

  Meteor.publish('mycans', function() {
	try {
		var email = Meteor.users.find({_id:this.userId}).fetch()[0].emails[0].address;
		return Can.find({owner:email});
	} catch(e) {
		return;
	}
  });

  Meteor.publish('allcans', function() {
	try {
		if(Meteor.users.find({_id:this.userId}).fetch()[0].role == "superuser") {
			return Can.find();
		} else {
			return;
		}
	} catch(e) {
		return;
	}
  });

  Meteor.methods({
		sendVerificationLink: function() {
			let userId = Meteor.userId();
			if ( userId ) {
				return Accounts.sendVerificationEmail( userId );
			}
	    },
		Redeem: function (id) {
		  if(!Meteor.user()) {
			return "Please Login"
		  } else {
			qr = QrCode.find({_id:id}).fetch();
			if(qr.length > 0) {
			  QrCode.remove({_id:qr[0]._id});
			  var my_points = Meteor.user().points;
			  Meteor.users.update({_id:Meteor.user()._id}, { $set: { points:my_points + 5 } });
			  return "Success"
			} else {
			  return "Invalid Code";
			}
		  }
		},

		SetRole: function(params) {
			if(!!Meteor.user()) {
				if(Meteor.user().role == "superuser") {
					var user = Meteor.users.find({ "username" : params.user }).fetch()[0];
					if(!!user)  {
						Meteor.users.update(user, { $set: { role:params.role } });
						return params.user + " is now a " + params.role;
					} else {
						return "User not found!";
					}
				}
			}
			return "Access Denied";
		},

		AddCan: function(params) {
			if(Meteor.user().role == "superuser") {
				var user = Meteor.users.find({ "username" : params.owner }).fetch()[0];
				if(!!user)  {
					if(user.role == "canowner") {
						var sameusers = Can.find({ can_name : params.can_name }).fetch().length;
						if(sameusers == 0) {
							Can.insert({ latitude: params.x, longitude: params.y, empty: true, owner: params.owner, can_name: params.can_name });
							return params.owner + " now owns can: " + params.can_name;
						} else {
							return "Please select a different can name.";
						}
					} else {
						return "Cannot give can to a non-can owner, set " + params.owner + " to can owner first.";
					}
				} else {
					return "User not found!";
				}
			} else {
				return "Access Denied";
			}
		}
	});

  Meteor.startup(function() {
	  
	  process.env.MAIL_URL="smtp://trashdash.project@gmail.com:Msj4LoG5TH@smtp.gmail.com:587";

      Meteor.setInterval(function() {
        var time = Math.round(new Date().getTime() / 1000);
        var qr = QrCode.remove({Expiration:{$lte:time}});
      }, 1000);
  });

}
