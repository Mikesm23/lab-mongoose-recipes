const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const applePie = { title: "ApplePie", cuisine: "American" }
    
    Recipe.create( applePie )
      .then(recipe => console.log('The recipe is saved and its value is: ', recipe))

    Recipe.insertMany( data )
      .then(data => {data.forEach(function({ title }) {
        console.log('The recipe is saved and its value is: ', title)
      })
        return Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
        
      }).then((updated) => console.log("Success!" , updated ))
  .then(() => {
    Recipe.deleteOne( {title : "Carrot Cake"} )
      .then((deleted) => {
        console.log("Success deleting: ", deleted)
        mongoose.connection.close(() => {
          console.log('Mongoose default connection disconnected through app termination');
        });
      })      
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })