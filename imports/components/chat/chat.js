import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Messages } from '../../api/messages.js';
import template from './chat.html';

class ChatCtrl {

  constructor($scope, authService) {

    $scope.viewModel(this);
    this.authService = authService;

    this.subscribe('messages');
    var decryptedMessages = []
    this.decryptedMessages = decryptedMessages;
   

    this.helpers({
      messages() {
        const selector = {};

        // Show newest tasks at the top
        return Messages.find(selector, {
          sort: {
            createdAt: 1
          }
        }).observeChanges({
          added: function (collection, fields) {

            var decryptTry = CryptoJS.AES.decrypt(JSON.parse(fields.text), authService.password).toString(CryptoJS.enc.Utf8);

            if (decryptTry) {
                decryptedMessages.push({
                text: CryptoJS.AES.decrypt(JSON.parse(fields.text), authService.password).toString(CryptoJS.enc.Utf8),
                sender: fields.sender
              });
            }
            $scope.$apply();
          }
       });
      },
    });
  }

  setUsernameAndPassword(username, password) {
    this.authService.username = username;
    this.authService.password = password;
    this.username = username;
    this.password = password;
  }

  addMessage(newMessage) {
    // encrypt the message
    var encrypted = CryptoJS.AES.encrypt(newMessage, this.authService.password);
    encrypted = {
      key: encrypted.key,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
      salt: encrypted.salt
    };
    encrypted = JSON.stringify(encrypted);

    // Insert a message into the collection
    Meteor.call('messages.insert', {text: encrypted, sender: this.authService.username});


    var bottomDiv = document.getElementById("bottom-element");
    bottomDiv.scrollTop = bottomDiv.scrollHeight;

    // Clear form
    this.newMessage = '';
  }

  clearList() {
    Meteor.call('messages.clear');
  }
}

export default angular.module('messagesList', [
  angularMeteor
])
  .component('chat', {
    templateUrl: 'imports/components/chat/chat.html',
    controller: ['$scope', 'authService', ChatCtrl],
    controllerAs: 'chatCtrl'
  }).service('authService', function() {
    return {
      username: null,
      password: null
    }
  });