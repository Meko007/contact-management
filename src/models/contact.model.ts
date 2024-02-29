import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IContact extends Document {
	user: Types.ObjectId;
	name: string;
	phoneNumbers: string[];
    email: string;
}

const contactSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		phoneNumbers: {
			type: [String],
			default: [],
			required: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
	},
	{ timestamps: true },
);

const ContactModel = mongoose.model<IContact>('Contact', contactSchema);

export default ContactModel;