const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://alex:qwe@cluster0.skkw3fj.mongodb.net/twitter?retryWrites=true&w=majority';

app.use(session({
    secret: 'je suis un secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14
    },
    store: MongoStore.create({
        mongoUrl,
        ttl: 60 * 60 * 24 * 14
    })
}));