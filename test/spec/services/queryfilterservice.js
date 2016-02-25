'use strict';

describe('Service: QueryFilterService', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var QueryFilterService;
  beforeEach(inject(function (_QueryFilterService_) {
    QueryFilterService = _QueryFilterService_;
  }));

  it('should do something', function () {
    expect(!!QueryFilterService).toBe(true);
  });

});
