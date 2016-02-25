'use strict';

describe('Controller: HsgymdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var HsgymdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HsgymdetailCtrl = $controller('HsgymdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(HsgymdetailCtrl.awesomeThings.length).toBe(3);
  });
});
