import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('todos');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}
 
Meteor.methods({
  'tasks.insert' (text) {
    check(text, String);
 
    Tasks.insert({
      text,
      createdAt: new Date()
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
});