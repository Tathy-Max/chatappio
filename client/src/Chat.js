import React, { useEffect, useState } from 'react';
import chatAppLogo from './assets/images/chatAppLogo.png';

function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};
			await socket.emit('send_message', messageData);
			setMessageList((list) => [...list, messageData]);
		}
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	return (
		<div className="chat-window">
			<div className="chat-header">
				<p>Live Chat</p>
			</div>
			<div className="chat-body">
				{messageList.map((messageContent) => {
					return (
						<div className="message">
							<div>
								<div className="message-content">
									<p>{messageContent.message}</p>
								</div>
								<div className="message-meta">
									<p>{messageContent.time}</p>
									<p>{messageContent.author}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="chat-footer">
				<input
					type="text"
					placeholder="Hey..."
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
}

export default Chat;
