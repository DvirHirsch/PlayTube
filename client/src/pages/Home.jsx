import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import banner from '../img/bannertest.png';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const Container = styled.div`
	/* margin-left: 140px; */
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 5px;
`;

const Banner = styled.div`
	width: 100%;
	margin-bottom: 30px;
	cursor: pointer;
`;

const BannerImg = styled.img`
	z-index: -2;
	width: 100%;
`;

const StyledIconButton = styled(CloseIcon)`
	position: absolute;
	color: ${({ theme }) => theme.text};
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

	const handleClose = () => {
		const bannerImg = document.getElementById('banner-img');
		const closeBtn = document.getElementById('close-icon');
		bannerImg.style.display = 'none';
		closeBtn.style.display = 'none';
	};

	return (
		<>
			{currentUser ? (
				<Container>
					{videos.map((video) => (
						<Card key={video._id} video={video} />
					))}
				</Container>
			) : (
				<Container>
					<IconButton aria-label="close">
						<StyledIconButton id="close-icon" onClick={handleClose} />
					</IconButton>
					<Banner>
						<Link to="signin" style={{ textDecoration: 'none' }}>
							<BannerImg id="banner-img" src={banner} alt="banner" />
						</Link>
					</Banner>
					{videos.map((video) => (
						<Card key={video._id} video={video} />
					))}
				</Container>
			)}
		</>
	);
};

export default Home;
