'use strict';

describe('Directive: myPagination', function () {

  // load the directive's module
  beforeEach(module('hotsportsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-pagination></my-pagination>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myPagination directive');
  }));
});
