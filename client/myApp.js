var app = angular.module("myApp", ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/liste.html',
                controller: "listeCtrl",
                resolve: {
                    liste : function(eleveFactory){
                        console.log('myApp, resolve, liste');
                
                        return eleveFactory.query();

                    },
                    liste_photon : function(photonFactory) {
                        console.log('myApp, resolve, liste');
                        return photonFactory.query(); 
                    }
                }
            })
            .when('/eleve/update/:id', {
                templateUrl: 'app/views/update.html',
                controller: "updateCtrl"
                
            })

            .when("/ajouter", {
                templateUrl: 'app/views/ajouter.html',
                controller: "addCtrl"
                
            })
            .when("/eleve/:id", {
                templateUrl: 'app/views/profil.html',
                controller: "profil.ctrl"
            })

            .when("/photon", {
                templateUrl: 'app/views/photon.html',
                controller: "devicesCtrl"
                
            })

            .when("/twitter", {
                templateUrl: 'app/views/twitter.html',
                controller: "twitCtrl"
                
            })
            .otherwise({
                redirectTo: '/',

            });
    }
]);