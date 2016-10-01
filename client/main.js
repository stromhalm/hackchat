import angular from 'angular';
import angularMeteor from 'angular-meteor';
import chat from '../imports/components/chat/chat';

angular.module('hackchat', [
  angularMeteor,
  chat.name
]);