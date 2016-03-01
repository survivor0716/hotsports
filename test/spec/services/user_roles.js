'use strict';

describe('Service: USER_ROLES', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var USERROLES;
  beforeEach(inject(function (_USERROLES_) {
    USERROLES = _USERROLES_;
  }));

  it('should do something', function () {
    expect(!!USERROLES).toBe(true);
  });

});
