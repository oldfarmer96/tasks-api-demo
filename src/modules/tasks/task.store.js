const tasks = [];
let nextTaskId = 1;

function listTasksByUser(userId) {
  return tasks.filter((task) => task.ownerId === userId);
}

function createTask({ ownerId, title, description }) {
  const task = {
    id: nextTaskId++,
    ownerId,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function findTaskById(taskId) {
  return tasks.find((task) => task.id === taskId) || null;
}

function updateTask(task, updates) {
  task.title = updates.title ?? task.title;
  task.description = updates.description ?? task.description;
  task.completed = updates.completed ?? task.completed;
  task.updatedAt = new Date().toISOString();
  return task;
}

function deleteTask(taskId) {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) return null;
  const [removed] = tasks.splice(index, 1);
  return removed;
}

module.exports = {
  listTasksByUser,
  createTask,
  findTaskById,
  updateTask,
  deleteTask,
};
