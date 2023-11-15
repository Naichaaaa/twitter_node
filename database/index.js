const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alex:qwe@cluster0.skkw3fj.mongodb.net/twitter?retryWrites=true&w=majority')
        .then( () => console.log('connexion db ok !'))
        .catch( err => console.log(err));