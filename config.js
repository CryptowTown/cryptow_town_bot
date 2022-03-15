const { Client, Intents, version } = require("discord.js");

const BOT_SETTINGS = {
  prefix: "!",
  VERSION: version,
  token:
    process.env.TOKEN ||
    "OTUxMzI4NDU5MDMwOTI5NDM4.Yil3qw.NwbMWw_uHyQqoRbeE6931VN6mjo",
  SERVER: {
    ID: "941104117978370069",
  },
  ROLES: {
    TOW_LOYAL_ROLE_ID: "946849633655750727",
    SPANISH_LANGUAGE_ROLE_ID: "944669253448114267",
    FRENCH_LANGUAGE_ROLE_ID: "944670801968377927",
    BRAZIL_LANGUAGE_ROLE_ID: "944672487231344731 ",
    VERIFIED_ROLE_ID: "946843806102356080",

    AFTER_VERIFICATION() {
      return [
        this.FRENCH_LANGUAGE_ROLE_ID,
        this.BRAZIL_LANGUAGE_ROLE_ID,
        this.SPANISH_LANGUAGE_ROLE_ID,
      ];
    },
  },

  MAX_LENGTH_TOW_LOYAL_USERS: 90,

  CHANNELS: {
    VERIFICATION_CHANNEL: "946809488164413511",
  },

  MESSAGE_BOT_VERIFICATION: "952375427341623317", // for users verification
  MESSAGE_BOT_VERIFICATION_EMOJI: "towfirehi", // the emoji name
  MESSAGE_BOT_VERIFICATION_EMOJI_ID: "<:towfirehi:946865774474186802>",
};

const client = new Client({
  intents: [
    "GUILD_MEMBERS",
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});

module.exports = { ...BOT_SETTINGS, client };
