import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from '../middleware/validator';

interface User extends Document {
    username: string;
    email: string;
    password: string;
    confirmPassword: string | undefined;
}

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: [true, "Please add a username"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please add an email address"],
            trim: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: 8,
            maxLength: 1024
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (val: string): boolean {
                    return val === (this as any).password 
                },
                message: `Passwords don't match!`
            }
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next(); 

    this.password = await bcrypt.hash(this.password, 10);

    this.confirmPassword = undefined;
    next();
});


const User = mongoose.model<User>('User', userSchema);

export default User;