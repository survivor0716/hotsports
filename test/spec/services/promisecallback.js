'use strict';

describe('Service: PromiseCallback', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var PromiseCallback;
  beforeEach(inject(function (_PromiseCallback_) {
    PromiseCallback = _PromiseCallback_;
  }));

  it('should do something', function () {
    expect(!!PromiseCallback).toBe(true);
  });

});
