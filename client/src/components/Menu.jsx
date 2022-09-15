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

	@media (max-width: 600px) {
		width: 75px;
	}
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

	@media (max-width: 600px) {
		padding: 15px 15px;
	}
`;

const ItemText = styled.text`
	@media (max-width: 600px) {
		display: none;
	}
`;

const Hr = styled.hr`
	margin: 15px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
	font-weight: 400;
	padding: 10px 26px;

	@media (max-width: 600px) {
		display: none;
	}
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
	@media (max-width: 600px) {
		display: none;
	}
`;

const Credit = styled.p`
	color: #717171;
	text-align: center;
`;

const Menu = ({ darkMode, setDarkMode }) => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Container>
			<Wrapper>
				<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item>
						<HomeIcon />
						<ItemText>Home</ItemText>
					</Item>
				</Link>
				<Link to="trends" style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item>
						<ExploreOutlinedIcon />
						<ItemText>Explore</ItemText>
					</Item>
				</Link>
				<Link
					to="subscriptions"
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Item>
						<SubscriptionsOutlinedIcon />
						<ItemText>Subscriptions</ItemText>
					</Item>
				</Link>
				<Hr />
				<Item>
					<VideoLibraryOutlinedIcon />
					<ItemText>Library</ItemText>
				</Item>
				<Item>
					<HistoryOutlinedIcon />
					<ItemText>History</ItemText>
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
					<ItemText>Music</ItemText>
				</Item>
				<Item>
					<SportsBasketballOutlinedIcon />
					<ItemText>Sports</ItemText>
				</Item>
				<Item>
					<SportsEsportsOutlinedIcon />
					<ItemText>Gaming</ItemText>
				</Item>
				<Item>
					<MovieOutlinedIcon />
					<ItemText>Movies</ItemText>
				</Item>
				<Item>
					<ArticleOutlinedIcon />
					<ItemText>News</ItemText>
				</Item>
				<Item>
					<LiveTvOutlinedIcon />
					<ItemText>Live</ItemText>
				</Item>
				<Hr />
				<Item>
					<SettingsOutlinedIcon />
					<ItemText>Settings</ItemText>
				</Item>
				<Item>
					<FlagOutlinedIcon />
					<ItemText>Report</ItemText>
				</Item>
				<Item>
					<HelpOutlineOutlinedIcon />
					<ItemText>Help</ItemText>
				</Item>
				<Item onClick={() => setDarkMode(!darkMode)}>
					<SettingsBrightnessOutlinedIcon />
					<ItemText>{darkMode ? 'Light' : 'Dark'} Mode</ItemText>
				</Item>
				<Hr />
				<Credit>&#169; 2022 PlayTube LLC</Credit>
			</Wrapper>
		</Container>
	);
};

export default Menu;
