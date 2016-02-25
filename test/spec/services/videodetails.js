'use strict';

describe('Service: VideoDetails', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var VideoDetails;
  beforeEach(inject(function (_VideoDetails_) {
    VideoDetails = _VideoDetails_;
  }));

  it('should do something', function () {
    expect(!!VideoDetails).toBe(true);
  });

});
