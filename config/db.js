const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/mobile-otp';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
