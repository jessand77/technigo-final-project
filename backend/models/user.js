import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15,
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex'),
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    marathonHistory: [{
        default: []
    }],
    marathonBucketlist: [{
        default: []
    }]
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model('User', userSchema);
