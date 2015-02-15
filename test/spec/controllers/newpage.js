'use strict';

describe('Controller: NewpageCtrl', function () {

  // load the controller's module
  beforeEach(module('daverastApp'));

  var NewpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewpageCtrl = $controller('NewpageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
