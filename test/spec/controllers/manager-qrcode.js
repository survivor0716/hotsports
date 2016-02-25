'use strict';

describe('Controller: ManagerQrcodeCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var ManagerQrcodeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagerQrcodeCtrl = $controller('ManagerQrcodeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(ManagerQrcodeCtrl.awesomeThings.length).toBe(3);
  });
});
