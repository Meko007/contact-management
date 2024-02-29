import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { capitalizeName } from '../utils/util';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken: string;
}

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		resetToken: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

userSchema.pre<IUser>('save', async function(next) {
	this.firstName = capitalizeName(this.firstName);
	this.lastName = capitalizeName(this.lastName);

	if (!this.isModified('password')) {
		return next();
	}
	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		console.error(error);
	}
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;