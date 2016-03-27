/**
 * Created by johnfranklin on 3/26/16.
 */
/*
describe('ReviewIndexCtrl', function(){
    var ctrl, location, resource, routeParams, scope, setupController, httpBackend, modalInstance;
    scope = null;
    ctrl = null;
    location = null;
    routeParams = null;
    resource = null;
    httpBackend  = null
    setupController = function(keywords) {
        return inject(function ($location, $routeParams, $rootScope, $resource, $httpBackend , $controller) {
            scope = $rootScope.$new();
            location = $location;
            resource = $resource;
            modalInstance = {                    // Create a mock object using spies
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };
            routeParams = $routeParams;
            routeParams.keywords = keywords;
        });
    }

    beforeEach(function(){
    setupController(keywords,recipes)
    httpBackend.flush()})
    describe('$scope.register',function(){
        //can't test opening other modal; happens outside of register controller

            var $scope = {}
            var $uibModalInstance = {}
            var controller = $controller('RegisterController', {$scope: $scope,  $uibModalInstance: $uibModalInstance})
        it("it closes the modal it's placed in after registration", function(){
            $scope.user.email= "email@email.email"
            $scope.user.password= "lockpicks"
            $scope.register();
        })
        it("sends out something", function(){
            var $scope = {}
            var $uibModalInstance = {}
            var controller = $controller('RegisterController', {$scope: $scope,  $uibModalInstance: $uibModalInstance})
            $scope.user.email= "email@email.email"
            $scope.user.password= "lockpicks"
            $scope.register();
        })
    })
    afterEach(function(){httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()})
})*/