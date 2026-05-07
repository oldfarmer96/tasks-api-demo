const { ApiError } = require("../../utils/apiError");
const {
  listTasksByUser,
  createTask,
  findTaskById,
  updateTask,
  deleteTask,
} = require("./task.store");

function getTasks(userId) {
  return listTasksByUser(userId);
}

function getTask(userId, taskId) {
  const task = findTaskById(taskId);
  if (!task || task.ownerId !== userId) {
    throw new ApiError(404, "task not found");
  }
  return task;
}

function createTaskForUser(userId, payload) {
  const title = String(payload.title || "").trim();
  const description = String(payload.description || "").trim();

  if (!title) {
    throw new ApiError(400, "title is required");
  }

  return createTask({ ownerId: userId, title, description });
}

function updateTaskForUser(userId, taskId, payload) {
  const task = getTask(userId, taskId);
  const updates = {};

  if (payload.title !== undefined) {
    const title = String(payload.title).trim();
    if (!title) throw new ApiError(400, "title cannot be empty");
    updates.title = title;
  }

  if (payload.description !== undefined) {
    updates.description = String(payload.description).trim();
  }

  if (payload.completed !== undefined) {
    if (typeof payload.completed !== "boolean") {
      throw new ApiError(400, "completed must be a boolean");
    }
    updates.completed = payload.completed;
  }

  return updateTask(task, updates);
}

function deleteTaskForUser(userId, taskId) {
  const task = getTask(userId, taskId);
  return deleteTask(task.id);
}

module.exports = {
  getTasks,
  getTask,
  createTaskForUser,
  updateTaskForUser,
  deleteTaskForUser,
};
