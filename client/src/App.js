import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import chatAppLogo from './assets/images/chatAppLogo.png';
import wavefooter from './assets/images/wavefooter.png';

const socket = io.connect('http://localhost:3001');

function App() {
	const [username, setUsername] = useState('');
	const [room, setRoom] = useState('');
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
			setShowChat(true);
		}
	};

	return (
		<div className="App">
			{!showChat ? (
				<div className="joinChatContainer">
					<img className="logo" src={chatAppLogo} alt="chatLogo" />
					<h3>Get Started</h3>
					<input
						type="text"
						placeholder="Your name..."
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Room ID..."
						onChange={(event) => {
							setRoom(event.target.value);
						}}
					/>
					<button onClick={joinRoom}>Join a Room</button>
					<img className="wave" src={wavefooter} alt="waveLogo" />
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
