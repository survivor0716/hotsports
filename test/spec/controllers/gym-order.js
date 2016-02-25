'use strict';

describe('Controller: GymorderCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var GymorderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GymorderCtrl = $controller('GymorderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(GymorderCtrl.awesomeThings.length).toBe(3);
  });
});
