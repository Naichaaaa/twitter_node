const mongoose = require('mongoose');
process.env.NODE_ENV = 'development';
const env = require(`../environment/${ process.env.NODE_ENV }.js`);

exports.clientPromise = mongoose.connect(env.dbUrl)
        .then( () => console.log('connexion db ok !'))
        .catch( err => console.log(err));