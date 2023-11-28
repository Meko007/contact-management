import mongoose from 'mongoose';
import { isEmail } from '../middleware/validator.js'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a username"]
        },
        email: {
            type: String,
            required: [true, "Please add an email address"],
            unique: [true, "Email address already used"],
            trim: true,
            lowercase: true,
            validate: [isEmail, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: 8,
            maxLength: 1024
        } 
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;