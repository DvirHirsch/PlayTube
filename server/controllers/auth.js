import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
	try {
		//bycrptjs encrypt the password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({ ...req.body, password: hash });
		//save the user to mongo db
		await newUser.save();
		res.status(200).send('User has been created!');
	} catch (err) {
		next(err);
	}
};
export const logout = async () => {
	axios
		.get('/api/logout')
		.then((result) => {
			console.log('logout success');
			localStorage.removeItem(token);
			history.push('/');
		})
		.catch((err) => {
			console.log(err);
		});
};

export const signin = async (req, res, next) => {
	try {
		//check if user already registered
		const user = await User.findOne({ name: req.body.name });
		if (!user) return next(createError(404, 'User not found!'));
		//compare the send user pass req to the pass inside our db, to check if it's correct or not, by bcryptjs
		const isCorrect = await bcrypt.compare(req.body.password, user.password);
		//if passwords not correct it will throw error
		if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));
		//send access token to the user to verify him, it will take the user id and create a hash token that we'll send to our user after the login process, by jsonwebtoken
		const token = jwt.sign({ id: user._id }, process.env.JWT);
		//we can see the hashed password, and we shouldn't send password like that, to prevent this we will get rid of the password before sending it to the user, by separate our user object to pass and his other details, user._doc prevent returns of unnecessary things
		const { password, ...others } = user._doc;

		//to send access token to user we use cookies
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(others);
	} catch (err) {
		next(err);
	}
};

//if we already created a google account we shouldn't create new mongodb account, so even if we try to signin again its will not create new user, it will return the exising user

//we going to find this user by email becuase its unique, else if there is a user, it means we have already registerd before so we send our cookie and info
export const googleAuth = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT);
			res
				.cookie('access_token', token, {
					httpOnly: true,
				})
				.status(200)
				.json(user._doc);
		} else {
			const newUser = new User({
				...req.body,
				fromGoogle: true,
			});
			const savedUser = await newUser.save();
			const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
			res
				.cookie('access_token', token, {
					httpOnly: true,
				})
				.status(200)
				.json(savedUser._doc);
		}
	} catch (err) {
		next(err);
	}
};
