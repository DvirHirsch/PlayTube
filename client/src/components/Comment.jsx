import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import Avvvatars from 'avvvatars-react';

const Container = styled.div`
	display: flex;
	gap: 10px;
	margin: 30px 0px;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
	font-size: 13px;
	font-weight: 500;
`;

const Date = styled.span`
	font-size: 12px;
	font-weight: 400;
	color: ${({ theme }) => theme.textSoft};
	margin-left: 5px;
`;

const Text = styled.span`
	font-size: 14px;
`;

const Comment = ({ comment }) => {
	const [channel, setChannel] = useState({});

	return (
		<Container>
			<Avvvatars size={40} value={channel.name || channel.img} />
			<Details>
				<Name>
					{channel.name} <Date>{format(comment.createdAt)}</Date>
				</Name>
				<Text>{comment.desc}</Text>
			</Details>
		</Container>
	);
};

export default Comment;
