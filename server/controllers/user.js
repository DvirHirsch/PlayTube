import { createError } from '../error.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

export const update = async (req, res, next) => {
	//we going to compare the userid and the jwt-userid(in verifyToken) to check if they are equal, if they are it's means that im the owner of the user so i be able to update it, if i'll try to update other user using other user's id its will not gonna match with our jwt-userid and it will send an error
	if (req.params.id === req.user.id) {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				//will return the newest version of our user
				{ new: true }
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			next(err);
		}
	} else {
		return next(createError(403, 'You can update only your account!'));
	}
};

export const deleteUser = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json('User has been deleted.');
		} catch (err) {
			next(err);
		}
	} else {
		return next(createError(403, 'You can delete only your account!'));
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

export const subscribe = async (req, res, next) => {
	try {
		//we taking userid in sub router, we will add this userid to our subsribedUsers array in the user model by using $push mongodb method, then we gonna find this other channel and increase its subs number
		//req.user.id = our jwt userid, req.params.id = other channel's userid
		await User.findByIdAndUpdate(req.user.id, {
			$push: { subscribedUsers: req.params.id },
		});
		//find the other channel's userid and increase his subs number by using $inc mongodb increment method
		await User.findByIdAndUpdate(req.params.id, {
			$inc: { subscribers: 1 },
		});
		res.status(200).json('Subscription successfull.');
	} catch (err) {
		next(err);
	}
};

export const unsubscribe = async (req, res, next) => {
	try {
		try {
			await User.findByIdAndUpdate(req.user.id, {
				$pull: { subscribedUsers: req.params.id },
			});
			await User.findByIdAndUpdate(req.params.id, {
				$inc: { subscribers: -1 },
			});
			res.status(200).json('Unsubscription successfull.');
		} catch (err) {
			next(err);
		}
	} catch (err) {
		next(err);
	}
};

export const like = async (req, res, next) => {
	const id = req.user.id;
	const videoId = req.params.videoId;
	try {
		//$push method will duplicate the userid if user liked a video again, to prevent that we use $addToSet method that make sure the id will be only once in the array, and if user disliked the video before, it will pull his userid out from there
		await Video.findByIdAndUpdate(videoId, {
			$addToSet: { likes: id },
			$pull: { dislikes: id },
		});
		res.status(200).json('The video has been liked.');
	} catch (err) {
		next(err);
	}
};

export const dislike = async (req, res, next) => {
	const id = req.user.id;
	const videoId = req.params.videoId;
	try {
		await Video.findByIdAndUpdate(videoId, {
			$addToSet: { dislikes: id },
			$pull: { likes: id },
		});
		res.status(200).json('The video has been disliked.');
	} catch (err) {
		next(err);
	}
};
