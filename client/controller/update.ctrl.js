app.controller("updateCtrl", function($scope, $rootScope, eleveFactory, $routeParams, $window) {

    $scope.eleve = eleveFactory.get({id : $routeParams.id});
    
    console.log($scope.eleve);
    //$scope.eleve = new eleveFactory();

    $scope.updateEleve = function(eleve) { // Delete a movie. Issues a DELETE to /api/movies/:id
        console.log(eleve);
        eleve.$update(eleve);
        $window.location.href = '/';
    };
   

    
});