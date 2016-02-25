'use strict';

describe('Controller: CoachListCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var CoachListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoachListCtrl = $controller('CoachListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(CoachListCtrl.awesomeThings.length).toBe(3);
  });
});
