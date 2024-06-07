const mongoose = require('mongoose');

const connectDB= ()=>{
   return mongoose.connect(process.env.MONGO_URI);
}

console.log(`MonogoDb connected`);

module.exports = connectDB;