'use strict';

describe('Controller: SmgymoverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var SmgymoverviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SmgymoverviewCtrl = $controller('SmgymoverviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(SmgymoverviewCtrl.awesomeThings.length).toBe(3);
  });
});
