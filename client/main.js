import angular from 'angular';
import angularMeteor from 'angular-meteor';
import messagesList from '../imports/components/messagesList/messagesList';
 
angular.module('hackchat', [
  angularMeteor,
  messagesList.name
]);