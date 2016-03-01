'use strict';

describe('Service: RouteAuthResolve', function () {

  // instantiate service
  var RouteAuthResolve,
    init = function () {
      inject(function (_RouteAuthResolve_) {
        RouteAuthResolve = _RouteAuthResolve_;
      });
    };

  // load the service's module
  beforeEach(module('hotsportsApp'));

  it('should do something', function () {
    init();

    expect(!!RouteAuthResolve).toBe(true);
  });

  it('should be configurable', function () {
    module(function (RouteAuthResolveProvider) {
      RouteAuthResolveProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(RouteAuthResolve.greet()).toEqual('Lorem ipsum');
  });

});
