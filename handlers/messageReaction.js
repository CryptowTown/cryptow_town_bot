const {
  MESSAGES,
  EMOJIS,
  ROLES,
  MAX_LENGTH_TOW_LOYAL_USERS,
  CHANNELS,
} = require("../config");
const { warn } = require("../helpers/logger");
const { getUsersLengthByRole } = require("../helpers/utils");

const messageReaction = (reaction, user) => {
  if (!user.bot) {
    const channelId = reaction.message.channelId;
    const messageId = reaction.message.id;
    const emojiName = reaction.emoji.name;

    if (
      channelId === CHANNELS.VERIFICATION_CHANNEL &&
      messageId === MESSAGES.BOT_VERIFICATION_MESSAGE_ID &&
      emojiName === EMOJIS.VERIFICATION_EMOJI
    ) {
      addTownLoyalRoleToNewUsers(reaction, user);
    } else if (
      channelId === CHANNELS.CHOOSE_LANGUAGE &&
      messageId === MESSAGES.BOT_CHOOSE_LANGUAGE_ID
    ) {
      addLanguageRole(reaction, user);
    }
  }
};

const addTownLoyalRoleToNewUsers = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id);
  const users = await reaction.users.fetch();
  const userIsReacted = users.find(
    (_user) => _user.id === user.id && !user.bot
  );

  if (userIsReacted) reaction.users.remove(userIsReacted.id);
  
  const townRoyalUsersLength = await getUsersLengthByRole(
    ROLES.TOW_LOYAL_ROLE_ID
  );

  if (townRoyalUsersLength <= MAX_LENGTH_TOW_LOYAL_USERS) {
    member.roles.add(ROLES.TOW_LOYAL_ROLE_ID);
  } else {
    member.roles.add(ROLES.VERIFIED_ROLE_ID);
  }

  const otherRoles = ROLES.AFTER_VERIFICATION();
  if (otherRoles.length) member.roles.add(otherRoles);
};

const addLanguageRole = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id);
  const addRoleFlag = async (ROLE) => {
    if (member.roles.cache.has(ROLE)) return await member.roles.remove(ROLE);
    return await member.roles.add(ROLE);
  };

  if (reaction.emoji.name === EMOJIS.FLAGS.FRENCH_FLAG_EMOJI)
    addRoleFlag(ROLES.FRENCH_LANGUAGE_ROLE_ID);
  if (reaction.emoji.name === EMOJIS.FLAGS.SPAIN_FLAG_EMOJI)
    addRoleFlag(ROLES.SPANISH_LANGUAGE_ROLE_ID);
  if (reaction.emoji.name === EMOJIS.FLAGS.BRAZIL_FLAG_EMOJI)
    addRoleFlag(ROLES.BRAZIL_LANGUAGE_ROLE_ID);
};

module.exports = messageReaction;
