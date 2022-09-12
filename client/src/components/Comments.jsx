import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avvvatars from 'avvvatars-react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

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

const CommentWrapper = styled.div`
	/* display: flex;
	justify-content: space-between; */
`;

const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
	color: ${({ theme }) => theme.text};
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

const Comments = ({ videoId, userId }) => {
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
				const res = await axios.get(`/comments/${videoId}`);
				setComments(res.data);
			} catch (err) {}
		};
		fetchComments();
	}, [videoId]);

	//TODO: ADD NEW COMMENT FUNCTIONALITY
	const handleNewComment = async (desc, videoId) => {
		const res = await axios.post('/comments/', { desc, videoId });

		setComments([res.data, ...comments]);
	};
	const handleDeleteComment = async (commentId, videoId) => {
		const res = await axios.delete('/comments/', {
			data: { videoId, commentId },
		});
		if (res.status == 200) {
			const getComments = await axios.get(`/comments/${videoId}`);
			setComments(getComments.data);
		}
	};
	return (
		<Container>
			<br />
			<TotalComments>251 Comments</TotalComments>
			<br />

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
										color: `#8c8c8c`,
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
							onClick={() => handleNewComment(textRef.current.value, videoId)}
						>
							Submit
						</Button>
					</HideButtons>
				</>
			) : (
				<NotSignedIn>Sign in to post a comment</NotSignedIn>
			)}
			{comments.map((comment) => (
				<CommentWrapper>
					<Comment
						key={comment._id}
						comment={comment}
						userId={currentUser?._id}
					/>
					<IconButton aria-label="delete">
						<StyledDeleteForeverIcon
							onClick={() => {
								handleDeleteComment(comment._id, comment.videoId);
							}}
						></StyledDeleteForeverIcon>
					</IconButton>
				</CommentWrapper>
			))}
		</Container>
	);
};

export default Comments;
