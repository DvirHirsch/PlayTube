import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
	/* margin-left: 140px; */
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 5px;
`;
const Hr = styled.hr`
	margin: 10px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Home = ({ type }) => {
	const [videos, setVideos] = useState([]);

	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axios.get(`/videos/${type}`);
			setVideos(res.data);
		};
		//we create function and call it because we cant use async inside useEffect
		fetchVideos();
	}, [type]);

	return (
		<>
			{/* {currentUser ? ( */}
			<Container>
				{videos.map((video) => (
					<Card key={video._id} video={video} />
				))}
			</Container>
			{/* // ) : (
			// 	// 'hello put banner here'
			// )} */}
		</>
	);
};

export default Home;
