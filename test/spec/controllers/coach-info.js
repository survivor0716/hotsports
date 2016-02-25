'use strict';

describe('Controller: CoachInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var CoachInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoachInfoCtrl = $controller('CoachInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(CoachInfoCtrl.awesomeThings.length).toBe(3);
  });
});
