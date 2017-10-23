app.controller("listeCtrl", function($scope, $http, liste, liste_photon, eleveFactory ) {
    // $scope.monTableau = [{nom : "casagrande", prenom:"leo"},{nom : "vador", prenom:"dark"}];
    //console.log('Controller, listeCtrl');
    console.log(liste)
    console.log(liste_photon);

    $scope.maliste = liste;
    $scope.photonliste = liste_photon;
    
    console.log($scope.maliste);

    $scope.deleteEleve = function(eleve, index) { // Delete a movie. Issues a DELETE to /api/movies/:id
        console.log(eleve._id);
        console.log(index);
        eleve.$delete();
        $scope.maliste.splice(index, 1);
    };

    // $scope.deleteEleve = function(eleve){
    //     console.log(eleve);
    //     //eleveFactory.delete({userId:eleve._id});
    // };

});