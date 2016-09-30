import angular from 'angular';
import angularMeteor from 'angular-meteor';
import messagesList from '../imports/components/messagesList/messagesList';
import assign from '../imports/components/assign/assign';

angular.module('hackchat', [
  angularMeteor,
  messagesList.name,
  assign.name
]);