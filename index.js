require("dotenv").config();

const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const Discord = require("discord.js");
const {
  client,
  token,
  VERSION,
  CHANNELS,
  MESSAGES,
  EMOJIS,
} = require("./config");
const { success, error, warn } = require("./helpers/logger");

const messageCreate = require("./handlers/messages");
const removeUser = require("./handlers/removeUsers");
const messageReaction = require("./handlers/messageReaction");

const {
  sendBotReactionVerifyMessage,
  sendBotChooseLanguageMessage,
  getMessageFromChannel,
} = require("./helpers/utils");

client.commands = new Discord.Collection();

// process.on("unhandledRejection", (err) => {
//   error(err);
//   process.exit(1);
// });

client.on("ready", async () => {
  success(`Versión de node: ${process.version} y DiscordJS: v${VERSION}`);
  success(`${client.user.username} esta preparado!`);
  success(`Actualmente serviendo ${client.guilds.cache.size} severs!`);
  client.user.setActivity("con mis amigos 😎.");
  //sendBotChooseLanguageMessage();
  //sendBotReactionVerifyMessage();
});

// client.on("error", (err) => {
//   error(err);
//   process.exit(1);
// });

client.on("disconnect", () => {
  warn(`${client.user.username} se desconecto!`);
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", async (message) => {
  messageCreate(message);
});

client.on("guildMemberAdd", async (member) => {
  warn(`El usuario ${member.user.username} entro al servidor`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  messageReaction(reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
  messageReaction(reaction, user);
});

client.on("guildMemberRemove", async (member) => {
  warn(`El usuario ${member.user.username} abandono el servidor`);
});

client.login(token);
