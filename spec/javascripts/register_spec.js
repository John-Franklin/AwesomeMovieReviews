/**
 * Created by johnfranklin on 3/26/16.
 */
describe('RegisterController', function(){
    var ctrl, location, resource, routeParams, scope, setupController;
    scope = null;
    ctrl = null;
    location = null;
    routeParams = null;
    resource = null;
    setupController = function(keywords) {
        return inject(function ($location, $routeParams, $rootScope, $resource, $controller) {
            scope = $rootScope.$new();
            location = $location;
            resource = $resource;
            routeParams = $routeParams;
            routeParams.keywords = keywords;
            return ctrl = $controller('RecipesController', {
                $scope: scope,
                $location: location
            });
        });
    }

    beforeEach(module('AwesomeMovieReviewsClient'));
    beforeEach(module(setupController));
    describe('$scope.register',function(){
        it("send out an email and password, creates the account, and gets the new user with token.", function(){
            var $scope = {}
            var controller = $controller('RegisterController', {$scope: $scope})
            $scope.user.email= "email@email.email"
            $scope.user.password= "lockpicks"
            $scope.register();
            expect(localStorage.email).toEqual('email@email.email')
            expect(localStorage.jwt).not.toBe(null)
        })
    })
})