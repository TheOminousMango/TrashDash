import { Random } from 'meteor/random'

QrCode = new Meteor.Collection('qr_code');

QrCode.deny({
  insert: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

QrCodeSchema = new SimpleSchema({
  Expiration: {
    type: Number,
    label: "Expiration",
    autoValue: function() {
      var date = new Date;
      //60 = 1 min
      var time = Math.round((new Date().getTime() / 1000) + 60);
      return(time);
    }
  },
  Value: {
	  type: String,
	  label: "Value",
	  autoValue: function() {
		  var val = ""
		  
		  for(var i = 0; i < 4; i++) {
			  val += Math.round(Math.random() * 9).toString();
		  }
		  
		  return val;
	  }
  }
});

QrCode.attachSchema(QrCodeSchema);
