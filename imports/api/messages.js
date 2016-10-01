import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });
}
 
Meteor.methods({
  'messages.insert' (message) {
    //check(message.text, String);
    check(message.sender, String);
    
    if (message.text != "") {
      Messages.insert({
        text: message.text,
        sender: message.sender,
        createdAt: new Date()
      });
    }
  },
  'messages.clear' () {
    Messages.remove({});
  }
});