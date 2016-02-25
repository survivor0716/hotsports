'use strict';

describe('Service: GymService', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var GymService;
  beforeEach(inject(function (_GymService_) {
    GymService = _GymService_;
  }));

  it('should do something', function () {
    expect(!!GymService).toBe(true);
  });

});
