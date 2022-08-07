import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [messages, setMessages] = useState([{}]);
	const [formData, setFormData] = useState({ title: '', message: '' });

	const handleChange = e => {
		setFormData(prevFormData => {
			return { ...prevFormData, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		createMessage();
	};

	useEffect(() => {
		getAllMessages();
	}, []);

	const getAllMessages = async () => {
		const response = await axios.get('/api/v1/messages');
		setMessages(response.data.messages);
	};

	const createMessage = async () => {
		await axios.post('/api/v1/messages', formData);
		getAllMessages();
		setFormData({ title: '', message: '' });
	};

	const deleteMessage = async id => {
		await axios.delete(`/api/v1/messages/${id}`);
		getAllMessages();
	};

	const Message = ({ title, message, handleClick }) => {
		return (
			<div className='border-blue-500 border w-80 rounded p-3 flex flex-col items-center'>
				<h1>Title: {title}</h1>
				<p>Body: {message}</p>
				<button className='text-red-300 cursor-pointer' onClick={handleClick}>
					Delete
				</button>
			</div>
		);
	};

	const messageElements = () =>
		messages.map(message => {
			return <Message key={message._id} title={message.title} message={message.message} handleClick={() => deleteMessage(message._id)} />;
		});

	return (
		<div className='h-screen flex flex-col items-center'>
			<div className='bg-blue-500 p-5 flex flex-col items-center text-white font-bold w-screen'>
				<h1 className='text-2xl'>Message Board</h1>
				<p className='text-xl'>Speak your mind freely</p>
			</div>
			<form className='flex flex-col gap-2 m-5 w-60'>
				<input
					type='text'
					placeholder='Title'
					className='bg-gray-200 h-10 rounded pl-2'
					name='title'
					onChange={handleChange}
					value={formData.title}
				/>
				<input
					type='text'
					placeholder='Message'
					name='message'
					className='bg-gray-200 h-10 rounded pl-2'
					onChange={handleChange}
					value={formData.message}
				/>
				<button onClick={handleSubmit} className='p-2 bg-blue-500 text-white font-bold'>
					Submit
				</button>
			</form>
			<div className='flex flex-col gap-5'>{messageElements()}</div>
		</div>
	);
}

export default App;
