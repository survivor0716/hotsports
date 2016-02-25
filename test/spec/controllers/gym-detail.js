'use strict';

describe('Controller: GymdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var GymdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GymdetailCtrl = $controller('GymdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(GymdetailCtrl.awesomeThings.length).toBe(3);
  });
});
