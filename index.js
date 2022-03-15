require("dotenv").config();

const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const Discord = require("discord.js");
const { client, token, VERSION } = require("./config");
const { success, error, warn } = require("./helpers/logger");
const {
  isCommand,
  getCommand,
  removeReactionVerifyMessage,
  addTownLoyalRoleToNewUsers,
  addLanguageRole,
  sendBotReactionVerifyMessage,
  sendBotChooseLanguageMessage,
} = require("./helpers/utils");

client.commands = new Discord.Collection();

process.on("unhandledRejection", (err) => {
  error(err);
  process.exit(1);
});

client.on("ready", async () => {
  success(`Versión de node: ${process.version} y DiscordJS: v${VERSION}`);
  success(`${client.user.username} esta preparado!`);
  success(`Actualmente serviendo ${client.guilds.cache.size} severs!`);
  client.user.setActivity("con mis amigos 😎.");
  //sendBotChooseLanguageMessage();
  //sendBotReactionVerifyMessage();
});

client.on("error", (err) => {
  error(err);
  process.exit(1);
});

client.on("disconnect", () => {
  warn(`${client.user.username} se desconecto!`);
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  if (isCommand(message)) {
    const obj = getCommand(message);
    const command = client.commands.find((c) => {
      return (
        c.name === obj.command || (c.alias && c.alias.includes(obj.command))
      );
    });
    if (!command) {
      await message.reply({
        content: "The command dont exists!",
      });
    }

    try {
      await command.execute(message, client, obj.args);
    } catch (error) {
      await message.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
      error(`El comando "${obj.command}" fallo al ejecutarse`);
    }
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addTownLoyalRoleToNewUsers(reaction, user);
  addLanguageRole(reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
  addLanguageRole(reaction, user);
});

client.on("guildMemberRemove", (member) => {
  removeReactionVerifyMessage(member.user.id);
  console.log(`El usuario ${member.user.username} abandono el servidor`);
});

client.login(token);
