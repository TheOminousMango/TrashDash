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

//USE IF NEED MORE USERS
Router.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
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
    var qr = QrCode.insert({});
    this.response.end(JSON.stringify(QrCode.find({ _id: qr }).fetch()[0]._id));
  } else {
    this.response.end(JSON.stringify("incorrect login"));
  }
});
