

Votings = new Meteor.Collection("Votings");

Votings.allow({
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