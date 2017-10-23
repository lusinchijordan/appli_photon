var mongoose = require('mongoose');

var eleveSchema = mongoose.Schema({
    "nom": String, 
    "prenom": String, 
    "photon": String, 
    "contact_mail": String, 
});

// je crée un model et j'attache le schema ci dessus
var Eleve = mongoose.model('Eleves', eleveSchema);

module.exports = Eleve;