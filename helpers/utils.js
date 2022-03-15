const {
  prefix,
  client,
  SERVER,
  CHANNELS,
  MESSAGES,
  EMOJIS,
} = require("../config");
const { warn } = require("./logger");

const isCommand = (message) => {
  return message.content.startsWith(prefix) && !message.author.bot;
};

const getCommand = (messaje) => {
  const args = messaje.content.slice(prefix.length).trim().split(/ +/g);
  const fullCommand = {
    command: args.shift().toLowerCase(),
    args,
  };
  return fullCommand;
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

const sendBotReactionVerifyMessage = async () => {
  const sv = getServer();
  const verifyChannel = sv.channels.cache.get(CHANNELS.VERIFICATION_CHANNEL);
  const verifyMessage = {
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

  const message = await verifyChannel.send({ embeds: [verifyMessage] });
  message.react(EMOJIS.VERIFICATION_EMOJI_ID);
};

const sendBotChooseLanguageMessage = async () => {
  const sv = getServer();
  const chooseLanguageChannel = sv.channels.cache.get(CHANNELS.CHOOSE_LANGUAGE);
  const message = await chooseLanguageChannel.send(
    "🌍 Please select the language of your preference."
  );
  [
    EMOJIS.FRENCH_FLAG_EMOJI,
    EMOJIS.SPAIN_FLAG_EMOJI,
    EMOJIS.BRAZIL_FLAG_EMOJI,
  ].forEach((flag) => message.react(flag));
};

// without cache
const getChannel = async (channel_id) => {
  const sv = getServer();
  const channel = await sv.channels.fetch(channel_id);
  return channel;
};

const existsChannel = async (channel_id) => {
  const channel = await getChannel(channel_id);
  return !!channel;
};

const sendDebugMessage = async (content) => {
  const debugChannel = await getChannel(CHANNELS.BOT_DEBUG);
  await debugChannel.send(content);
};

// without cache
const getMessageFromChannel = async (channel_id, message_id) => {
  const channel = await getChannel(channel_id);
  const message = await channel.messages.fetch(message_id);
  return message;
};

const removeUserReactionFromMessage = async (
  channel_id,
  message_id,
  user_id,
  emoji_id
) => {
  if (!existsChannel(channel_id)) {
    warn(`The channel "${channel_id}" don't exist!`);
    return sendDebugMessage(`⚠️ The channel "${channel_id}" don't exist!`);
  }
  const message = await getMessageFromChannel(channel_id, message_id);
  const reaction = message.reactions.cache.find((_reaction) => {
    return _reaction.emoji.name === emoji_id;
  });
  reaction.users.remove(user_id);
};

const removeUserReactionsFromMessage = async (
  channel_id,
  message_id,
  user_id,
  ...emojis_ids
) => {
  if (!existsChannel(channel_id)) {
    warn(`The channel "${channel_id}" don't exist!`);
    return sendDebugMessage(`⚠️ The channel "${channel_id}" don't exist!`);
  }

  const message = await getMessageFromChannel(channel_id, message_id);
  const reactions = message.reactions.cache;

  reactions.forEach((reaction) => {
    const userIsReacted = reaction.users.cache.some(
      (user) => user.id === user_id
    );

    if (userIsReacted && emojis_ids.includes(reaction.emoji.name)) {
      reaction.users.remove(user_id);
    }
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
  sendBotReactionVerifyMessage,
  removeUserReactionFromMessage,
  removeUserReactionsFromMessage,
  getChannel,
  existsChannel,
  sendDebugMessage,
  getMessageFromChannel,
  sendBotChooseLanguageMessage,
};
