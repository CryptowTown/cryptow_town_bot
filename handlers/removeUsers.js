const { CHANNELS, MESSAGES } = require("../config");
const {
  removeUserReactionFromMessage,
  removeUserReactionsFromMessage,
} = require("../helpers/utils");

const removeUser = async (member) => {
  await removeUserReactionFromMessage(
    CHANNELS.VERIFICATION_CHANNEL,
    MESSAGES.BOT_VERIFICATION_MESSAGE_ID,
    member.user.id
  );

  await removeUserReactionsFromMessage(
    CHANNELS.CHOOSE_LANGUAGE,
    MESSAGES.BOT_CHOOSE_LANGUAGE_ID,
    member.user.id
  );
};

module.exports = removeUser;
