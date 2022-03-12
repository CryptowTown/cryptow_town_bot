const { client, token, ROLES, SERVER } = require("./config");
const {
  isCommand,
  getCommand,
  getUsersByRole,
  getAllMembers,
  getUsersLengthByRole,
} = require("./utils");

client.on("ready", async () => {
  const verifyChannel = client.channels.cache.get("946809488164413511");
  const exampleEmbed = {
    color: 0x0099ff,
    title: "User Verification",
    thumbnail: {
      url: "https://i.imgur.com/sWcAXL6.jpg",
    },
    description: `✨Welcome to Cryptow Town, to verify yourself and enjoy the content of the server we invite you to react with the <:towfirehi:946865774474186802>\n
      In favor of preserving a community with a super nice and healthy environment, we recommend you to read and follow our rules of coexistence, thank you for helping us to preserve the order and harmony of CrypTow Town.  

      scroll Rules of peaceful community: 
      
       A community where friendship grows and bonds of friendship are created!  
      
       Please be respectful with everyone in our community, and if you are being assaulted in any way, please take a screenshot and go directly to a moderator, in case the moderator is not available you can upload the screenshot to the channel **『🚨』report-user**, we will always be attentive to your needs.
      
       Avoid being an author or accomplice of bullying, disrespect, toxicity, racism, misogyny, etc. If you see that any member of the community is violating this rule against you or someone else, send a direct message to a mod or report it to **『🚨』report-user**, we will review the case and do our best to resolve any misunderstanding in the public chat, and fix the situation in the best possible way.
      `,
    image: {
      url: "https://i.imgur.com/sWcAXL6.jpg",
    },
  };

  // client.channels.fetch("946809488164413511").then((channel) => {
  //   channel.messages.fetch("952324565806235678").then((message) => {
  //     message.react("<:towfirehi:946865774474186802>");
  //   });
  // });
  //verifyChannel.send({ embeds: [exampleEmbed] });

  console.log(`${client.user.username} esta preparado!`);
  client.user.setActivity("con mis amigos 😎.");

  const server = client.guilds.cache.get(SERVER.ID);
  // await server.members.fetch();
  // const roles = server.roles.cache.get(ROLES.TOW_LOYAL_ROLE_ID).members;

  const allRoles = await server.roles.fetch();
  console.log(allRoles.map((role) => ({ name: role.name, id: role.id })));
  // const allRolesName = allRoles.map((role) => ({
  //   name: role.name,
  //   members: role.members,
  // }));
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
    reaction.message.channelId === "946809488164413511" &&
    reaction.message.id === "952324565806235678" &&
    reaction.emoji.name === "towfirehi"
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

client.login(token);
