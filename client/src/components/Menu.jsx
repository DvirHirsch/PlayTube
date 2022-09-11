import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	height: calc(100vh);
	color: ${({ theme }) => theme.text};
	font-size: 14px;
	position: sticky;
	top: 0;
	left: 0;
	bottom: 0;
	overflow-y: scroll;
`;
const Wrapper = styled.div`
	padding: 8px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 26px;
	gap: 20px;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.soft};
		transition: ease-out 0.25s;
	}
`;

const Hr = styled.hr`
	margin: 15px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
	font-weight: 400;
	padding: 10px 26px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	padding: 5px 5px;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 3px;
	font-weight: 500;
	margin-top: 10px;
	cursor: pointer;
	gap: 5px;
	&:hover {
		background-color: #3ea6ff;
		color: ${({ theme }) => theme.text};
		transition: ease-in 0.25s;
	}
`;

const Title = styled.h2`
	font-size: 14px;
	font-weight: 500;
	padding: 0px 26px;
	color: #aaaaaa;
	margin-bottom: 10px;
`;

const Credit = styled.p`
	color: #717171;
	text-align: center;
	padding: 10px 0px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Container>
			<Wrapper>
				<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item>
						<HomeIcon />
						Home
					</Item>
				</Link>
				<Link to="trends" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item>
						<ExploreOutlinedIcon />
						Explore
					</Item>
				</Link>
				<Link
					to="subscriptions"
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Item>
						<SubscriptionsOutlinedIcon />
						Subscriptions
					</Item>
				</Link>
				<Hr />
				<Item>
					<VideoLibraryOutlinedIcon />
					Library
				</Item>
				<Item>
					<HistoryOutlinedIcon />
					History
				</Item>
				<Hr />
				{!currentUser && (
					<>
						<Login>
							Sign in to like videos, <br /> comment, and subscribe.
							<Link to="signin" style={{ textDecoration: 'none' }}>
								<Button>
									<AccountCircleOutlinedIcon />
									SIGN IN
								</Button>
							</Link>
						</Login>
						<Hr />
					</>
				)}
				<Title>EXPLORE</Title>
				<Item>
					<LibraryMusicOutlinedIcon />
					Music
				</Item>
				<Item>
					<SportsBasketballOutlinedIcon />
					Sports
				</Item>
				<Item>
					<SportsEsportsOutlinedIcon />
					Gaming
				</Item>
				<Item>
					<MovieOutlinedIcon />
					Movies
				</Item>
				<Item>
					<ArticleOutlinedIcon />
					News
				</Item>
				<Item>
					<LiveTvOutlinedIcon />
					Live
				</Item>
				<Hr />
				<Item>
					<SettingsOutlinedIcon />
					Settings
				</Item>
				<Item>
					<FlagOutlinedIcon />
					Report
				</Item>
				<Item>
					<HelpOutlineOutlinedIcon />
					Help
				</Item>
				<Item onClick={() => setDarkMode(!darkMode)}>
					<SettingsBrightnessOutlinedIcon />
					{darkMode ? 'Light' : 'Dark'} Mode
				</Item>
				<Hr />
				<Credit>&#169; 2022 PlayTube LLC</Credit>
			</Wrapper>
		</Container>
	);
};

export default Menu;
