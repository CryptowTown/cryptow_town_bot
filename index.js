require("dotenv").config();

const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const { client, token, ROLES } = require("./config");
const { success } = require("./helpers/logger");
const {
  isCommand,
  getCommand,
  getAllMembers,
  getUsersLengthByRole,
  removeReactionVerifyMessage,
  addTownLoyalRoleToNewUsers,
  sendBotReactionVerifyMessage,
} = require("./helpers/utils");

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});

client.commands = new Collection();

client.on("ready", async () => {
  success(`${client.user.username} esta preparado!`);
  client.user.setActivity("con mis amigos 😎.");
  //sendBotReactionVerifyMessage();
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
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
