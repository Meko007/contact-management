import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { createToken } from '../middleware/auth';
import bcrypt from 'bcrypt';
import { emailAddress, transporter } from '../utils/mail';
import { checkName, isEmail, random } from '../utils/util';

export const register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const userExists = await UserModel.findOne({ email });

		if (userExists) {
			return res.status(409).json({ message: `User with email ${email} already exists` });
		}

		if (checkName(firstName) || checkName(lastName)) {
			return res.status(422).json({ message: 'Your name can\'t contain special characters or numbers besides "-"' });
		}

		if (!isEmail(email)) {
			return res.status(422).json({ message: 'Enter a valid email' });
		}

		const newUser = await UserModel.create({
			firstName,
			lastName,
			email,
			password,
		});
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email }).select('+password');

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = createToken(user);
			res.cookie('jwtToken', token, { maxAge: 1000 * 60 * 120, httpOnly: true, secure: true, sameSite: 'lax' });
			res.status(200).json({ message: 'Logged in successfully' });
		} else {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie('jwtToken');
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const resetToken = random();

		await UserModel.findByIdAndUpdate(user._id, { $set: { 'resetToken': resetToken } });

		const mailOptions = {
			from: emailAddress,
			to: email,
			subject: 'Password Reset',
			text: `Click on this link: http://localhost:8080/api/v1/users/reset-password/${resetToken}`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Password reset token sent' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { resetToken } = req.params;
		const { newPassword } = req.body;
		const user = await UserModel.findOne({ resetToken });

		if (!user) {
			return res.status(404).json({ message: 'page not found' });
		}

		user.password = newPassword;
		await user.save();

		await UserModel.findByIdAndUpdate(user._id, { $set: { 'resetToken': null } });
		res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};