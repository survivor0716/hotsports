'use strict';

describe('Controller: ResVideosCtrl', function () {

  // load the controller's module
  beforeEach(module('hotsportsApp'));

  var ResVideosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResVideosCtrl = $controller('ResVideosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(ResVideosCtrl.awesomeThings.length).toBe(3);
  });
});
