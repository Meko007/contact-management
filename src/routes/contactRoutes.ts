import express from 'express';
import {
    getContacts,
    getContact, 
    createContact, 
    updateContact, 
    deleteContact 
} from '../controllers/contactController';
import { validateToken } from '../middleware/validator';

const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
