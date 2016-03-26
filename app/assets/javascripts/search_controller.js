root = typeof global !== "undefined" && global !== null ? global : window;
//hm. way to do it is to pull out the url
var url = "https://api.themoviedb.org/3/search/movie?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK&query="
root.angular.module("AwesomeMovieReviewsClient").controller("search", function($scope, $http)
{
    $scope.search = function()
    {
        $http.jsonp(url+$scope.query).
        success(function(data) {
            //what do I do here?
            $scope.movieList = data;
        })
    }

});