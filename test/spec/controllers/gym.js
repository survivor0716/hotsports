'use strict';

describe('Controller: GymCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var GymCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GymCtrl = $controller('GymCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(GymCtrl.awesomeThings.length).toBe(3);
  });
});
