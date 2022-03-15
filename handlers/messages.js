const { client } = require("../config");
const { warn } = require("../helpers/logger");
const { isCommand, getCommand } = require("../helpers/utils");

async function messageCreate(message) {
  if (isCommand(message)) {
    const obj = getCommand(message);
    const command = client.commands.find((c) => {
      return (
        c.name === obj.command || (c.alias && c.alias.includes(obj.command))
      );
    });

    if (!command) {
      await message.reply({
        content: `⚠️ The command "${obj.command}" dont exists!`,
      });
      return warn(`The command "${obj.command}" dont exists!`);
    }

    try {
      await command.execute(message, client, obj.args);
    } catch (error) {
      await message.reply({
        content: "❌ There was an error while executing this command!",
        ephemeral: true,
      });
      error(`❌ The command "${obj.command}" fails to execute!`);
    }
  }
}

module.exports = messageCreate;
