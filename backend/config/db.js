const mongoose = require('mongoose')
const connectDb = async (req,res) => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host} : ${conn.connection.name}`);
    } catch (error) {
        console.log("Database Connection Error : ",error.message)
    }
}
module.exports = connectDb