ReviewsIndexCtrl = function($scope, $routeParams, Review, $http, $uibModal) {
  $scope.isntBrowse = $routeParams.movie != null;
  $scope.blank = new Review();
    $scope.params = {};
    if($routeParams.movie) {
      $scope.blank.movie = $routeParams.movie
        $http.jsonp("http://api.themoviedb.org/3/movie/"+$routeParams.movie + "?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK").success(function(data){
            $scope.movie = data;
            //not needed here. Will be needed for search.
            //$scope.movie.backdrop_path = $scope.movie.backdrop_path.slice(1);
            //$scope.movie.poster_path = $scope.movie.poster_path.slice(1);
        })
        $scope.params = {movie: $routeParams.movie};
    }

    Review.query($scope.params).$promise.then(function(elems)
    {
        $scope.reviews = elems;
        console.log(elems)
        $scope.total = 0.0;
        for(var i = 0; i < $scope.reviews.length; i++)
            $scope.total += $scope.reviews[i].rating;
        if($scope.reviews.length > 0)
        $scope.total /= $scope.reviews.length;
    })
    $scope.editModal=function(review)
    {
      $scope.currev = review;

      if(review === $scope.blank)
        $scope.reviews.push(review);
      else {
        $scope.oldRev = _.clone(review);
      }
      $scope.modalInstance = $uibModal.open({
          windowClass: "modal fade",
          animation: true,
          templateUrl: 'reviews/edit.html',
          controller: ReviewsEditCtrl,
          resolve: {//need to be able to call loginModal/
              oldScope: function () {
                  return $scope;
              }
          }
      });
      $scope.modalInstance.result.then(function(){
          // closed
          // console.log($scope.ratings)
        if(!(review.id)) {
            $scope.total = ($scope.total * ($scope.reviews.length - 1) + $scope.blank.rating) / $scope.reviews.length;
            $scope.blank = new Review();
            $scope.blank.movie = $routeParams.movie;

        }
      }, function(){
        // clicked away
        //
        if(!review.id) {
            $scope.reviews.pop();
            $scope.total = ($scope.total * ($scope.reviews.length - 1) - $scope.oldrev.rating + $scope.blank.rating) / $scope.reviews.length;
            $scope.blank = new Review();
        }
        else//snap back
          review = $scope.oldRev;

      });
        return $scope.modalInstance;
    }
};

ReviewsIndexCtrl.$inject = ['$scope', '$routeParams', 'Review', "$http", '$uibModal'];


ReviewsEditCtrl = function($scope, $location, $routeParams, Review, oldScope, $uibModalInstance) {
  $scope.review = oldScope.currev;
  $scope.isClean = function() {
    return angular.equals(this.original, $scope.review);
  };
  $scope.dismiss = function(){
    $uibModalInstance.dismiss();
  }
  return $scope.save = function() {
    console.log($scope.review)
    if($scope.review.id) {
      return Review.update($scope.review, function (review) {

          $uibModalInstance.close();
      });
    }
    else
    {
      return Review.save($scope.review, function(review) {

        $uibModalInstance.close();
      });
    }
  };
};

ReviewsEditCtrl.$inject = ['$scope', '$location', '$routeParams', 'Review', 'oldScope', '$uibModalInstance'];

