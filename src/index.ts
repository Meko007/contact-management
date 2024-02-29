import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/user.route';
import contactRoutes from './routes/contact.route';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use('/api/v1', userRoutes);
app.use('/api/v1', contactRoutes);
app.use(cors({
	credentials: true,
}));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
	connectDB();
});