import { Meteor } from 'meteor/meteor'

if(Meteor.isServer) {

  Meteor.startup(function() {
      Meteor.setInterval(function() {
        var time = Math.round(new Date().getTime() / 1000);
        var qr = QrCode.remove({Expiration:{$lte:time}});
      }, 1000);
  });

}
