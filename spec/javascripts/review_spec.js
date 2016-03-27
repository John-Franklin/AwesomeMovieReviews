/**
 * Created by johnfranklin on 3/26/16.
 */
//While this was automatically generated, I added a lot of code to it so I'll test that.
describe('LoginController', function(e){
    beforeEach(module('app'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));
    describe('$scope.login',function(){
        it("sends out an email and password and stores a token and the email", function(){
            var $scope = {}
            var controller = $controller('LoginController', {$scope: $scope})
            $scope.user.email= "email@email.email"
            $scope.user.password= "lockpicks"
            $scope.login();
            expect(localStorage.email).toEqual('email@email.email')
            expect(localStorage.jwt).not.toBe(null)
        })
    })
})