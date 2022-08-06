const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'You must provide the task name.'],
		trim: true,
		maxLength: [20, 'The name should be at most 20 characters.'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
