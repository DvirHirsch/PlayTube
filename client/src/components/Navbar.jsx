import React, { useState } from 'react';
import styled from 'styled-components';
import logoImg from '../img/logo.png';
import { logout } from '../redux/userSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import { Tooltip, IconButton } from '@mui/material';
import Avvvatars from 'avvvatars-react';

const Container = styled.div`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	width: 100%;
	height: 56px;
	box-shadow: ${({ theme }) => theme.navShadow} 0px 15px 30px -15px;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: 0px 20px;
	position: relative;
`;

const Logo = styled.div`
	display: flex;
	flex: flex-start;
	align-items: center;
	gap: 5px;
	font-weight: bold;
	color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
	height: 25px;
`;

const Search = styled.div`
	width: 40%;
	position: absolute;
	left: 0px;
	right: 0px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	border: 1px solid ${({ theme }) => theme.searchBorder};
	border-radius: 3px;
	background-color: ${({ theme }) => theme.searchBg};
	color: ${({ theme }) => theme.searchTxt};
	&:hover {
		transition: ease-out 0.25s;
		background-color: ${({ theme }) => theme.search};
	}
`;

const Input = styled.input`
	padding: 5px;
	border: none;
	background-color: transparent;
	outline: none;
	width: 90%;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
	padding: 5px 15px;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 3px;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
	&:hover {
		background-color: #3ea6ff;
		color: ${({ theme }) => theme.text};
		transition: ease-out 0.25s;
	}
`;

const LogoutButton = styled.button`
	height: 32px;
	width: 32px;
	background-color: transparent;
	border: none;
	color: ${({ theme }) => theme.text};
	border-radius: 50%;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
	&:hover {
		color: ${({ theme }) => theme.navIconHover};
		background-color: ${({ theme }) => theme.navIconBgHover};
		transition: ease-out 0.35s;
	}
`;

const UploadButton = styled.button`
	height: 32px;
	width: 32px;
	background-color: transparent;
	border: none;
	color: ${({ theme }) => theme.text};
	border-radius: 50%;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
	&:hover {
		color: ${({ theme }) => theme.navIconHover};
		background-color: ${({ theme }) => theme.navIconBgHover};
		transition: ease-out 0.35s;
	}
`;

const User = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState('');
	const { currentUser } = useSelector((state) => state.user);

	const navigate = useNavigate();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			navigate(`/search?q=${q}`);
			e.target.value = '';
		}
	};

	// const handleLogout = async (e) => {
	// 	e.preventDefault();
	// 	dispatch(logout());
	// 	try {
	// 		const res = await axios.post('/auth/logout');
	// 		dispatch(logout(res.data));
	// 		navigate('/');
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<>
			<Container>
				<Wrapper>
					{/* <MenuIcon /> */}
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Logo>
							<Img src={logoImg} />
							PlayTube
						</Logo>
					</Link>
					<Search>
						<Input
							placeholder="Search"
							onChange={(e) => setQ(e.target.value)}
							onKeyUp={handleKeyPress}
						/>
						{q !== '' && (
							<button
								className="material-symbols-rounded"
								onClick={() => setQ('')}
							>
								close
							</button>
						)}

						<Tooltip title="Search">
							<SearchOutlinedIcon
								style={{ cursor: 'pointer' }}
								onClick={() => navigate(`/search?q=${q}`)}
							/>
						</Tooltip>
					</Search>
					{currentUser ? (
						<User>
							<Tooltip title="Upload">
								<UploadButton>
									<VideoCallOutlinedIcon onClick={() => setOpen(true)} />
								</UploadButton>
							</Tooltip>
							<Avvvatars style="shape" size={32} value={currentUser.img} />
							<strong>🥳 {currentUser?.name}</strong>
							<Tooltip title="Sign out">
								<LogoutButton>
									<LogoutOutlinedIcon />
								</LogoutButton>
							</Tooltip>
						</User>
					) : (
						<Link to="signin" style={{ textDecoration: 'none' }}>
							<Tooltip title="Sign in">
								<Button>
									<AccountCircleOutlinedIcon />
									SIGN IN
								</Button>
							</Tooltip>
						</Link>
					)}
				</Wrapper>
			</Container>
			{open && <Upload setOpen={setOpen} />}
		</>
	);
};

export default Navbar;
