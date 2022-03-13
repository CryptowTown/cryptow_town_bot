const {
  prefix,
  client,
  SERVER,
  CHANNELS,
  MESSAGE_BOT_VERIFICATION,
  MESSAGE_BOT_VERIFICATION_EMOJI,
  MESSAGE_BOT_VERIFICATION_EMOJI_ID,
} = require("./config");

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

const sendBotReactionVerifyMessage = () => {
  const sv = getServer();
  // const verifyChannel = sv.channels.cache.get(CHANNELS.VERIFICATION_CHANNEL);
  // const verifyMessage = {
  //   color: 0x0099ff,
  //   title: "User Verification",
  //   thumbnail: {
  //     url: "https://i.imgur.com/sWcAXL6.jpg",
  //   },
  //   description: `✨Welcome to Cryptow Town, to verify yourself and enjoy the content of the server we invite you to react with the <:towfirehi:946865774474186802>\n
  //     In favor of preserving a community with a super nice and healthy environment, we recommend you to read and follow our rules of coexistence, thank you for helping us to preserve the order and harmony of CrypTow Town.

  //     scroll Rules of peaceful community:

  //      A community where friendship grows and bonds of friendship are created!

  //      Please be respectful with everyone in our community, and if you are being assaulted in any way, please take a screenshot and go directly to a moderator, in case the moderator is not available you can upload the screenshot to the channel **『🚨』report-user**, we will always be attentive to your needs.

  //      Avoid being an author or accomplice of bullying, disrespect, toxicity, racism, misogyny, etc. If you see that any member of the community is violating this rule against you or someone else, send a direct message to a mod or report it to **『🚨』report-user**, we will review the case and do our best to resolve any misunderstanding in the public chat, and fix the situation in the best possible way.
  //     `,
  //   image: {
  //     url: "https://i.imgur.com/sWcAXL6.jpg",
  //   },
  // };
  // verifyChannel.send({ embeds: [verifyMessage] });

  // DESCOMENTAR ESTAS LINEAS Y COMENTAR LAS DE ARRIBA, DESPUES Q EL BOT HAYA ENVIADO EL MENSAJE
  // sv.channels.fetch(CHANNELS.VERIFICATION_CHANNEL).then((channel) => {
  //   channel.messages.fetch(MESSAGE_BOT_VERIFICATION).then((message) => {
  //     message.react(MESSAGE_BOT_VERIFICATION_EMOJI_ID);
  //   });
  // });
};

const removeReactionMessage = async (user_id) => {
  const sv = getServer();
  sv.channels.fetch(CHANNELS.VERIFICATION_CHANNEL).then((channel) => {
    channel.messages.fetch(MESSAGE_BOT_VERIFICATION).then((message) => {
      const obj = message.reactions.cache.find((reaction) => {
        return reaction.emoji.name === MESSAGE_BOT_VERIFICATION_EMOJI;
      });
      obj.users.remove(user_id);
    });
  });
};

module.exports = {
  isCommand,
  getCommand,
  getServer,
  getAllMembers,
  getAllRoles,
  getUsersByRole,
  getUsersLengthByRole,
  removeReactionMessage,
  sendBotReactionVerifyMessage,
};
