import { ApiError } from "../../utils/apiError.js";
import { all, get, run } from "../../db/database.js";

function mapTask(task) {
  return {
    id: task.id,
    ownerId: task.owner_id,
    title: task.title,
    description: task.description,
    completed: Boolean(task.completed),
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  };
}

export async function getTasks(userId) {
  const rows = await all("SELECT * FROM tasks WHERE owner_id = ? ORDER BY id DESC", [userId]);
  return rows.map(mapTask);
}

export async function getTask(userId, taskId) {
  const row = await get("SELECT * FROM tasks WHERE id = ? AND owner_id = ?", [taskId, userId]);
  if (!row) throw new ApiError(404, "task not found");
  return mapTask(row);
}

export async function createTaskForUser(userId, payload) {
  const title = String(payload.title || "").trim();
  const description = String(payload.description || "").trim();
  if (!title) throw new ApiError(400, "title is required");

  const now = new Date().toISOString();
  const result = await run(
    "INSERT INTO tasks (owner_id, title, description, completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, title, description, 0, now, now]
  );
  return getTask(userId, result.lastID);
}

export async function updateTaskForUser(userId, taskId, payload) {
  const current = await getTask(userId, taskId);
  const nextTitle = payload.title !== undefined ? String(payload.title).trim() : current.title;
  const nextDescription = payload.description !== undefined ? String(payload.description).trim() : current.description;
  const nextCompleted = payload.completed !== undefined ? payload.completed : current.completed;

  if (!nextTitle) throw new ApiError(400, "title cannot be empty");
  if (typeof nextCompleted !== "boolean") throw new ApiError(400, "completed must be a boolean");

  await run("UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ? AND owner_id = ?", [
    nextTitle,
    nextDescription,
    nextCompleted ? 1 : 0,
    new Date().toISOString(),
    taskId,
    userId,
  ]);

  return getTask(userId, taskId);
}

export async function deleteTaskForUser(userId, taskId) {
  const task = await getTask(userId, taskId);
  await run("DELETE FROM tasks WHERE id = ? AND owner_id = ?", [taskId, userId]);
  return task;
}
