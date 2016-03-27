/**
 * Created by johnfranklin on 3/26/16.
 */
root.angular.module("AwesomeMovieReviewsClient").controller("LoginController",["$scope", "$http", function($scope, $http)
{
   //user will be defined in modal this is tied to.
    $scope.login = function()
    {
        $http.post("login", $scope.user).then(function successCallback(response) {
            localStorage.email = $scope.user.email;
            localStorage.sessionVerification = response.data.sessionVerification;
        }, function errorCallback(response) {
            console.log(response);
            alert(response.data.message);
        })
    }


}])