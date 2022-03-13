const {
  client,
  token,
  ROLES,
  CHANNELS,
  MESSAGE_BOT_VERIFICATION,
  MESSAGE_BOT_VERIFICATION_EMOJI,
} = require("./config");
const {
  isCommand,
  getCommand,
  getAllMembers,
  getUsersLengthByRole,
  removeReactionMessage,
  sendBotReactionVerifyMessage,
} = require("./utils");

client.on("ready", async () => {
  console.log(`${client.user.username} esta preparado!`);
  client.user.setActivity("con mis amigos 😎.");
  //sendBotReactionVerifyMessage();
});

client.on("messageCreate", async (message) => {
  const townRoyalUsersLength = await getUsersLengthByRole(
    ROLES.TOW_LOYAL_ROLE_ID
  );
  const isValidMessageVerification = message.channelId === "946809488164413511";
  const isValidEmoji = message.content === "<:towfirehi:946865774474186802>";
  if (
    isValidMessageVerification &&
    isValidEmoji &&
    townRoyalUsersLength <= 90
  ) {
    message.member.roles.add(ROLES.TOW_LOYAL_ROLE_ID);
  }

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

// client.on("message", (message) => {
//   if (message.channel.id === "946809488164413511") {
//     if (message.author.bot) return;

//     if (message.content === "Acepto") {
//       message.member.roles.put(TOW_LOYAL_ROLE_ID);
//       message.author.send(
//         "Gracias por verificarte demos un tour por las reglas, las preguntas comunes y los canales de comunicacion recuerda que debes comunicarte en el lenguaje debido en cada canal, en los canales generales se usa ingles."
//       );
//       message.delete();
//     } else {
//       message.author.send(
//         "Tienes problemas para verificarte? solo escribe las palabras tal cual se te pide."
//       );
//       message.delete();
//     }
//   }
// });

client.on("messageReactionAdd", async (reaction, user) => {
  console.log(user.username);

  if (
    reaction.message.channelId === CHANNELS.VERIFICATION_CHANNEL &&
    reaction.message.id === MESSAGE_BOT_VERIFICATION &&
    reaction.emoji.name === MESSAGE_BOT_VERIFICATION_EMOJI
  ) {
    const member = await reaction.message.guild.members.fetch(user.id);
    const townRoyalUsersLength = await getUsersLengthByRole(
      ROLES.TOW_LOYAL_ROLE_ID
    );

    if (townRoyalUsersLength <= 90) {
      member.roles.add(ROLES.TOW_LOYAL_ROLE_ID);
    } else {
      member.roles.add(ROLES.VERIFIED_ROLE_ID);
    }

    member.roles.add(ROLES.SPANISH_LANGUAGE_ROLE_ID);
    member.roles.add(ROLES.FRENCH_LANGUAGE_ROLE_ID);
    member.roles.add(ROLES.BRAZIL_LANGUAGE_ROLE_ID);
  }
});

client.on("guildMemberRemove", (member) => {
  removeReactionMessage(member.user.id);
  console.log(`El usuario ${member.user.username} abandono el servidor`);
});

client.login(token);
