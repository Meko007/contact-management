import { Request, Response } from 'express';
import Contact from '../models/contact.model';

//@desc Get all contacts 
//@route GET /api/contacts
//@access private
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
//@access private
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
//@access private
export const createContact = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, phoneNumber, email } = req.body;
        const user_id = (req.user as unknown as { id: string }).id;
        const contact = await Contact.create({
            firstName,
            lastName,
            phoneNumber,
            email,  
            user_id 
        });
        // const contact = await contact.create(req.body);
        res.status(201).json(contact);
    }catch(err: any){
        res.status(500).json({ message: err.message });
    }
};

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access private
export const updateContact = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if(!contact){
            return res.status(404).json({ message: `cannot find any contact with ID ${id}` });
        }

        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error(`You can't update someone else's contacts`);
            
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
//@access private
export const deleteContact = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({ message: `cannot find any contact with ID ${id}` })
        }

        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error(`You can't delete someone else's contacts`);
            
        }
        res.status(200).json(contact);
    }catch(err: any){
        res.status(500).json({ message: err.message });
    }
};
