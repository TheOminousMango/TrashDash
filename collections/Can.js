Can = new Meteor.Collection('can');

Can.deny({
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

CanSchema = new SimpleSchema({
  latitude: {
    type: String,
    label: "latitude"
  },
  longitude: {
	  type: String,
	  label: "longitude"
  },
  empty: {
	  type: Boolean,
	  label: "empty",
  },
  owner: {
	  type: String,
	  label: "can_owner"
  },
  can_name: {
	  type: String,
	  label: "can_name"
  }
});

Can.attachSchema(CanSchema);
