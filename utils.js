const { prefix, client, SERVER } = require("./config");

const isCommand = (message = String.prototype) => {
  return message.startsWith(prefix);
};

const getCommand = (messaje = String.prototype) => {
  const [, command] = messaje.split("!");
  return command.trim();
};

const getServer = () => client.guilds.cache.get(SERVER.ID);

const getAllMembers = async () => {
  const sv = getServer();
  const members = await sv.members.fetch(); // sin cache
  return members;
};

const getAllRoles = async () => {
  const sv = getServer();
  await getAllMembers(); // ver todos los miembros sin la cache
  const roles = await sv.roles.fetch();
  return roles;
};

const getUsersByRole = async (role_id) => {
  const sv = getServer();
  await getAllMembers();
  const users = sv.roles.cache
    .get(role_id)
    .members.map((member) => member.user);
  return users;
};

const getUsersLengthByRole = async (role_id) => {
  const count = await getUsersByRole(role_id);
  return count.length;
};

module.exports = {
  isCommand,
  getCommand,
  getServer,
  getAllMembers,
  getAllRoles,
  getUsersByRole,
  getUsersLengthByRole
};
