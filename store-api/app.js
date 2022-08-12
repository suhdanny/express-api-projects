require('dotenv').config();
require('express-async-errors');

const connectDB = require('./db/connect');

const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send("<h1>Store API</h1><a href='/api/v1/products'>Products API Page</a>");
});

app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(5000, () => {
			console.log('Server running on port 5000.');
		});
	} catch (error) {
		console.log(error);
	}
};

start();
