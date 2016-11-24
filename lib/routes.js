import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
/*
//USE IF NEED MORE USERS
Router.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});*/

Router.route('/generate_qr', { where: "server" })
.post(function() {
  var user_exists = false;

  var user = Meteor.users.find({ "emails.address" : this.request.body.user }).fetch()[0];
  if(!!user) {
    var password = {digest: Package.sha.SHA256(this.request.body.pass), algorithm: 'sha-256'};
    var result = Accounts._checkPassword(user, password);
    user_exists = result.error == null;
  }

  if(user_exists) {
    var content = "";
    for(var i = 0; i < 32; i++) {
          content += Math.round(Math.random());
    }

    QrCode.insert({ _code: content });
    this.response.end(JSON.stringify(content));
  } else {
    this.response.end(JSON.stringify("incorrect login"));
  }
});
