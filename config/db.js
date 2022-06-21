const mongoose = require('mongoose');

const connetDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
}
module.exports = connetDB;