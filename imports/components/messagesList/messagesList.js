import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Messages } from '../../api/messages.js';
 
import template from './messagesList.html';
 
class MessagesListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('messages');
 
    this.helpers({
      messages() {
        const selector = {};
 
        // Show newest tasks at the top
        return Messages.find(selector, {
          sort: {
            createdAt: 1
          }
        });
      }
    })
  }
 
  addMessage(newMessage) {
    // Insert a task into the collection
    Meteor.call('messages.insert', newMessage);
 
    // Clear form
    this.newMessage = '';
  }
}
 
export default angular.module('messagesList', [
  angularMeteor
])
  .component('messagesList', {
    templateUrl: 'imports/components/messagesList/messagesList.html',
    controller: ['$scope', MessagesListCtrl]
  });