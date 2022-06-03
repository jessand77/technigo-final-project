import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex'),
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    marathons: []
});

const User = mongoose.model('User', userSchema);

export default User;
