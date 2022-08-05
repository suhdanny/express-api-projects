const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const { connect } = require('mongoose');

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', tasks);

const startServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(3000, () => {
			console.log('Server listening on port 3000...');
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
