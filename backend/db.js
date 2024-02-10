const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Database connection failed");
    console.log(err);
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Username already exists"],
        lowercase: true,
        minLength: 3,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
});

const User = new mongoose.model("User", userSchema);

module.exports = {
    User: User
};