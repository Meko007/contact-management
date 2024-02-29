import { Request, Response } from 'express';
import ContactModel from '../models/contact.model';
import { customReq } from '../middleware/auth';
import { JwtPayload } from 'jsonwebtoken';
import { isEmail, validPhone } from '../utils/util';

export const createContact = async (req: Request, res: Response) => {
	try {
		const { name, phoneNumbers, email } = req.body;
		const { userId } = (req as customReq).token as JwtPayload;

		for (const phoneNumber of phoneNumbers) {
			const contactExists = await ContactModel.findOne({ user: userId, phoneNumbers: phoneNumber });

			if (contactExists) {
				return res.status(409).json({ message: 'Contact with phone number already exists.' });
			}

			if (phoneNumber.length < 5 || phoneNumber.length > 15 || !validPhone(phoneNumber)) {
				return res.status(422).json({ message: 'Enter a valid phone number' });
			}
		}

		if (email && !isEmail(email)) {
			return res.status(422).json({ message: 'Enter a valid email' });
		}

		const newContact = await ContactModel.create({
			user: userId,
			name,
			phoneNumbers,
			email: email ? email : undefined,
		});
		res.status(201).json(newContact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getContacts = async (req: Request, res: Response) => {
	try {
		const { userId } = (req as customReq).token as JwtPayload;
		const { page = 1, search } = req.query;

		const skip = (Number(page) - 1) * 10;

		const searchQuery = search
			? {
				user: userId,
				$or: [
					{ name: { $regex: new RegExp(search as string, 'i') } },
					{ 
						phoneNumbers: { 
							$elemMatch: {
								$regex: new RegExp(search as string, 'i'), 
							} 
						},
					}
				
				],
			}
			: { user: userId };

	  const contacts = await ContactModel.find(searchQuery)
			.skip(skip)
			.limit(10)
			.exec();
		
		res.status(200).json(contacts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getContactById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId } = (req as customReq).token as JwtPayload;
		const contact = await ContactModel.findOne({ _id: id, user: userId });

		if (!contact) {
			return res.status(404).json({ message: 'contact not found' });
		}

		res.status(200).json(contact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const updateContact = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId } = (req as customReq).token as JwtPayload;
		const { name, phoneNumbers, email } = req.body;

		const contactExists = await ContactModel.findOne({ _id: id, user: userId });

		if (!contactExists) {
			return res.status(404).json({ message: 'Contact not found' });
		}

		for (const phoneNumber of phoneNumbers) {
			if (phoneNumber.length < 5 || phoneNumber.length > 15 || !validPhone(phoneNumber)) {
				return res.status(422).json({ message: 'Enter a valid phone number' });
			}
		}

		if (email && !isEmail(email)) {
			return res.status(422).json({ message: 'Enter a valid email' });
		}

		const updatedContact = await ContactModel.findByIdAndUpdate(
			id,
			{
				name: name ? name : undefined,
				phoneNumbers: phoneNumbers ? phoneNumbers: undefined,
				email: email !== undefined ? email : undefined,
			},
			{ new: true },
		);
		res.status(200).json(updatedContact);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const deleteContact = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId } = (req as customReq).token as JwtPayload;

		const contactExists = await ContactModel.findOne({ _id: id, user: userId });

		if (!contactExists) {
			return res.status(404).json({ message: 'Contact not found' });
		}

		await ContactModel.findByIdAndDelete(id);
		res.status(200).json({ message: 'Contact deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};