import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		//the thumbnail
		imgUrl: {
			type: String,
			required: true,
		},
		//store video url from google storage
		videoUrl: {
			type: String,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
		tags: {
			type: [String],
			default: [],
		},
		//inclued users ids who like/dislike the videos
		likes: {
			type: [String],
			default: [],
		},
		dislikes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Video', VideoSchema);
