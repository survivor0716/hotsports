'use strict';

describe('Service: getListDataService', function () {

  // load the service's module
  beforeEach(module('hotsportsApp'));

  // instantiate service
  var getListDataService;
  beforeEach(inject(function (_getListDataService_) {
    getListDataService = _getListDataService_;
  }));

  it('should do something', function () {
    expect(!!getListDataService).toBe(true);
  });

});
