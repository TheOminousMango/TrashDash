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

  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      return new Date()
    }
  }
});

QrCode.attachSchema(QrCodeSchema);
