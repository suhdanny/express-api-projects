const { findOneAndDelete } = require('../models/Task');
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body); // create a task and store it in DB
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getSingleTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findOne({ _id: id });
		if (!task) {
			return res.status(404).json({ msg: `No task with the given ID ${id} was found.` });
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			return res.status(404).json({ msg: `No task with the given ID ${id} was found.` });
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findOneAndDelete({ _id: id });
		if (!task) {
			return res.status(404).json({ msg: `No task with the given ID ${id} was found.` });
		}
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
};
