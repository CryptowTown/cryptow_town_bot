const { Client, Intents, version } = require("discord.js");

const BOT_SETTINGS = {
  prefix: "!",
  VERSION: version,
  token:
    process.env.TOKEN,
  SERVER: {
    ID: "941104117978370069",
  },
  MAX_LENGTH_TOW_LOYAL_USERS: 90,

  ROLES: {
    TOW_LOYAL_ROLE_ID: "946849633655750727",
    VERIFIED_ROLE_ID: "946843806102356080",

    // role flags
    SPANISH_LANGUAGE_ROLE_ID: "944669253448114267",
    FRENCH_LANGUAGE_ROLE_ID: "944670801968377927",
    BRAZIL_LANGUAGE_ROLE_ID: "944672487231344731",

    // roles que se asignan despues de verificarse
    AFTER_VERIFICATION() {
      return [];
    },
  },

  CHANNELS: {
    VERIFICATION_CHANNEL: "946809488164413511",
    CHOOSE_LANGUAGE: "953093090925748284",
    BOT_DEBUG: "952000500033781820",
  },

  MESSAGES: {
    BOT_CHOOSE_LANGUAGE_ID: "953428685627744326",
    BOT_VERIFICATION_MESSAGE_ID: "953429529244876870", // for users verification
  },

  EMOJIS: {
    VERIFICATION_EMOJI: "towfirehi", // the emoji name
    VERIFICATION_EMOJI_ID: "<:towfirehi:946865774474186802>",

    FLAGS: {
      SPAIN_FLAG_EMOJI: "🇪🇸",
      BRAZIL_FLAG_EMOJI: "🇧🇷",
      FRENCH_FLAG_EMOJI: "🇫🇷",
    },
  },
};

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});

module.exports = { ...BOT_SETTINGS, client };
