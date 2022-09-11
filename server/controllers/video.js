import User from '../models/User.js';
import Video from '../models/Video.js';
import { createError } from '../error.js';

export const addVideo = async (req, res, next) => {
	const newVideo = new Video({ userId: req.user.id, ...req.body });
	try {
		const savedVideo = await newVideo.save();
		res.status(200).json(savedVideo);
	} catch (err) {
		next(err);
	}
};

export const updateVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return next(createError(404, 'Video not found!'));
		//compare between userid and video userid, if they equal its mean that we are the owner and we'll be able to update it
		if (req.user.id === video.userId) {
			const updatedVideo = await Video.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedVideo);
		} else {
			return next(createError(403, 'You can update only your video!'));
		}
	} catch (err) {
		next(err);
	}
};

export const deleteVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return next(createError(404, 'Video not found!'));
		if (req.user.id === video.userId) {
			await Video.findByIdAndDelete(req.params.id);
			res.status(200).json('The video has been deleted.');
		} else {
			return next(createError(403, 'You can delete only your video!'));
		}
	} catch (err) {
		next(err);
	}
};

export const getVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		res.status(200).json(video);
	} catch (err) {
		next(err);
	}
};

export const addView = async (req, res, next) => {
	try {
		await Video.findByIdAndUpdate(req.params.id, {
			$inc: { views: 1 },
		});
		res.status(200).json('The view has been increased.');
	} catch (err) {
		next(err);
	}
};

export const random = async (req, res, next) => {
	try {
		//using mongodb aggregate method to get random videos
		const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const trend = async (req, res, next) => {
	try {
		//using sort method to sort all the videos, look at video views and bring me the most viewed videos(1 for less viewed, -1 for most viewed)
		const videos = await Video.find().sort({ views: -1 });
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const sub = async (req, res, next) => {
	try {
		//subscribedUsers in user model have array the will store the ids, we gonna take all those ids and find all videos of this user ids
		const user = await User.findById(req.user.id);
		const subscribedChannels = user.subscribedUsers;
		//promise loop to find every videos of all of those channels
		const list = await Promise.all(
			subscribedChannels.map(async (channelId) => {
				return await Video.find({ userId: channelId });
			})
		);
		//prevent nested array and sort method to see the newest videos first
		res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
	} catch (err) {
		next(err);
	}
};

export const getByTag = async (req, res, next) => {
	//in video model the tags array that includes strings, we will create a qurey and take all of those string and split them to separate them
	const tags = req.query.tags.split(',');
	// console.log(tags);
	try {
		//loop inside the separated strings array(tags) and search for those items by using $in mongodb method to loop inside the array and check if a specific element is inside or not
		const videos = await Video.find({ tags: { $in: tags } }).limit(20);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};

export const search = async (req, res, next) => {
	const query = req.query.q;
	try {
		//to get search result from a letter we use mongodb regex method, and for upper or lower case result we use 'i' in options
		const videos = await Video.find({
			title: { $regex: query, $options: 'i' },
		}).limit(40);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
};
