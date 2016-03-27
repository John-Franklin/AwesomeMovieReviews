/**
 * Created by johnfranklin on 3/26/16.
 */
describe('search', function() {
    var scope, httpBackend, createController;
    beforeEach(module("AwesomeMovieReviewsClient"));
    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('search', {
                '$scope': scope
            });
        };
    }));
    afterEach(function() {

    });

    it('works in callback', function() {//both of these demonstrate that the functions correctly call apis. Other requirements tested on backend or are part of scaffolding or angular-scaffolding dressed up to look nicer.
        var controller = createController();
        console.log(scope)
       scope.movieList = [{id:100}];
        scope.outer(0);
        httpBackend.when('JSONP', 'http://api.themoviedb.org/3/movie/100?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK')
            .respond({
                exists:true
            });
        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        httpBackend.flush()
        expect(scope.movieList[0]).toEqual({
            exists:true
        })

    });
    it('works in main', function() {
        var controller = createController();
        scope.movieList = [];
        scope.query = 'testing'
        scope.outer = function(i){}
        scope.search();
        httpBackend.when('JSONP', 'https://api.themoviedb.org/3/search/movie?api_key=1e0d0191f8844600e0220d21e1fe0b16&callback=JSON_CALLBACK&query=testing')
            .respond({results:[{
                exists:true
            }]});
        httpBackend.flush()


        expect(scope.movieList[0].exists).toEqual(true)

    });
});