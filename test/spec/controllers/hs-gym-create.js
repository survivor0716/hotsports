'use strict';

describe('Controller: HsgymcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var HsgymcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HsgymcreateCtrl = $controller('HsgymcreateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(HsgymcreateCtrl.awesomeThings.length).toBe(3);
  });
});
