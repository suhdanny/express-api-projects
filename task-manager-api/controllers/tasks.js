const getAllTasks = (req, res) => {
	res.send('All items');
};

const createTask = (req, res) => {
	res.send('Create task');
};

const getSingleTask = (req, res) => {
	res.send('Get single task');
};

const updateTask = (req, res) => {
	res.send('Update task');
};

const deleteTask = (req, res) => {
	res.send('Delete task');
};

module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
};
