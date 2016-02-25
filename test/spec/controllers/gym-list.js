'use strict';

describe('Controller: GymListCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var GymListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GymListCtrl = $controller('GymListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(GymListCtrl.awesomeThings.length).toBe(3);
  });
});
