ReviewsIndexCtrl = function($scope, $routeParams, Review, $http, $uibModal) {
  $scope.isntBrowse = $routeParams.movie != null;
  $scope.blank = new Review();
    if($routeParams.movie) {
      $scope.blank.movie = $routeParams.movie
        $http.jsonp("http://api.themoviedb.org/3/movie/"+$routeParams.movie + "?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK").success(function(data){
            $scope.movie = data;
            //not needed here. Will be needed for search.
            //$scope.movie.backdrop_path = $scope.movie.backdrop_path.slice(1);
            //$scope.movie.poster_path = $scope.movie.poster_path.slice(1);
        })
        $scope.reviews = Review.query({movie: $routeParams.movie}, $scope.getAverage);
    }
    else
        $scope.reviews = Review.query($scope.getAverage);
    $scope.getAverage = function(elems)
    {
        $scope.total = 0;
        for(var i = 0; i < $scope.reviews.length; i++)
            $scope.total += $scope.reviews[i].rating;
        if($scope.reviews.length > 0)
        $scope.total /= $scope.reviews.length
    }
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
        if(!(review.id))
          $scope.total = ($scope.total * ($scope.reviews.length - 1) + $scope.blank.rating)/$scope.reviews.length;
      }, function(){
        // clicked away
        //
        if(!review.id)
          $scope.reviews.pop();
        else//snap back
          review = $scope.oldRev;

      });
    }

  return $scope.destroy = function() {
    var original;
    if (confirm("Are you sure?")) {
      original = this.review;
      return this.review.destroy(function() {
        return $scope.reviews = _.without($scope.reviews, original);
      });
    }
  };
};

ReviewsIndexCtrl.$inject = ['$scope', '$routeParams', 'Review', "$http", '$uibModal'];

ReviewsCreateCtrl = function($scope, $location, Review) {
  return $scope.save = function() {
    return Review.save($scope.review, function(review) {
      return $location.path("/reviews/" + review.id + "/edit");
    });
  };
};

ReviewsCreateCtrl.$inject = ['$scope', '$location', 'Review'];

ReviewsShowCtrl = function($scope, $location, $routeParams, Review) {
  Review.get({
    id: $routeParams.id
  }, function(review) {
    this.original = review;
    return $scope.review = new Review(this.original);
  });
  return $scope.destroy = function() {
    if (confirm("Are you sure?")) {
      return $scope.review.destroy(function() {
        return $location.path("/reviews");
      });
    }
  };
};

ReviewsShowCtrl.$inject = ['$scope', '$location', '$routeParams', 'Review'];

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
