import {
  getTasks,
  getTask,
  createTaskForUser,
  updateTaskForUser,
  deleteTaskForUser,
} from "./task.service.js";

export async function list(req, res) {
  const items = await getTasks(req.auth.userId);
  res.status(200).json(items);
}

export async function getOne(req, res) {
  const task = await getTask(req.auth.userId, Number(req.params.taskId));
  res.status(200).json(task);
}

export async function create(req, res) {
  const task = await createTaskForUser(req.auth.userId, req.body);
  res.status(201).json(task);
}

export async function update(req, res) {
  const task = await updateTaskForUser(req.auth.userId, Number(req.params.taskId), req.body);
  res.status(200).json(task);
}

export async function remove(req, res) {
  const task = await deleteTaskForUser(req.auth.userId, Number(req.params.taskId));
  res.status(200).json(task);
}
