import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './assign.html';

class AssignCtrl {

  constructor($scope) {
    $scope.viewModel(this);
  }

  setUsernameAndPassword(username, password) {

    // to be continued


    console.log(username, password);

  }

}

export default angular.module('assign', [
  angularMeteor
])
  .component('assign', {
    templateUrl: 'imports/components/assign/assign.html',
    controller: ['$scope', AssignCtrl]
  });