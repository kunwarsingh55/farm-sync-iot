const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://kunwarsingh:qwerty1@cluster0.emgrmkk.mongodb.net/farm?retryWrites=true&w=majority";

//Make a connection function then to call from index.js.
//You can connect to MongoDB with the mongoose.connect() method.
//connect() function also accepts a callback parameter and returns a promise.

const connectDb =()=>{
    mongoose.connect(DB_URL).then(
        ()=>{ console.log("Connected to the database");},
        err=> { console.log(err); }
    );
}
mongoose.set('strictQuery', false);

module.exports = connectDb;


