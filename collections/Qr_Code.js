QrCode = new Meteor.Collection('qr_code');

QrCodeSchema = new SimpleSchema({
  _code: {
    type: String,
    label: "Content",
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
