var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Particle = require('particle-api-js');
var Twitter = require('twitter');

var Eleve = require('./models/eleve.js');

var app = express();

var Devices = require('/models/devices.js');
var EventObj = require('/models/eventsObj.js');

var resistorRead = require('/models/resistorRead.js');

var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')('http://localhost:3000');

var particle = new Particle();

// device
var token;
var myDevice = '440034000f47343438323536';

// j'instance la connection mongo 
var promise = mongoose.connect('mongodb://localhost:27017/eleve', {
    useMongoClient: true,
});

// j'instance la connection mongo 
var promise2 = mongoose.connect('mongodb://localhost:27017/ifaObjParticlePhoton', {
    useMongoClient: true
});

// quand la connection est réussie
promise.then(
    () => {
        


                console.log('db.connected');
                // je démarre mon serveur node sur le port 3000
                app.listen(3000, function() {
                    console.log('listening on 3000 and database is connected');
                });
            
    },
    err => {
        console.log('MONGO ERROR');
        console.log(err);
    }

);


// express configs
// j'utilise bodyparser dans toutes mes routes pour parser les res.body en json

// prends en charge les requetes du type ("Content-type", "application/x-www-form-urlencoded")
app.use(bodyParser.urlencoded({
    extended: true
}));
// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());
// je déclare mon dossier qui contient mes vues
app.set('views', './views');
// je déclare mon type de moteur de rendu
app.set('view engine', 'jade');

// je déclare mes fichiers statiques
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use('/app', express.static('./client'));


// je renvoie l'index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index_ang.html')
});
app.get('/profil', function(req, res) {
    res.sendFile(__dirname + '/client/profil.html')
});

app.get('/devices', function(req, res) {
    res.sendFile(__dirname + '/client/devices.html');
});

//Display a device by Id

app.get('/display/device/:id', function(req, res) {
    Devices.findOne({'id':req.params.id},function(err,objet){
        if(err){
            //res.send('Find Error' + err);
            console.log('Find Error' + err);
        }
        else {
            res.cookie('data', JSON.stringify(req.params.id));
            res.sendFile(__dirname + '/client/devices.html', { id: req.params.id });
        }
    });
});

app.get('/viewPRGraph/device/:id', function(req, res) {
    Devices.findOne({'id':req.params.id},function(err,objet){
        if(err){
            //res.send('Find Error' + err);
            console.log('Find Error' + err);
        }
        else {
            res.cookie('data', JSON.stringify(req.params.id));
            res.sendFile(__dirname + '/client/ledIntensity.html', { id: req.params.id });
        }
    });
});

// API : 
// renvoyer toute la liste des eleves
app.get('/api/liste', function(req, res) {
    Eleve.find({}, function(err, collection) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(collection);
        }
    });

});

// renvoie un seul eleve avec son id en param 
app.get('/api/liste/:id', function(req, res) {
    console.log(req.params);
    console.log(req.params.id);
    Eleve.findOne({
        "_id": req.params.id
    }, function(err, monobject) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {

            res.send(monobject);
        }
    });


});

// gère les requetes post
app.post('/new', function(req, res) {
    // console.log(req);
    console.log(req.body);
    console.log("my name is " + req.body.nom);
    // console.log("my name is " + req.body.nom);
    // var newUser = {
    //     nom: req.body.nom,
    //     prenom: req.body.prenom
    // };
    var eleveToSave = new Eleve(req.body);

    eleveToSave.save(function(err, success){
            if(err){
                return console.log(err);
            }
            else{
                console.log(success);
                res.send(success);

            }
        });
    
});
// gère la suppression
app.delete('/api/liste/:id', function(req, res) {
    console.log(req.body);
    Eleve.findByIdAndRemove(req.params.id,function(err, response){
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
            console.log("deleted");
            res.send(200);

        }
    });
    
});

// exemple de rendu html / jade
app.put('/api/liste/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    console.log(req.params.id);
    
    Eleve.findByIdAndUpdate(req.params.id,req.body, { new: true }, function (err, updatedEleve) {
      if (err) return handleError(err);
      console.log(updatedEleve);
      res.status(200).send(updatedEleve);
    });

});


