import express from 'express';
import {
	createContact, 
	getContacts,
	getContactById, 
	updateContact, 
	deleteContact,
} from '../controllers/contact.controller';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.use(verifyToken);

router.route('/contacts')
	.get(getContacts)
	.post(createContact);

router.route('/contacts/:id')
	.get(getContactById)
	.put(updateContact)
	.delete(deleteContact);

export default router;
