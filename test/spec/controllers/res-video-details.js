'use strict';

describe('Controller: ResVideoDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var ResVideoDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResVideoDetailsCtrl = $controller('ResVideoDetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(ResVideoDetailsCtrl.awesomeThings.length).toBe(3);
  });
});
