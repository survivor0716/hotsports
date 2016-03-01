'use strict';

describe('Service: AUTH_EVENTS', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var AUTHEVENTS;
  beforeEach(inject(function (_AUTHEVENTS_) {
    AUTHEVENTS = _AUTHEVENTS_;
  }));

  it('should do something', function () {
    expect(!!AUTHEVENTS).toBe(true);
  });

});
