// var mongoose = require('mongoose');
// var Hike = require('./hike');

// function seedDatabase() {

//   Hike.find({}, function(err, documents){
//     if(documents.length === 0) {

//       //new hike schema
//       var hike_1 = new Hike(
//         {
//           admin_id: 1,
//           name: "Maroon Creek Trail",
//           location: "Maroon Bells, Aspen, CO",
//           area: 5,
//           distance: 3.2,
//           duration: 2.5,
//           difficulty: 1,
//           feature: ["Lake"],
//           file: {name: "Maroon Bells", bin: "https://cdn.photographylife.com/wp-content/uploads/2010/11/Sunrise-at-Maroon-Bells.jpg"},
//           map: [39.0708, -106.9890],
//           info: "Information",
//           likes: 2,
//           comments: []
//         }
//       ).save(function(err) {
//         if (err) throw err;
//         console.log('Hike saved successfully!');
//       });
//     }
//   });
// }


// module.exports = seedDatabase;
