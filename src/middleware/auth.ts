import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

export interface customReq extends Request {
    token: string | JwtPayload;
}

export const createToken = (user: IUser) => {
	const token = jwt.sign({
		userId: user._id,
		email: user.email,
	}, secret, { expiresIn: '2h' });
	return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwtToken;
    
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decodedToken = jwt.verify(token, secret);
		(req as customReq).token = decodedToken;
		next();
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		console.error(error);
	}
};
