import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000/api',
	headers: { 'X-Custom-Header': 'foobar' },
});

export const httpFetchVideos = async (type) => {
	const res = await instance.get(`videos/${type}`);
	return res;
};

export const httpAddComment = async (commentBody) => {
	const res = await instance.post('/comments', commentBody);
	return res;
};

export const httpFetchComment = async (comment) => {
	const res = await instance.get(`/users/find/${comment.userId}`);
	return res;
};
