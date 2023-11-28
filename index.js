import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import contactRoutes from './src/routes/contactRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();
const app = express();

connectDB();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});