import mongoose from 'mongoose';
import { isEmail } from '../middleware/validator';

const contactSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: String,
			required: true
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: true,
			validate: [isEmail, 'Please fill a valid email address']
		}
	},
	{ timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;