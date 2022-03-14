require("dotenv").config();

const { client, token, ROLES } = require("./config");
const {
  isCommand,
  getCommand,
  getAllMembers,
  getUsersLengthByRole,
  removeReactionVerifyMessage,
  addTownLoyalRoleToNewUsers,
  sendBotReactionVerifyMessage,
} = require("./utils");

client.on("ready", async () => {
  console.log(`${client.user.username} esta preparado!`);
  client.user.setActivity("con mis amigos 😎.");
  //sendBotReactionVerifyMessage();
});

client.on("messageCreate", async (message) => {
  if (isCommand(message.content)) {
    const command = getCommand(message.content);
    console.log(command);
    switch (command) {
      case "test":
        message.reply("testing");
        //message.react("🤔");
        break;

      case "info":
        const tpl = `
          Información básica del servidor\n:
          Total usuarios: ${(await getAllMembers()).size}\n
          Town Loyals: ${await getUsersLengthByRole(ROLES.TOW_LOYAL_ROLE_ID)}
        `;

        message.reply(tpl);
        break;
    }
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
