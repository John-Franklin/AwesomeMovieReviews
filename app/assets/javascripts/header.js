/**
 * Created by johnfranklin on 3/25/16.
 */
root = typeof global !== "undefined" && global !== null ? global : window;
root.angular.module("AwesomeMovieReviewsClient").controller("header", function($scope, $uibModal){
    $scope.user = localStorage
    //console.log($scope.user);

})