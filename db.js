const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://sameedsarajcic10:samed123@samedcluster.e6ajxki.mongodb.net/dbtravel_168';

mongoose.connect(mongoURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

var connection = mongoose.connection;

connection.on('error', () => {
  console.log('Mongo DB Connection failed');
});

connection.on('connected', () => {
  console.log('Mongo DB Connection Successful');
});
