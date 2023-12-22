import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(typeof authHeader === 'string' && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('User is not authenticated');
            }
            if(typeof decoded === 'object' && decoded.user){
                req.user = decoded.user;
                next();
            }
            
        });
        if(!token){
            res.status(403);
            throw new Error('User is not authenticated or token is missing')
        }
    }
};

export const isEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};
