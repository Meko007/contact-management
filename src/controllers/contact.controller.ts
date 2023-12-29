import { Request, Response } from 'express';
import Contact from '../models/contact.model';

//@desc Get all contacts 
//@route GET /api/contacts
//@access public
export const getContacts = async (req: Request, res: Response) => {
	try{
		const contacts = await Contact.find({});
		res.status(200).json(contacts);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
};

//@desc Get contact 
//@route GET /api/contacts/:id
//@access public
export const getContact = async (req: Request, res: Response) => {
	try{
		const { id } = req.params;
		const contact = await Contact.findById(id);
		res.status(200).json(contact);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
};

//@desc Create new contact 
//@route POST /api/contacts
//@access public
export const createContact = async (req: Request, res: Response) => {
	try{
		const { firstName, lastName, phoneNumber, email } = req.body;
		const contact = await Contact.create({
			firstName,
			lastName,
			phoneNumber,
			email,
		});
		// const contact = await contact.create(req.body);
		res.status(201).json(contact);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
};

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access public
export const updateContact = async (req: Request, res: Response) => {
	try{
		const { id } = req.params;
		const contact = await Contact.findById(id);
		if(!contact){
			return res.status(404).json({ message: `cannot find any contact with ID ${id}` });
		}

		const updatedcontact = await Contact.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedcontact);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
};

//@desc Delete contact 
//@route DELETE /api/contacts/:id
//@access public
export const deleteContact = async (req: Request, res: Response) => {
	try{
		const { id } = req.params;
		const contact = await Contact.findByIdAndDelete(id);
		if(!contact){
			return res.status(404).json({ message: `cannot find any contact with ID ${id}` });
		}
		res.status(200).json(contact);
	}catch(err: any){
		res.status(500).json({ message: err.message });
	}
};
