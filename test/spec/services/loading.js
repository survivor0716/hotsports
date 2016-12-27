'use strict';

describe('Service: loading', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var loading;
  beforeEach(inject(function (_loading_) {
    loading = _loading_;
  }));

  it('should do something', function () {
    expect(!!loading).toBe(true);
  });

});
