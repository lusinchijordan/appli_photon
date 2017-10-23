
app.controller("profil.ctrl",['$scope','$routeParams', '$http', 'eleveFactory', function($scope,$routeParams, $http, eleveFactory){
	console.log($routeParams);

	$scope.monProfil = eleveFactory.get({id : $routeParams.id});


}]);