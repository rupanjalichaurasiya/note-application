const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const connectDB = async() => {
    const URL = 'mongodb+srv://rupanjalichaurasiya21b:KsQq54nvupOrrmqL@cluster0.0m2obae.mongodb.net/';
try {
    const conn = await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('database connected');
} catch (error) {
    console.log(error);
}
}


module.exports = connectDB;