import jwt from 'jsonwebtoken';
import { createError } from './error.js';

//we take the access token from our cookie when we signin, if there is no token return an error
export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) return next(createError(401, 'You are not authenticated!'));
	//verify that the token is valid or not
	jwt.verify(token, process.env.JWT, (err, userData) => {
		if (err) return next(createError(403, 'Token is not valid!'));
		req.user = userData;
		next();
	});
};
