var seeder = require('mongoose-seeder'),
    data = require('./data.json');
var mongoose = require('mongoose');
var config = require('../../../config');
require('./hike');
require('./stream');

mongoose.connect(config.MONGO_URI['development'], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.MONGO_URI['development']);

    seeder.seed(data).then(function(dbData) {
      console.log(dbData);
    }).catch(function(err) {
      console.log('Error seeding database: '+err);
    });
      }
});


