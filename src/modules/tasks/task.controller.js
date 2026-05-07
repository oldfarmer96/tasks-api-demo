const {
  getTasks,
  getTask,
  createTaskForUser,
  updateTaskForUser,
  deleteTaskForUser,
} = require("./task.service");

function list(req, res) {
  const items = getTasks(req.auth.userId);
  res.status(200).json(items);
}

function getOne(req, res) {
  const task = getTask(req.auth.userId, Number(req.params.taskId));
  res.status(200).json(task);
}

function create(req, res) {
  const task = createTaskForUser(req.auth.userId, req.body);
  res.status(201).json(task);
}

function update(req, res) {
  const task = updateTaskForUser(req.auth.userId, Number(req.params.taskId), req.body);
  res.status(200).json(task);
}

function remove(req, res) {
  const task = deleteTaskForUser(req.auth.userId, Number(req.params.taskId));
  res.status(200).json(task);
}

module.exports = {
  list,
  getOne,
  create,
  update,
  remove,
};
