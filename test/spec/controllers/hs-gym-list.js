'use strict';

describe('Controller: HsgymlistCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var HsgymlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HsgymlistCtrl = $controller('HsgymlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(HsgymlistCtrl.awesomeThings.length).toBe(3);
  });
});
