'use strict';

describe('Controller: SmgymlistCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var SmgymlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SmgymlistCtrl = $controller('SmgymlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(SmgymlistCtrl.awesomeThings.length).toBe(3);
  });
});
