'use strict';

describe('Service: CoachService', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var CoachService;
  beforeEach(inject(function (_CoachService_) {
    CoachService = _CoachService_;
  }));

  it('should do something', function () {
    expect(!!CoachService).toBe(true);
  });

});
