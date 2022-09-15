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
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Avvvatars from 'avvvatars-react';
import { useRef } from 'react';

const Container = styled.div`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	width: 100%;
	height: 56px;
	box-shadow: ${({ theme }) => theme.navShadow} 0px 15px 30px -15px;
	z-index: 11;
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
`;

const LogoText = styled.h2`
	font-weight: bold;
	font-size: 18px;
	color: ${({ theme }) => theme.text};
	@media (max-width: 736px) {
		display: none;
	}
`;

const Img = styled.img`
	height: 25px;
`;

const ItemText = styled.text`
	@media (max-width: 760px) {
		display: none;
	}
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

	@media (max-width: 736px) {
		width: 60%;
	}
	@media (max-width: 490px) {
		width: 50%;
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

const SignInButton = styled.button`
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

	@media (max-width: 740px) {
		display: none;
	}
`;

const CloseButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
	color: ${({ theme }) => theme.text};
	font-weight: 200;
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
	@media (max-width: 880px) {
		display: none;
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
	@media (max-width: 1008px) {
		display: none;
	}
`;

const User = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
	/* @media (max-width: 840px) {
		display: none;
	} */
`;

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState('');
	const { currentUser } = useSelector((state) => state.user);
	const inputRef = useRef();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			navigate(`/search?q=${q}`);
			e.target.value = '';
		}
	};

	const handleOnFocus = () => {
		const clostBtn = document.getElementById('closeBtn');
		clostBtn.style.display = 'block';
	};

	const handleClear = () => {
		const clostBtn = document.getElementById('closeBtn');
		if (inputRef.current) inputRef.current.value = '';
		clostBtn.style.display = 'none';
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate('/');
	};

	return (
		<>
			<Container>
				<Wrapper>
					{/* <MenuIcon /> */}
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Logo>
							<Img src={logoImg} />
							<LogoText>PlayTube</LogoText>
						</Logo>
					</Link>
					<Search>
						<Input
							placeholder="Search"
							id="header_search"
							onChange={(e) => setQ(e.target.value)}
							onKeyUp={handleKeyPress}
							onFocus={handleOnFocus}
							ref={inputRef}
						/>
						{q !== '' && (
							<CloseButton
								id="closeBtn"
								className="material-symbols-rounded"
								onClick={handleClear}
							>
								close
							</CloseButton>
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
							<ItemText>🥳 {currentUser?.name}</ItemText>
							<Tooltip title="Sign out">
								<LogoutButton>
									<LogoutOutlinedIcon onClick={handleLogout} />
								</LogoutButton>
							</Tooltip>
						</User>
					) : (
						<Link to="signin" style={{ textDecoration: 'none' }}>
							<Tooltip title="Sign in">
								<SignInButton>
									<AccountCircleOutlinedIcon />
									SIGN IN
								</SignInButton>
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
