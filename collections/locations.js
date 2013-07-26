// ======== DB-Model: ========
// "_id" -> ID
// "name" -> string
// "description" -> string
// "users" -> [ID_users]
// ===========================

Locations = new Meteor.Collection("Locations");

Locations.allow({
   update: function (userId, doc, fieldNames, modifier) {
    return userId && true;   // allow only if UserId is present
   },
   insert: function (userId, doc) {
    return userId && true;   // allow only if UserId is present
    },
   remove: function (userId, doc) {
    return userId && true;   // allow only if UserId is present
    },

});

Meteor.publish ('locations', function(){
	return Locations.find();
});
