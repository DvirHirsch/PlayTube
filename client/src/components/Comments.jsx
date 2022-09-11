import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avvvatars from 'avvvatars-react';
import { httpAddComment } from '../hooks/requests';

const api = 'http://localhost:4000/api';

const Container = styled.div``;

const NewComment = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: 30px;
`;

const StyledTextField = styled(TextField)`
	&&& {
		font-size: 14px;
		background: transparent;
		flex: 1;
		width: 100%;
	}
`;

const HideButtons = styled.div`
	display: none;
	width: 100%;
	justify-content: flex-end;
	margin-bottom: 10px;
	gap: 5px;
`;

const Hr = styled.hr`
	margin: 15px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const TotalComments = styled.p`
	color: ${({ theme }) => theme.text};
	font-weight: 500;
`;
const NotSignedIn = styled.p`
	color: ${({ theme }) => theme.text};
	font-weight: 500;
`;

const Comments = ({ videoId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const textRef = useRef();

	// const showRefContent = () => {
	// 	console.log(textRef.current.value);
	// };

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axios.get(`${api}/comments/${videoId}`);
				setComments(res.data);
			} catch (err) {}
		};
		fetchComments();
	}, [videoId]);

	// 	axios.post('/api/comments/addComment', variables).then((res) => {
	// 		if (res.data.success) {
	// 			setComment('');
	// 			refreshFunc(res.data.result);
	// 		} else {
	// 			alert('failed to add comment');
	// 		}
	// 	});
	// };

	//TODO: ADD NEW COMMENT FUNCTIONALITY
	// handleNewComment = () => {};

	return (
		<Container>
			<br />
			<TotalComments>251 Comments</TotalComments>
			{currentUser ? (
				<>
					<NewComment style={{ display: 'flex' }}>
						<Avvvatars style="shape" size={40} value={currentUser.img} />
						<StyledTextField
							id="standard-basic"
							variant="standard"
							placeholder="Add a comment..."
							multiline={true}
							InputProps={{
								inputProps: {
									style: {
										color: `${({ theme }) => theme.text}`,
									},
								},
							}}
							// value={comment}
							inputRef={textRef}
							onClick={() => {
								const hideBtns = document.getElementById('hideBtns');
								hideBtns.style.display = 'flex';
							}}
						/>
						<br />
					</NewComment>
					<HideButtons id="hideBtns">
						<Button
							id="cancelBtn"
							variant="text"
							onClick={() => {
								const hideBtns = document.getElementById('hideBtns');
								if (textRef.current) {
									textRef.current.value = '';
									hideBtns.style.display = 'none';
								}
							}}
						>
							cancel
						</Button>
						<Button
							// style={{ width: '20%', height: '52px' }}
							onClick={() => httpAddComment({})}
						>
							Submit
						</Button>
					</HideButtons>
				</>
			) : (
				<NotSignedIn>Sign in to post a comment</NotSignedIn>
			)}
			{comments.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</Container>
	);
};

export default Comments;
