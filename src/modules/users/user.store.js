const users = [];
let nextUserId = 1;

function createUser({ name, email, passwordHash }) {
  const user = {
    id: nextUserId++,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email === email) || null;
}

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  sanitizeUser,
};
