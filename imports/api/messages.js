import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function tasksPublication() {
    return Messages.find();
  });
}
 
Meteor.methods({
  'messages.insert' (text) {
    check(text, String);
    
    if (text != "") {
      Messages.insert({
        text,
        createdAt: new Date()
      });
    }
  }
});