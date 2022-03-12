const config = require("./config.json");

const isCommand = (message = String.prototype) => {
  return message.startsWith(config.prefix);
};

const getCommand = (messaje = String.prototype) => {
  const [, command] = messaje.split("!");
  return command.trim();
};

module.exports = { isCommand, getCommand };
