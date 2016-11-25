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
  _code: {
    type: String,
    label: "Content",
    autoValue: function() {
      var content = "";
      for(var i = 0; i < 32; i++) {
            content += Math.round(Math.random());
      }
      return content;
    }
  },

  Expiration: {
    type: Number,
    label: "Expiration",
    autoValue: function() {
      var date = new Date;
      //60 = 1 min
      var time = Math.round((new Date().getTime() / 1000) + 60);
      return(time);
    }
  }
});

QrCode.attachSchema(QrCodeSchema);
