import Contact from "../models/contactModel.js";

//@desc Get all contacts 
//@route GET /api/contacts
//@access private
export const getContacts = async (req, res) => {
    try{
        const contacts = await Contact.find({ user_id: req.user.id });
        res.status(200).json(contacts);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Get contact 
//@route GET /api/contacts/:id
//@access private
export const getContact = async (req,res) => {
    try{
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Create new contact 
//@route POST /api/contacts
//@access private
export const createContact = async (req, res) => {
    try{
        const { firstName, lastName, phoneNumber, email } = req.body;
        const contact = await Contact.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            user_id: req.user.id 
        });
        // const contact = await contact.create(req.body);
        res.status(201).json(contact);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access private
export const updateContact = async (req, res) => {
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
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};

//@desc Delete contact 
//@route DELETE /api/contacts/:id
//@access private
export const deleteContact = async (req,res) => {
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
    }catch(err){
        res.status(500).json({ message: err.message });
    }
};
