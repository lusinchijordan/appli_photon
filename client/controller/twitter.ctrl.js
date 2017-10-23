app.controller('twitCtrl', ['$scope', function($scope){
	$scope.twitListe=[];
	$scope.load = true;
	
	socket.on("newTwit",function(socket){
			console.log(socket);
			$scope.twitListe.push(socket);
			$scope.load = false;
			$scope.$apply();
    });

}])