const { CHANNELS, MESSAGES, EMOJIS } = require("../config");
const {
  removeUserReactionFromMessage,
  removeUserReactionsFromMessage,
} = require("../helpers/utils");

const removeUser = async (member) => {
  removeUserReactionFromMessage(
    CHANNELS.VERIFICATION_CHANNEL,
    MESSAGES.BOT_VERIFICATION_MESSAGE_ID,
    member.user.id,
    MESSAGES.BOT_VERIFICATION_EMOJI
  );

  removeUserReactionsFromMessage(
    CHANNELS.CHOOSE_LANGUAGE,
    MESSAGES.BOT_CHOOSE_LANGUAGE_ID,
    member.user.id,
    Object.values(EMOJIS.FLAGS)
  );
};

module.exports = removeUser;
