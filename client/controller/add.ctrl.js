app.controller("addCtrl", function($scope, $rootScope, eleveFactory, $window) {
    
    $scope.eleve = new eleveFactory();

    $scope.addEleve = function(eleve) { // Delete a movie. Issues a DELETE to /api/movies/:id
        console.log(eleve);
        eleve.$save();
        $window.location.href = '/';
    };
   

    // $scope.submitForm = function(myForm) {
    //     console.log(myForm);
    //     var newFeed = angular.copy(myForm);
    //     console.log(eleveFactory);
    //     console.log(newFeed);
    //     //$rootScope.monTableau.push($scope.person);
    //     //$scope.person = {};
    //     eleveFactory.save(newFeed);
    // };
    // // Simple GET request example:
    // $http({
    //     method: 'GET',
    //     url: 'http://localhost:3000/api/liste'
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     console.log(response);
    // }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.log(response);
    // });
});