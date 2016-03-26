(function(){root = typeof global !== "undefined" && global !== null ? global : window;
//hm. way to do it is to pull out the url
var url = "https://api.themoviedb.org/3/search/movie?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK&query="
root.angular.module("AwesomeMovieReviewsClient").controller("search", function($scope, $http)
{
    $scope.outer = function(i){
        $http.jsonp("http://api.themoviedb.org/3/movie/"+ $scope.movieList[i].id + "?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK").success(function(data){
            $scope.movieList[i] = data;
        })
    }
    $scope.search = function()
    {
        $scope.noResults = false;
        $http.jsonp(url+$scope.query).
        success(function(data) {
            //what do I do here?

            $scope.movieList = data.results;
            for(var i = 0; i < $scope.movieList.length; i++)//needed due to output error on generic search.
            {
                $scope.outer(i);
                // necessary to get genre unfortunately.

            }
            if($scope.movieList.length == 0)
                $scope.noResults = true;
            })

    }

})}).call(this)