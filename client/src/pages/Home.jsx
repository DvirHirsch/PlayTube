import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';

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
			<Container>
				{videos.map((video) => (
					<Card key={video._id} video={video} />
				))}
			</Container>
		</>
	);
};

export default Home;
