require("dotenv").config();

const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const Discord = require("discord.js");
const { client, token, ROLES, VERSION } = require("./config");
const { success, error, warn } = require("./helpers/logger");
const {
  isCommand,
  getCommand,
  getAllMembers,
  getUsersLengthByRole,
  removeReactionVerifyMessage,
  addTownLoyalRoleToNewUsers,
  sendBotReactionVerifyMessage,
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

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) return;

//   const command = client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: "There was an error while executing this command!",
//       ephemeral: true,
//     });
//   }
// });

client.on("messageCreate", async (message) => {
  if (isCommand(message)) {
    const obj = getCommand(message);
    //const command = client.commands.get(obj.command);
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
    // switch (obj.command) {
    //   case "test":
    //     message.reply(`Test command with: ${obj.args.join(", ")} arguments`);
    //     //message.react("🤔");
    //     break;

    //   case "info":
    //     const tpl = `
    //       Información básica del servidor\n:
    //       Total usuarios: ${(await getAllMembers()).size}\n
    //       Town Loyals: ${await getUsersLengthByRole(ROLES.TOW_LOYAL_ROLE_ID)}
    //     `;

    //     message.reply(tpl);
    //     break;
    // }
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addTownLoyalRoleToNewUsers(reaction, user);
});

client.on("guildMemberRemove", (member) => {
  removeReactionVerifyMessage(member.user.id);
  console.log(`El usuario ${member.user.username} abandono el servidor`);
});

client.login(token);
