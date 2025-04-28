const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    githubId: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', userSchema);
