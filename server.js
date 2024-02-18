const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const dbConfig = require ('./db');
const locationRoute = require ('./routes/locationRoute');
const userRoute = require('./routes/userRoute');

const mongoURL = 'mongodb+srv://sameedsarajcic10:samed123@samedcluster.e6ajxki.mongodb.net/dbtravel_168';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB Connection Successful');
    })
    .catch((error) => {
        console.error('Mongo DB Connection failed:', error);
    });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.log('Mongo DB Connection failed:', err);
});


app.use(express.json());
app.use(cors());

app.use('/api/locations', locationRoute);
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
});