// gère les requetes post
app.post('/quotes', function(req, res) {
    console.log(req.body);
    console.log("my name is " + req.body.nom);
    var newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom
    };
    res.send(200);

});


// return Device parameters by id

app.get('/devices/unique/:id', function(req,res){
    //res.send(req.params.id);
    Devices.findOne({'id':req.params.id},function(err,objet){
        if(err){
            //res.send('Find Error' + err);
            console.log('Find Error' + err);
        }
        else {
            console.log('Objet : ' + objet);
            //res.send(objet);
            return res.send(objet);
        }
    });
});

// return all devices

app.get('/devices/liste', function(req,res){

    Devices.find(function(err, collection) {
        if (err) {
            console.log(err);
            return res.send(500);
        } else {
            return res.send(collection);
        }
    });
});

/*

    Particle

*/

particle.login({username:'lusinchijordan@hotmail.fr',password:'trucmuche'}).then(
    function(data){
        token = data.body.access_token;
        console.log(token);
        var devicesPr = particle.listDevices({ auth: token });
        devicesPr.then(
            function(devices){
              //console.log('Devices: ', devices);
              devices.body.forEach(function(device){
                // console.log(device.id);
                Devices.findOne({"id":device.id}, function(err,objet){
                    if(objet) {
                        // si je trouve objet je update
                        console.log('device Update in progress');
                        var dateActu = new Date();
                        var toUpdate = new Devices(objet);
                        toUpdate.last_heard = dateActu.toISOString();
                        Devices.findByIdAndUpdate(objet._id,toUpdate,{new:true}, function(err,objet){
                            if(err){
                                console.log('Update Error ' + err);
                            }else{
                                console.log('Device updated ');
                            }
                        });

                    }
                    else if(err) {
                        console.log('Error '+ err);
                    }
                    else { 
                        // Si je trouve pas un objet avec le même id objet je l'ajoute
                        console.log('device Add in progress');
                        var toSave = new Devices(device);
                        toSave.save(function(err,success){
                            if(err){
                                console.log('Add Error '+ err);
                            }else{
                                console.log('Device added');
                            }
                        });
                    }
                })
                
              });
            },
            function(err) {
              console.log('List devices call failed: ', err);
            }
        );
        particle.getEventStream({ deviceId: myDevice,name: 'beamStatus', auth: token }).then(function(stream) {
            stream.on('event', function(data) {
                
                io.emit('newEvent',data);
                
            });
        });
        particle.getEventStream({ deviceId: myDevice,name: 'resistorReadValue', auth: token }).then(function(stream) {
            
            // console.log(stream);

            stream.on('event', function(data) {
                console.log(data)
                if( data.data > 40 ) {
                        io.emit('ledIntensityEmit',data);     
                }
                   
               
            });
        });

    },
    function(err){
        console.log('Could not login '+ err);
        }
    );
    
    app.post('/event', function(req,res){
        console.log("une requete est arrivée");
        var objet = {};
        var fnPr = particle.callFunction({ deviceId: myDevice, name: 'light', argument: 'hi', auth: token });
     
        fnPr.then(
            function(data) {
                console.log('Function called succesfully');
                var EventLight = {
                    'device':myDevice,
                    'data':data
                };
                io.emit('etatLight',EventLight);
            }, function(err) {
                console.log('An error occurred');
        });
    });
    
    
    app.post('/liste', function(req,res){
        var myPhoto = particle.getVariable({ deviceId: myDevice, name: 'analogvalue', auth: token });
        
        myPhoto.then(
            function(data) {
                console.log('Device variable retrieved successfully:', data);
            }, 
            function(err) {
                console.log('An error occurred while getting attrs:', err);
        });
    });


    //twitter

  
    var client = new Twitter({
      consumer_key: '3KOkYaopeu7G089IOqstVONRa',
      consumer_secret: '6Mc2oQGoV186LvFB7i7d8pBQkbj2ucCuPqYshpO8boe1LoLhQX',
      access_token_key: '729287540889550849-N7ZhjkHigJj1BV3644QBHVD9ez2y4ss',
      access_token_secret: 'W2ci5AzHfPEKZZnB0xuHVZjBKsSHORwIv6gAT65msv6Zh'
    });	
    