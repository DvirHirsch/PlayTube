import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	height: 100vh;
`;

const ResultsFor = styled.h4`
	text-align: center;
	font-weight: 400;
	color: ${({ theme }) => theme.searchTxt};
`;

const SearchedQuery = styled.text`
	font-size: 25px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
	margin: 10px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Search = () => {
	const [videos, setVideos] = useState([]);
	const query = useLocation().search;

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axios.get(`/videos/search${query}`);
			setVideos(res.data);
		};
		fetchVideos();
	}, [query]);

	//function to take only the query
	const getParameterByName = (name, url = window.location.href) => {
		name = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	};

	return (
		<>
			<ResultsFor>
				{'Results for '}
				<SearchedQuery>"{getParameterByName('q')}"</SearchedQuery>
			</ResultsFor>
			<Hr />
			<Container>
				{videos.map((video) => (
					<Card key={video._id} video={video} />
				))}
			</Container>
		</>
	);
};

export default Search;
